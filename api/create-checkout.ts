// Vercel Serverless Function — BACKEND de la landing (no se expone al cliente).
// Crea la preference de Mercado Pago (cuenta de la PLATAFORMA) para cobrar la
// suscripción. La cuenta del cliente NO se crea acá: se crea recién cuando el
// pago se confirma (ver api/mp-webhook.ts), tal cual el contrato.
//
// Env (Vercel, server-side, NUNCA con prefijo VITE_):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY  → leer precio del plan (autoritativo)
//   MP_ACCESS_TOKEN                          → cuenta MP de la plataforma
//   LANDING_URL                              → back_urls + notification_url
import { createClient } from '@supabase/supabase-js'

const PLAN_CODES = ['basico', 'pro', 'premium']

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' })

  try {
    const { name, email, businessName, industry, planCode } = req.body ?? {}
    if (!name || !email || !businessName || !planCode) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' })
    }
    if (!PLAN_CODES.includes(planCode)) {
      return res.status(400).json({ error: 'Plan inválido' })
    }

    const SUPABASE_URL = process.env.SUPABASE_URL
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
    const MP_TOKEN = process.env.MP_ACCESS_TOKEN
    const LANDING_URL = (process.env.LANDING_URL ?? '').replace(/\/$/, '')
    if (!SUPABASE_URL || !SERVICE_KEY) return res.status(500).json({ error: 'Supabase no configurado' })
    if (!MP_TOKEN) return res.status(503).json({ error: 'Mercado Pago no configurado todavía' })

    // Precio autoritativo desde la tabla `plans` del SaaS (no lo manda el cliente).
    const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
    const { data: plan, error: planErr } = await admin
      .from('plans')
      .select('code, name, priceMonthly')
      .eq('code', planCode)
      .eq('isActive', true)
      .single()
    if (planErr || !plan || plan.priceMonthly <= 0) {
      return res.status(400).json({ error: 'Plan no disponible' })
    }

    // Metadata en snake_case: Mercado Pago transforma las claves, así llegan igual al webhook.
    const metadata = {
      email,
      business_name: businessName,
      owner_name: name,
      category: industry ?? '',
      plan_code: plan.code,
    }

    const preference = {
      items: [
        {
          title: `Suscripción Mostrador — Plan ${plan.name}`,
          quantity: 1,
          unit_price: plan.priceMonthly,
          currency_id: 'ARS',
        },
      ],
      payer: { email },
      metadata,
      external_reference: `${plan.code}:${email}`,
      notification_url: `${LANDING_URL}/api/mp-webhook`,
      back_urls: {
        success: `${LANDING_URL}/?pago=ok`,
        failure: `${LANDING_URL}/?pago=error`,
        pending: `${LANDING_URL}/?pago=pendiente`,
      },
      auto_return: 'approved',
    }

    const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${MP_TOKEN}` },
      body: JSON.stringify(preference),
    })
    const mp = await mpRes.json()
    if (!mpRes.ok) return res.status(502).json({ error: 'No se pudo crear el checkout', detail: mp })

    return res.status(200).json({ init_point: mp.init_point })
  } catch (e) {
    return res.status(500).json({ error: String(e) })
  }
}
