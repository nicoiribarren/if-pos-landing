import type { PlanId } from '@/data/plans'

export interface CalculatorAnswers {
  businessType: string
  users: 'one' | 'few' | 'team' | 'many'
  products: 'small' | 'medium' | 'large' | 'huge'
  physical: boolean
  cashControl: boolean
  currentAccount: boolean
  advancedReports: boolean
  multiBranch: boolean
  integrations: boolean
  priority: boolean
}

export interface Recommendation {
  plan: PlanId
  reason: string
}

/**
 * Score-based recommendation. Higher score means a bigger plan.
 * Deliberately simple and fully client-side.
 */
export function recommendPlan(a: CalculatorAnswers): Recommendation {
  let score = 0

  score += { one: 0, few: 1, team: 3, many: 5 }[a.users]
  score += { small: 0, medium: 1, large: 3, huge: 5 }[a.products]
  if (a.currentAccount) score += 1
  if (a.advancedReports) score += 2
  if (a.multiBranch) score += 3
  if (a.integrations) score += 2
  if (a.priority) score += 1

  let plan: PlanId
  if (a.multiBranch && a.integrations && a.users === 'many') plan = 'enterprise'
  else if (score >= 8) plan = 'business'
  else if (score >= 3) plan = 'pro'
  else plan = 'starter'

  const reasons: Record<PlanId, string> = {
    starter:
      'Por el tamaño de tu negocio, con Starter ordenás ventas, caja y productos sin pagar de más.',
    pro: 'Vendés seguido y necesitás más control: Pro suma stock avanzado, cuenta corriente y reportes.',
    business:
      'Tu operación tiene equipo y volumen. Business incluye usuarios y permisos, proveedores, auditoría y multi-sucursal preparado.',
    enterprise:
      'Buscás sucursales, integraciones y límites a medida. Enterprise se arma según tu operación.',
  }

  return { plan, reason: reasons[plan] }
}
