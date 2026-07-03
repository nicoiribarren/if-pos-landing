import type { LucideIcon } from 'lucide-react'
import {
  FileText,
  PackageX,
  Wallet,
  UserX,
  LayoutGrid,
  BarChartHorizontal,
  MessagesSquare,
  ShieldQuestion,
  ShieldCheck,
  Lock,
  UserCheck,
  UserCog,
  Boxes,
  DatabaseZap,
  Rocket,
  Monitor,
  Tablet,
  Smartphone,
} from 'lucide-react'

/* ---------------- Problem section ---------------- */
export interface ProblemItem {
  icon: LucideIcon
  title: string
  text: string
}

export const problems: ProblemItem[] = [
  { icon: FileText, title: 'Ventas en papel', text: 'Se anotan a mano y se pierden entre tickets y cuadernos.' },
  { icon: PackageX, title: 'Stock desactualizado', text: 'Nunca coincide lo del depósito con lo que figura.' },
  { icon: Wallet, title: 'Caja sin control', text: 'Cerrar el día se vuelve un cálculo a ciegas.' },
  { icon: UserX, title: 'Clientes sin historial', text: 'No sabés quién compra qué ni quién te debe.' },
  { icon: LayoutGrid, title: 'Productos desordenados', text: 'Sin categorías ni precios claros a la vista.' },
  { icon: BarChartHorizontal, title: 'Sin reportes', text: 'No hay forma simple de ver cómo va el negocio.' },
  { icon: MessagesSquare, title: 'Pedidos mezclados', text: 'Ventas, consultas y pagos perdidos en el chat.' },
  { icon: ShieldQuestion, title: 'Sin control por vendedor', text: 'No sabés quién hizo cada operación.' },
]

/* ---------------- Solution flow ---------------- */
export interface SolutionStep {
  key: string
  label: string
  detail: string
}

export const solutionFlow: SolutionStep[] = [
  { key: 'negocio', label: 'Negocio', detail: 'Tu espacio privado dentro de la plataforma, con tu configuración.' },
  { key: 'productos', label: 'Productos', detail: 'Catálogo con precio, costo, categoría y stock inicial.' },
  { key: 'caja', label: 'Caja', detail: 'Apertura del turno y control de cada movimiento.' },
  { key: 'ventas', label: 'Ventas', detail: 'POS ágil que descuenta stock y registra el cobro.' },
  { key: 'stock', label: 'Stock', detail: 'Inventario siempre al día, con alertas de reposición.' },
  { key: 'clientes', label: 'Clientes', detail: 'Historial, cuenta corriente y datos de contacto.' },
  { key: 'reportes', label: 'Reportes', detail: 'La foto clara de cómo viene el negocio.' },
]

/* ---------------- Multitenant cards ---------------- */
export const multitenantPoints: string[] = [
  'Cada negocio tiene su cuenta',
  'Cada negocio tiene sus productos',
  'Cada negocio tiene sus clientes',
  'Cada negocio tiene sus ventas',
  'Cada negocio tiene su caja',
  'Cada negocio tiene sus usuarios',
  'Cada negocio tiene sus reportes',
  'Cada negocio tiene su configuración',
  'Los datos no se mezclan',
  'El sistema escala para nuevos clientes',
]

/* ---------------- Security ---------------- */
export interface SecurityPoint {
  icon: LucideIcon
  title: string
  text: string
}

export const securityPoints: SecurityPoint[] = [
  { icon: Lock, title: 'Espacio privado', text: 'Cada negocio funciona como un espacio aislado del resto.' },
  { icon: Boxes, title: 'Productos separados', text: 'El catálogo de un negocio no aparece en otro.' },
  { icon: Wallet, title: 'Ventas separadas', text: 'Las ventas de cada negocio quedan en su propio espacio.' },
  { icon: UserCheck, title: 'Clientes privados', text: 'La base de clientes es exclusiva de cada negocio.' },
  { icon: UserCog, title: 'Usuarios por negocio', text: 'Cada usuario pertenece a su negocio, con su rol.' },
  { icon: DatabaseZap, title: 'Preparado para escalar', text: 'La arquitectura está pensada para sumar negocios sin fricción.' },
]

export const securityBadges = ['Datos aislados', 'Roles y permisos', 'Configuración por negocio', 'Escalable']

export const securityDisclaimer =
  'La plataforma está diseñada y pensada para mantener los datos de cada negocio separados. No se afirman certificaciones ni cumplimientos legales específicos en esta etapa.'

/* ---------------- PWA devices ---------------- */
export interface DeviceView {
  id: string
  icon: LucideIcon
  label: string
  screen: string
  detail: string
}

export const deviceViews: DeviceView[] = [
  { id: 'pc', icon: Monitor, label: 'PC del mostrador', screen: 'POS', detail: 'La pantalla de venta a mano para atender rápido en el local.' },
  { id: 'tablet', icon: Tablet, label: 'Tablet', screen: 'Panel', detail: 'El dashboard del negocio para controlar caja, stock y ventas.' },
  { id: 'mobile', icon: Smartphone, label: 'Celular', screen: 'Reportes', detail: 'Los reportes del negocio en el bolsillo, en cualquier momento.' },
]

/* ---------------- Before / After ---------------- */
export const beforeItems: string[] = [
  'Ventas anotadas a mano',
  'Stock en un cuaderno',
  'Caja sin control',
  'Clientes desordenados',
  'Sin reportes',
  'Todo manual',
  'Difícil de escalar',
  'Difícil sumar usuarios',
]

export const afterItems: string[] = [
  'Sistema centralizado',
  'POS moderno',
  'Stock actualizado',
  'Caja controlada',
  'Clientes organizados',
  'Reportes claros',
  'Usuarios con permisos',
  'Tu negocio dentro de un SaaS',
]

/* ---------------- Onboarding steps ---------------- */
export interface OnboardingStep {
  n: number
  title: string
  text: string
  detail: string
}

export const onboardingSteps: OnboardingStep[] = [
  { n: 1, title: 'Crear cuenta', text: 'Te registrás o solicitás acceso a la plataforma.', detail: 'Un email y una contraseña. Sin instalar nada.' },
  { n: 2, title: 'Crear negocio', text: 'Cargás nombre, rubro y configuración inicial.', detail: 'Tu negocio queda con su propio espacio privado.' },
  { n: 3, title: 'Elegir plan', text: 'Seleccionás el plan según el tamaño de tu negocio.', detail: 'Empezás chico y escalás cuando lo necesites.' },
  { n: 4, title: 'Cargar productos', text: 'Sumás productos, categorías, precios y stock.', detail: 'A mano o a medida que vas vendiendo.' },
  { n: 5, title: 'Abrir caja', text: 'Iniciás la caja del día con el monto inicial.', detail: 'Todo movimiento queda registrado desde el arranque.' },
  { n: 6, title: 'Empezar a vender', text: 'Usás el POS y generás comprobantes.', detail: 'El stock y la caja se actualizan en cada venta.' },
  { n: 7, title: 'Ver reportes', text: 'Controlás ventas, stock, caja y clientes.', detail: 'Tomás decisiones con datos, no con intuición.' },
]

/* ---------------- Implementation timeline ---------------- */
export interface TimelineItem {
  time: string
  title: string
}

export const timeline: TimelineItem[] = [
  { time: 'Minuto 1', title: 'Elegís tu plan' },
  { time: 'Minuto 2', title: 'Creás tu negocio' },
  { time: 'Minuto 5', title: 'Configurás datos básicos' },
  { time: 'Minuto 10', title: 'Cargás tus productos' },
  { time: 'Minuto 15', title: 'Abrís la caja' },
  { time: 'Después', title: 'Empezás a vender' },
  { time: 'Luego', title: 'Analizás reportes y mejorás' },
]

export const timelineDisclaimer =
  'Los tiempos son demostrativos y dependen de la cantidad de productos y de la configuración inicial de cada negocio.'

/* ---------------- Benefits ---------------- */
export const benefits: string[] = [
  'Más control de ventas',
  'Caja más ordenada',
  'Stock actualizado',
  'Clientes organizados',
  'Reportes claros',
  'Menos tareas manuales',
  'Mejor experiencia para vendedores',
  'Acceso desde cualquier dispositivo',
  'Plataforma escalable',
  'Planes mensuales',
  'Listo para distintos rubros',
  'Datos separados por negocio',
  'Usuarios con permisos',
  'PWA instalable',
  'Crecimiento por etapas',
]
