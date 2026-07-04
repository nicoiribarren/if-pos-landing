import { supabase, isSupabaseConfigured } from './supabase'

/**
 * Capa de integración landing → SaaS.
 * Hace el alta REAL del negocio (Supabase Auth) y, si el plan tiene precio,
 * crea el checkout de Mercado Pago (Edge Function create-checkout) para redirigir.
 *
 * El trigger handle_new_user() del SaaS crea negocio + profile + suscripción
 * trial con el plan_code que mandamos acá. El webhook de MP la pasa a 'active'.
 */

export interface RegisterInput {
  email: string
  password: string
  ownerName: string
  businessName: string
  category: string
  planCode: string
  /** Si el plan tiene precio (no enterprise), redirige a pagar. */
  withCheckout: boolean
}

export type RegisterResult =
  | { mode: 'redirect'; url: string } // hay que ir a pagar a Mercado Pago
  | { mode: 'trial' } // cuenta creada en trial (plan sin precio / enterprise)
  | { mode: 'confirm-email' } // falta confirmar el email antes de continuar

/** Traduce errores comunes de Supabase Auth al español. */
function friendly(message: string): string {
  const m = message.toLowerCase()
  if (m.includes('already registered') || m.includes('already been registered'))
    return 'Ya existe una cuenta con ese email.'
  if (m.includes('at least 6')) return 'La contraseña debe tener al menos 6 caracteres.'
  if (m.includes('email') && m.includes('invalid')) return 'El email no es válido.'
  return message
}

export async function registerAndCheckout(input: RegisterInput): Promise<RegisterResult> {
  if (!isSupabaseConfigured) throw new Error('Supabase no está configurado.')

  // 1) Alta real. La metadata la lee handle_new_user() en el SaaS.
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        business_name: input.businessName,
        owner_name: input.ownerName,
        category: input.category,
        plan_code: input.planCode,
      },
    },
  })
  if (error) throw new Error(friendly(error.message))

  // Confirmación de email activada → no hay sesión hasta verificar el mail.
  if (!data.session) return { mode: 'confirm-email' }

  // 2) Plan sin precio (enterprise) → queda en trial, sin checkout.
  if (!input.withCheckout) return { mode: 'trial' }

  // 3) Checkout de Mercado Pago. invoke() adjunta el JWT de la sesión + apikey.
  const { data: co, error: coErr } = await supabase.functions.invoke('create-checkout', {
    body: { planCode: input.planCode },
  })
  if (coErr) throw new Error('No pudimos iniciar el pago. Probá de nuevo en unos segundos.')
  if (!co?.init_point) throw new Error('El checkout no devolvió una URL de pago.')

  return { mode: 'redirect', url: co.init_point as string }
}
