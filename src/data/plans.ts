export type PlanId = 'starter' | 'pro' | 'business' | 'enterprise'

export interface Plan {
  id: PlanId
  name: string
  badge: string
  /** Monthly price in ARS. null = custom / "Personalizado". */
  monthly: number | null
  description: string
  features: string[]
  limits: { businesses: string; users: string; products: string }
  cta: string
  featured?: boolean
}

/** Annual billing shows ~2 months off. */
export const ANNUAL_DISCOUNT = 0.17

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    badge: 'Para empezar',
    monthly: 29000,
    description: 'Ideal para negocios chicos que quieren empezar a ordenar ventas, caja y productos.',
    features: [
      'POS básico',
      'Caja diaria',
      'Clientes',
      'Stock básico',
      'Reportes básicos',
      'Soporte básico',
    ],
    limits: { businesses: '1 negocio', users: '1 usuario', products: 'Hasta 100 productos' },
    cta: 'Empezar con Starter',
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Más elegido',
    monthly: 59000,
    description: 'Para comercios que venden todos los días y necesitan más control operativo.',
    features: [
      'POS completo',
      'Caja completa',
      'Stock avanzado',
      'Clientes y cuenta corriente',
      'Reportes',
      'Gastos y promociones',
      'Soporte prioritario',
    ],
    limits: { businesses: '1 negocio', users: 'Hasta 3 usuarios', products: 'Hasta 1.000 productos' },
    cta: 'Elegir Pro',
    featured: true,
  },
  {
    id: 'business',
    name: 'Business',
    badge: 'Para crecer',
    monthly: 99000,
    description: 'Para negocios con equipo, mayor volumen o necesidad de control avanzado.',
    features: [
      'POS completo',
      'Caja avanzada',
      'Stock avanzado',
      'Reportes avanzados',
      'Usuarios y permisos',
      'Proveedores y compras',
      'Auditoría',
      'Multi-sucursal preparado',
      'Soporte prioritario',
    ],
    limits: { businesses: '1 negocio', users: 'Hasta 10 usuarios', products: 'Productos ilimitados' },
    cta: 'Quiero Business',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'A medida',
    monthly: null,
    description: 'Para empresas, cadenas o negocios que necesitan límites personalizados e integraciones.',
    features: [
      'Usuarios personalizados',
      'Sucursales personalizadas',
      'Integraciones futuras',
      'Soporte premium',
      'Onboarding avanzado',
      'Seguridad avanzada',
      'Configuración avanzada',
      'Roadmap personalizado',
    ],
    limits: { businesses: 'Cadenas y grupos', users: 'A medida', products: 'A medida' },
    cta: 'Hablar con un asesor',
  },
]

export const planDisclaimer =
  'Los valores son referenciales. El precio final puede variar según cantidad de usuarios, sucursales, integraciones y configuración requerida.'

/** Feature comparison matrix. value: true | false | string. */
export interface ComparisonRow {
  label: string
  starter: boolean | string
  pro: boolean | string
  business: boolean | string
  enterprise: boolean | string
  hint?: string
}

export const comparison: ComparisonRow[] = [
  { label: 'Negocios incluidos', starter: '1', pro: '1', business: '1', enterprise: 'A medida' },
  { label: 'Usuarios incluidos', starter: '1', pro: '3', business: '10', enterprise: 'A medida' },
  { label: 'Productos', starter: '100', pro: '1.000', business: 'Ilimitado', enterprise: 'A medida' },
  { label: 'Punto de venta', starter: 'Básico', pro: 'Completo', business: 'Completo', enterprise: 'Completo' },
  { label: 'Caja', starter: 'Diaria', pro: 'Completa', business: 'Avanzada', enterprise: 'Avanzada' },
  { label: 'Stock', starter: 'Básico', pro: 'Avanzado', business: 'Avanzado', enterprise: 'Avanzado' },
  { label: 'Clientes', starter: true, pro: true, business: true, enterprise: true },
  { label: 'Cuenta corriente', starter: false, pro: true, business: true, enterprise: true },
  { label: 'Reportes', starter: 'Básicos', pro: 'Completos', business: 'Avanzados', enterprise: 'Avanzados' },
  { label: 'Gastos', starter: false, pro: true, business: true, enterprise: true },
  { label: 'Proveedores y compras', starter: false, pro: false, business: true, enterprise: true },
  { label: 'Promociones', starter: false, pro: true, business: true, enterprise: true },
  { label: 'Usuarios y permisos', starter: false, pro: 'Básico', business: true, enterprise: true },
  { label: 'Auditoría', starter: false, pro: false, business: true, enterprise: true },
  { label: 'Multi-sucursal', starter: false, pro: false, business: 'Preparado', enterprise: true },
  { label: 'Integraciones', starter: false, pro: false, business: 'Preparado', enterprise: 'A medida', hint: 'Integraciones futuras, según roadmap y plan.' },
  { label: 'PWA instalable', starter: true, pro: true, business: true, enterprise: true },
  { label: 'Seguridad avanzada', starter: false, pro: false, business: true, enterprise: true },
  { label: 'Onboarding', starter: 'Guías', pro: 'Guías', business: 'Asistido', enterprise: 'Avanzado' },
  { label: 'Soporte', starter: 'Básico', pro: 'Prioritario', business: 'Prioritario', enterprise: 'Premium' },
]
