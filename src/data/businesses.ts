import type { PlanId } from './plans'

export interface DemoBusiness {
  id: string
  name: string
  industry: string
  plan: Exclude<PlanId, 'enterprise'> | 'business'
  users: number
  monthlySales: number
  products: number
  cashOpen: boolean
  accent: string
  /** Data used by the interactive dashboard so each tenant looks different. */
  metrics: {
    todaySales: number
    todayRevenue: number
    ticketAvg: number
    lowStock: number
  }
}

export const businesses: DemoBusiness[] = [
  {
    id: 'petshop-luna',
    name: 'Petshop Luna',
    industry: 'Petshop',
    plan: 'pro',
    users: 3,
    monthlySales: 842,
    products: 618,
    cashOpen: true,
    accent: '#22d3ee',
    metrics: { todaySales: 47, todayRevenue: 318400, ticketAvg: 6774, lowStock: 5 },
  },
  {
    id: 'kiosco-centro',
    name: 'Kiosco Centro',
    industry: 'Kiosco',
    plan: 'starter',
    users: 1,
    monthlySales: 1936,
    products: 214,
    cashOpen: true,
    accent: '#60a5fa',
    metrics: { todaySales: 128, todayRevenue: 141900, ticketAvg: 1109, lowStock: 9 },
  },
  {
    id: 'tienda-norte',
    name: 'Tienda Norte',
    industry: 'Indumentaria',
    plan: 'business',
    users: 7,
    monthlySales: 461,
    products: 1284,
    cashOpen: false,
    accent: '#8b5cf6',
    metrics: { todaySales: 23, todayRevenue: 486200, ticketAvg: 21139, lowStock: 3 },
  },
  {
    id: 'perfumeria-bella',
    name: 'Perfumería Bella',
    industry: 'Cosmética',
    plan: 'pro',
    users: 2,
    monthlySales: 573,
    products: 392,
    cashOpen: true,
    accent: '#22d3ee',
    metrics: { todaySales: 39, todayRevenue: 264500, ticketAvg: 6782, lowStock: 4 },
  },
  {
    id: 'distribuidora-sur',
    name: 'Distribuidora Sur',
    industry: 'Distribuidora',
    plan: 'business',
    users: 6,
    monthlySales: 318,
    products: 2140,
    cashOpen: true,
    accent: '#60a5fa',
    metrics: { todaySales: 18, todayRevenue: 912800, ticketAvg: 50711, lowStock: 12 },
  },
  {
    id: 'ferreteria-roma',
    name: 'Ferretería Roma',
    industry: 'Ferretería',
    plan: 'pro',
    users: 4,
    monthlySales: 706,
    products: 1560,
    cashOpen: false,
    accent: '#8b5cf6',
    metrics: { todaySales: 52, todayRevenue: 398700, ticketAvg: 7667, lowStock: 8 },
  },
]

/** Rubros for the trust marquee. */
export const industriesMarquee = [
  'Petshops',
  'Tiendas de ropa',
  'Kioscos',
  'Minimarkets',
  'Perfumerías',
  'Ferreterías',
  'Bazares',
  'Distribuidoras',
  'Salones',
  'Cosmética',
  'Librerías',
  'Cafeterías',
  'Emprendimientos',
  'Comercios de barrio',
]
