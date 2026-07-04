import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Cliente de Supabase de la landing. Apunta al MISMO proyecto que el SaaS
 * (fuente de verdad única). Con las variables sin definir, la landing sigue
 * funcionando en "modo demo" (ver isSupabaseConfigured).
 *
 * Definir en .env.local:
 *   VITE_SUPABASE_URL
 *   VITE_SUPABASE_ANON_KEY
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    })
  : (null as unknown as SupabaseClient)

/** URL de la app del SaaS (para redirigir tras el alta). */
export const appUrl = (import.meta.env.VITE_APP_URL as string | undefined)?.replace(/\/$/, '') ?? ''
