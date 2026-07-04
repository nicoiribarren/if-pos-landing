import type { PlanId } from './plans'
import type { LucideIcon } from 'lucide-react'
import {
  PawPrint,
  Shirt,
  Store,
  ShoppingBasket,
  Sparkles,
  Truck,
  Dumbbell,
  Coffee,
  Wrench,
  Scissors,
  Rocket,
  BookOpen,
} from 'lucide-react'

export interface Industry {
  id: string
  icon: LucideIcon
  name: string
  problem: string
  solution: string
  useful: string[]
  plan: PlanId
  cta: string
}

export const industries: Industry[] = [
  {
    id: 'petshop',
    icon: PawPrint,
    name: 'Petshops',
    problem: 'Alimento, accesorios y clientes frecuentes que compran siempre lo mismo.',
    solution: 'POS ágil, stock por categoría, clientes con historial y cuenta corriente para los habitués.',
    useful: ['POS', 'Stock', 'Clientes', 'Cuenta corriente'],
    plan: 'pro',
    cta: 'Quiero usarlo en mi petshop',
  },
  {
    id: 'ropa',
    icon: Shirt,
    name: 'Tiendas de ropa',
    problem: 'Productos por talle y color, con temporadas y ventas que cambian rápido.',
    solution: 'Productos con variantes, control de stock por unidad, caja y reportes de lo más vendido.',
    useful: ['Productos', 'Stock', 'Caja', 'Reportes'],
    plan: 'pro',
    cta: 'Quiero usarlo en mi tienda',
  },
  {
    id: 'kiosco',
    icon: Store,
    name: 'Kioscos',
    problem: 'Muchísimas ventas chicas por día y una caja difícil de cuadrar.',
    solution: 'POS rapidísimo, cierre de caja claro y control de los productos que más rotan.',
    useful: ['POS', 'Caja', 'Stock'],
    plan: 'basico',
    cta: 'Quiero usarlo en mi kiosco',
  },
  {
    id: 'minimarket',
    icon: ShoppingBasket,
    name: 'Minimarkets',
    problem: 'Volumen alto, varios métodos de pago y reposición constante.',
    solution: 'Ventas rápidas, ingresos por método de pago y alertas de bajo stock para reponer.',
    useful: ['POS', 'Caja', 'Reportes'],
    plan: 'pro',
    cta: 'Quiero usarlo en mi minimarket',
  },
  {
    id: 'cosmetica',
    icon: Sparkles,
    name: 'Cosmética',
    problem: 'Productos por marca, promociones y clientas que vuelven seguido.',
    solution: 'Promociones, fichas de cliente y reportes para saber qué línea conviene reponer.',
    useful: ['Promociones', 'Clientes', 'Reportes'],
    plan: 'pro',
    cta: 'Quiero usarlo en cosmética',
  },
  {
    id: 'distribuidora',
    icon: Truck,
    name: 'Distribuidoras',
    problem: 'Ventas por mayor, cuentas corrientes y logística de proveedores.',
    solution: 'Cuenta corriente, compras a proveedores y control de stock de gran volumen.',
    useful: ['Cuenta corriente', 'Proveedores', 'Stock'],
    plan: 'premium',
    cta: 'Quiero usarlo en mi distribuidora',
  },
  {
    id: 'gimnasio',
    icon: Dumbbell,
    name: 'Gimnasios',
    problem: 'Cuotas, productos de kiosco interno y varios turnos de personal.',
    solution: 'Clientes con historial, usuarios por turno y caja controlada por recepción.',
    useful: ['Clientes', 'Usuarios', 'Caja'],
    plan: 'premium',
    cta: 'Quiero usarlo en mi gimnasio',
  },
  {
    id: 'cafeteria',
    icon: Coffee,
    name: 'Cafeterías',
    problem: 'Ritmo intenso en horas pico y muchos pagos con billeteras digitales.',
    solution: 'POS ágil de mostrador, cierre de caja por turno y reportes por método de pago.',
    useful: ['POS', 'Caja', 'Reportes'],
    plan: 'pro',
    cta: 'Quiero usarlo en mi cafetería',
  },
  {
    id: 'ferreteria',
    icon: Wrench,
    name: 'Ferreterías',
    problem: 'Miles de productos chicos y clientes que compran a cuenta.',
    solution: 'Búsqueda rápida por código, cuenta corriente y alertas de reposición.',
    useful: ['POS', 'Stock', 'Cuenta corriente'],
    plan: 'premium',
    cta: 'Quiero usarlo en mi ferretería',
  },
  {
    id: 'salon',
    icon: Scissors,
    name: 'Salones de belleza',
    problem: 'Servicios, venta de productos y varias profesionales atendiendo.',
    solution: 'Usuarios por profesional, ventas de producto y reportes por persona.',
    useful: ['Usuarios', 'Reportes', 'Clientes'],
    plan: 'pro',
    cta: 'Quiero usarlo en mi salón',
  },
  {
    id: 'libreria',
    icon: BookOpen,
    name: 'Librerías',
    problem: 'Temporada escolar con picos enormes y mucha variedad de productos.',
    solution: 'Stock por categoría, promociones de temporada y POS rápido para las filas.',
    useful: ['Stock', 'Promociones', 'POS'],
    plan: 'pro',
    cta: 'Quiero usarlo en mi librería',
  },
  {
    id: 'emprendimiento',
    icon: Rocket,
    name: 'Emprendimientos',
    problem: 'Local físico y ventas por redes, todo anotado en distintos lados.',
    solution: 'Un solo sistema para ordenar ventas, stock y clientes desde el primer día.',
    useful: ['POS', 'Stock', 'Clientes'],
    plan: 'basico',
    cta: 'Quiero usarlo en mi emprendimiento',
  },
]
