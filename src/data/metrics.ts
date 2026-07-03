import type { LucideIcon } from 'lucide-react'
import { Building2, Blocks, Timer, Clock, Layers, Boxes, Users, Gauge } from 'lucide-react'

export interface Metric {
  icon: LucideIcon
  value: number
  suffix?: string
  prefix?: string
  label: string
  /** For values that are not counted (e.g. "Multi-usuario"). */
  static?: string
}

/** Quick metrics under the hero. */
export const quickMetrics: Metric[] = [
  { icon: Building2, value: 1, prefix: '+', label: 'Plataforma para múltiples negocios' },
  { icon: Blocks, value: 25, prefix: '+', label: 'Módulos de gestión' },
  { icon: Gauge, value: 99, suffix: '%', label: 'Enfoque en facilidad de uso' },
  { icon: Timer, value: 7, suffix: ' min', label: 'Para crear un negocio demo' },
  { icon: Clock, value: 24, suffix: '/7', label: 'Acceso al sistema' },
  { icon: Layers, value: 100, suffix: '%', label: 'Adaptable a distintos rubros' },
]

/** Impact numbers (clearly demonstrative). */
export const impactMetrics: Metric[] = [
  { icon: Gauge, value: 3, suffix: 'x', label: 'Más orden operativo', static: undefined },
  { icon: Timer, value: 60, suffix: '%', label: 'Menos tareas manuales' },
  { icon: Clock, value: 24, suffix: '/7', label: 'Acceso a la plataforma' },
  { icon: Boxes, value: 100, suffix: '%', label: 'Negocios separados' },
  { icon: Users, value: 0, label: 'Datos mezclados entre negocios' },
  { icon: Layers, value: 40, prefix: '+', suffix: '%', label: 'Mejora visual percibida' },
]

export const impactDisclaimer =
  'Son métricas estimadas y demostrativas para ilustrar el tipo de mejora operativa. No representan promesas ni garantías de resultado.'
