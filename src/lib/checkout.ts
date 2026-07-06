// Capa de integración del FRONTEND de la landing.
// El frontend NO habla con Supabase ni con Mercado Pago directamente: sólo llama
// al backend de la landing (/api/create-checkout, Vercel Serverless), que tiene
// la service_role key y el token de MP. Ahí se crea el checkout; la cuenta se
// crea recién cuando el pago se confirma (webhook).

export interface CheckoutInput {
  name: string
  email: string
  businessName: string
  industry: string
  planCode: string
}

export type CheckoutResult =
  | { mode: 'redirect'; url: string } // ir a pagar a Mercado Pago
  | { mode: 'unavailable' } // backend/MP todavía no configurado → fallback demo

/** Pide el checkout al backend de la landing y devuelve la URL de pago. */
export async function startCheckout(input: CheckoutInput): Promise<CheckoutResult> {
  let res: Response
  try {
    res = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
  } catch {
    // No hay backend (ej. dev sin functions) → modo demo.
    return { mode: 'unavailable' }
  }

  // 503 = MP todavía no configurado; 404 = sin backend. Tratamos como demo.
  if (res.status === 503 || res.status === 404) return { mode: 'unavailable' }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.error ?? 'No pudimos iniciar el pago. Probá de nuevo.')
  if (!data?.init_point) throw new Error('El checkout no devolvió una URL de pago.')

  return { mode: 'redirect', url: data.init_point as string }
}
