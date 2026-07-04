export type PlanId = 'basico' | 'pro' | 'premium'

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

// Los `code` coinciden 1:1 con la tabla `plans` del SaaS (basico/pro/premium).
export const plans: Plan[] = [
  {
    id: 'basico',
    name: 'Básico',
    badge: 'Para empezar',
    monthly: 15000,
    description: 'Ideal para negocios chicos que quieren empezar a ordenar ventas, caja y productos.',
    features: [
      'Punto de venta',
      'Caja diaria',
      'Control de stock',
      'Clientes',
    ],
    limits: { businesses: '1 negocio', users: 'Hasta 2 usuarios', products: 'Catálogo básico' },
    cta: 'Empezar con Básico',
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Más elegido',
    monthly: 28000,
    description: 'Para comercios que venden todos los días y necesitan más control operativo.',
    features: [
      'Todo lo de Básico',
      'Proveedores y compras',
      'Promociones',
      'Cuenta corriente',
      'Reportes',
    ],
    limits: { businesses: '1 negocio', users: 'Hasta 6 usuarios', products: 'Catálogo completo' },
    cta: 'Elegir Pro',
    featured: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    badge: 'Para crecer',
    monthly: 45000,
    description: 'Para negocios con equipo, varias sucursales o necesidad de control avanzado.',
    features: [
      'Todo lo de Pro',
      'Multi-sucursal',
      'Facturación ARCA',
      'Reportes avanzados',
      'Auditoría avanzada',
      'Soporte prioritario',
    ],
    limits: { businesses: 'Multi-sucursal', users: 'Hasta 20 usuarios', products: 'Ilimitado' },
    cta: 'Quiero Premium',
  },
]

export const planDisclaimer =
  'Los valores son referenciales. El precio final puede variar según cantidad de usuarios, sucursales y configuración requerida.'

/** Feature comparison matrix. value: true | false | string. */
export interface ComparisonRow {
  label: string
  basico: boolean | string
  pro: boolean | string
  premium: boolean | string
  hint?: string
}

export const comparison: ComparisonRow[] = [
  { label: 'Usuarios incluidos', basico: '2', pro: '6', premium: '20' },
  { label: 'Sucursales', basico: '1', pro: '1', premium: 'Hasta 10' },
  { label: 'Punto de venta', basico: true, pro: true, premium: true },
  { label: 'Caja', basico: 'Diaria', pro: 'Completa', premium: 'Avanzada' },
  { label: 'Stock', basico: true, pro: true, premium: 'Avanzado' },
  { label: 'Clientes', basico: true, pro: true, premium: true },
  { label: 'Cuenta corriente', basico: false, pro: true, premium: true },
  { label: 'Proveedores y compras', basico: false, pro: true, premium: true },
  { label: 'Promociones', basico: false, pro: true, premium: true },
  { label: 'Reportes', basico: false, pro: 'Completos', premium: 'Avanzados' },
  { label: 'Multi-sucursal', basico: false, pro: false, premium: true },
  { label: 'Facturación ARCA', basico: false, pro: false, premium: true },
  { label: 'Auditoría avanzada', basico: false, pro: false, premium: true },
  { label: 'PWA instalable', basico: true, pro: true, premium: true },
  { label: 'Soporte', basico: 'Básico', pro: 'Estándar', premium: 'Prioritario' },
]
