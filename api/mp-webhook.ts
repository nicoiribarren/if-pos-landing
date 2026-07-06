// Vercel Serverless Function — webhook de Mercado Pago (BACKEND de la landing).
// Cuando un pago se aprueba: crea la cuenta con inviteUserByEmail (el trigger
// handle_new_user arma negocio + perfil + suscripción trial y Supabase manda el
// email para definir contraseña) y activa la suscripción con el plan pagado.
//
// Idempotente: si el usuario ya existe (reintento de MP), no re-invita.
// Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, MP_ACCESS_TOKEN, APP_URL (opcional).
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: any, res: any) {
  try {
    // MP manda type + data.id por query o por body.
    const q = req.query ?? {}
    let type = q.type ?? q.topic ?? req.body?.type ?? req.body?.topic
    let paymentId = q['data.id'] ?? q.id ?? req.body?.data?.id ?? req.body?.id

    if (type !== 'payment' || !paymentId) return res.status(200).send('ignored')

    const MP_TOKEN = process.env.MP_ACCESS_TOKEN
    const SUPABASE_URL = process.env.SUPABASE_URL
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!MP_TOKEN || !SUPABASE_URL || !SERVICE_KEY) return res.status(200).send('not-configured')

    // Fuente de verdad: re-consultar el pago a MP (no confiar en el body).
    const payRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${MP_TOKEN}` },
    })
    if (!payRes.ok) return res.status(200).send('mp-error')
    const pay = await payRes.json()
    if (pay.status !== 'approved') return res.status(200).send('not-approved')

    const meta = pay.metadata ?? {}
    const email = meta.email
    const businessName = meta.business_name
    const ownerName = meta.owner_name ?? ''
    const category = meta.category ?? ''
    const planCode = meta.plan_code
    if (!email || !planCode) return res.status(200).send('no-metadata')

    const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    // 1) Crear cuenta + mandar email para definir contraseña. El trigger arma
    //    negocio/perfil/suscripción (trial). Redirige al SaaS al setear la clave.
    const redirectTo = process.env.APP_URL ? `${process.env.APP_URL.replace(/\/$/, '')}/` : undefined
    const { data: invited, error: inviteErr } = await admin.auth.admin.inviteUserByEmail(email, {
      data: { business_name: businessName, owner_name: ownerName, category },
      redirectTo,
    })

    let userId = invited?.user?.id
    if (inviteErr) {
      // Ya existe (reintento de MP o cliente que vuelve): idempotente, no re-invitar.
      const already = String(inviteErr.message ?? '').toLowerCase()
      if (already.includes('already') || already.includes('registered') || (inviteErr as any).status === 422) {
        return res.status(200).send('already-processed')
      }
      console.error('inviteUserByEmail error', inviteErr)
      return res.status(200).send('invite-failed')
    }
    if (!userId) return res.status(200).send('no-user')

    // 2) Activar la suscripción con el plan pagado (service_role → puede escribir).
    const { data: prof } = await admin.from('profiles').select('businessId').eq('id', userId).single()
    const { data: plan } = await admin.from('plans').select('id').eq('code', planCode).single()
    if (prof?.businessId && plan?.id) {
      const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      const { error: upErr } = await admin
        .from('subscriptions')
        .update({ status: 'active', planId: plan.id, currentPeriodEnd: periodEnd })
        .eq('businessId', prof.businessId)
      if (upErr) console.error('activar suscripción error', upErr)
    }

    return res.status(200).send('ok')
  } catch (e) {
    console.error('mp-webhook error', e)
    return res.status(200).send('error') // 200 para no disparar reintentos infinitos de MP
  }
}
