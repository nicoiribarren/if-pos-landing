import type { LucideIcon } from 'lucide-react'
import {
  ScanBarcode,
  Wallet,
  Boxes,
  Users,
  Receipt,
  BarChart3,
  ShieldCheck,
  Store,
  CreditCard,
  Landmark,
  Truck,
  Tag,
  Smartphone,
  Layers,
  Building2,
  Settings2,
  FileStack,
  UserCog,
} from 'lucide-react'

export type FeatureCategory = 'venta-diaria' | 'control-operativo' | 'gestion' | 'administracion'

export const featureCategories: { id: FeatureCategory; label: string }[] = [
  { id: 'venta-diaria', label: 'Venta diaria' },
  { id: 'control-operativo', label: 'Control operativo' },
  { id: 'gestion', label: 'Gestión' },
  { id: 'administracion', label: 'Administración' },
]

export interface Feature {
  id: string
  icon: LucideIcon
  title: string
  short: string
  benefits: string[]
  /** Extended modal content */
  long: string
  includes: string[]
  example: string
  category: FeatureCategory
}

/** Grupo de cada módulo (Venta diaria / Control operativo / Gestión / Administración). */
const categoryById: Record<string, FeatureCategory> = {
  pos: 'venta-diaria',
  caja: 'venta-diaria',
  comprobantes: 'venta-diaria',
  stock: 'control-operativo',
  proveedores: 'control-operativo',
  promociones: 'control-operativo',
  clientes: 'gestion',
  'cuenta-corriente': 'gestion',
  gastos: 'gestion',
  reportes: 'administracion',
  usuarios: 'administracion',
  pwa: 'administracion',
}

const baseFeatures: Omit<Feature, 'category'>[] = [
  {
    id: 'pos',
    icon: ScanBarcode,
    title: 'Punto de venta',
    short: 'Cobrá en el mostrador en segundos, con o sin lector de código.',
    benefits: ['Búsqueda instantánea', 'Carrito ágil', 'Descuentos y varios pagos'],
    long: 'Un POS pensado para el ritmo del mostrador. Buscás el producto, lo sumás al carrito, aplicás un descuento si hace falta, elegís el método de pago y confirmás. La venta descuenta stock y registra el movimiento de caja al instante.',
    includes: ['Búsqueda por nombre o código', 'Carrito lateral editable', 'Descuentos por ítem o total', 'Efectivo, tarjeta, transferencia y billeteras', 'Comprobante visual'],
    example: 'Una perfumería atiende una fila de 6 personas y cierra cada venta en menos de 20 segundos.',
  },
  {
    id: 'caja',
    icon: Wallet,
    title: 'Caja diaria',
    short: 'Abrí, controlá y cerrá la caja con el detalle de cada movimiento.',
    benefits: ['Apertura y cierre', 'Ingresos y egresos', 'Resumen por método de pago'],
    long: 'Cada turno abre su caja con un monto inicial. Todas las ventas, ingresos, egresos y gastos quedan registrados. Al cerrar, el sistema muestra el total esperado por método de pago y la diferencia real.',
    includes: ['Apertura con monto inicial', 'Registro de ingresos y egresos', 'Gastos del día', 'Cierre con diferencia', 'Historial de cajas'],
    example: 'Un kiosco cierra la caja de la noche y detecta al instante una diferencia de efectivo.',
  },
  {
    id: 'stock',
    icon: Boxes,
    title: 'Stock y productos',
    short: 'El inventario se actualiza solo con cada venta y cada ingreso.',
    benefits: ['Stock en tiempo real', 'Alertas de bajo stock', 'Categorías y ajustes'],
    long: 'Cargás productos con precio, costo y stock mínimo. Cada venta descuenta unidades, cada compra las suma. Cuando un producto baja del mínimo, aparece la alerta para reponer a tiempo.',
    includes: ['Productos y categorías', 'Stock mínimo y alertas', 'Movimientos de inventario', 'Ajustes e ingresos', 'Productos sin stock'],
    example: 'Una ferretería recibe la alerta de tornillos por debajo del mínimo antes de quedarse sin stock.',
  },
  {
    id: 'clientes',
    icon: Users,
    title: 'Clientes',
    short: 'Historial de compras, cuenta corriente y datos de contacto.',
    benefits: ['Ficha por cliente', 'Cuenta corriente', 'Historial completo'],
    long: 'Cada cliente tiene su ficha con historial de compras, total gastado, última visita y deuda pendiente. Registrás pagos de cuenta corriente y llevás el control de quién te debe y cuánto.',
    includes: ['Alta de clientes', 'Historial de compras', 'Cuenta corriente y deuda', 'Registro de pagos', 'Notas internas'],
    example: 'Una distribuidora registra el pago parcial de un cliente y su deuda se actualiza al toque.',
  },
  {
    id: 'reportes',
    icon: BarChart3,
    title: 'Reportes',
    short: 'Entendé cómo va el negocio sin planillas ni cálculos a mano.',
    benefits: ['Ventas por día y mes', 'Más vendidos', 'Por método y vendedor'],
    long: 'Reportes simples y claros: ventas del día y del mes, ticket promedio, productos más vendidos, ingresos por método de pago, desempeño por vendedor y cierres de caja. Todo en un panel, sin exportar a otro lado.',
    includes: ['Ventas del día y del mes', 'Ticket promedio', 'Ranking de productos', 'Ingresos por método de pago', 'Ventas por vendedor'],
    example: 'Un minimarket descubre que el 40% de sus ventas entra por transferencia y ajusta su caja.',
  },
  {
    id: 'usuarios',
    icon: UserCog,
    title: 'Usuarios y permisos',
    short: 'Sumá vendedores y controlá qué puede hacer cada uno.',
    benefits: ['Roles por función', 'Permisos granulares', 'Trazabilidad'],
    long: 'Cada persona del negocio tiene su usuario con un rol. Un vendedor cobra pero no ve reportes de ganancia; un encargado accede a más. Cada operación queda asociada a quién la hizo.',
    includes: ['Roles y permisos', 'Alta de usuarios internos', 'Restricción por módulo', 'Trazabilidad de operaciones', 'Sesiones por dispositivo'],
    example: 'Un salón limita a sus recepcionistas al cobro y deja los reportes solo para la dueña.',
  },
  {
    id: 'comprobantes',
    icon: Receipt,
    title: 'Comprobantes',
    short: 'Generá un comprobante visual claro para cada venta.',
    benefits: ['Ticket digital', 'Detalle por ítem', 'Listo para imprimir'],
    long: 'Cada venta genera un comprobante visual con el detalle de productos, cantidades, descuentos y método de pago. Preparado para imprimir en térmica o compartir en pantalla.',
    includes: ['Detalle de la venta', 'Descuentos aplicados', 'Método de pago', 'Datos del negocio', 'Preparado para térmica'],
    example: 'Una tienda de ropa entrega el comprobante en pantalla y lo imprime solo si el cliente lo pide.',
  },
  {
    id: 'cuenta-corriente',
    icon: Landmark,
    title: 'Cuenta corriente',
    short: 'Fiado ordenado, con saldo y pagos siempre al día.',
    benefits: ['Saldo por cliente', 'Registro de pagos', 'Límites'],
    long: 'Para los negocios que fían, la cuenta corriente lleva el saldo de cada cliente, registra pagos y muestra la deuda total del negocio en un solo lugar.',
    includes: ['Saldo por cliente', 'Ventas a cuenta', 'Registro de pagos', 'Deuda total del negocio', 'Límite de crédito'],
    example: 'Un comercio de barrio deja de anotar el fiado en un cuaderno y lo lleva en el sistema.',
  },
  {
    id: 'gastos',
    icon: CreditCard,
    title: 'Gastos',
    short: 'Cargá los gastos del negocio y restalos de tu resultado.',
    benefits: ['Categorías de gasto', 'Impacto en caja', 'Historial'],
    long: 'Registrás los gastos del día a día (proveedores, servicios, sueldos) por categoría. Se reflejan en la caja y en el resultado, para saber cuánto queda de verdad.',
    includes: ['Categorías de gasto', 'Gasto fijo y variable', 'Impacto en caja', 'Historial mensual', 'Notas por gasto'],
    example: 'Una cafetería carga el pago del proveedor de café y lo ve reflejado en el cierre.',
  },
  {
    id: 'proveedores',
    icon: Truck,
    title: 'Proveedores y compras',
    short: 'Registrá compras, sumá stock y llevá el vínculo con proveedores.',
    benefits: ['Órdenes de compra', 'Ingreso de stock', 'Costos actualizados'],
    long: 'Cargás proveedores y registrás compras que ingresan stock y actualizan costos. Sabés a quién comprás, cuánto y con qué frecuencia.',
    includes: ['Alta de proveedores', 'Registro de compras', 'Ingreso automático de stock', 'Actualización de costos', 'Historial por proveedor'],
    example: 'Una distribuidora registra una compra grande y el stock queda listo para vender.',
  },
  {
    id: 'promociones',
    icon: Tag,
    title: 'Promociones',
    short: 'Armá descuentos y combos para vender más en fechas clave.',
    benefits: ['Descuentos por producto', 'Combos', 'Vigencia'],
    long: 'Configurás promociones por producto o categoría, combos y descuentos con fecha de vigencia. El POS las aplica solo durante el período activo.',
    includes: ['Descuentos por producto', 'Combos y packs', 'Vigencia por fecha', 'Aplicación en POS', 'Reporte de impacto'],
    example: 'Un petshop arma un combo de alimento y accesorio para el fin de semana largo.',
  },
  {
    id: 'pwa',
    icon: Smartphone,
    title: 'PWA instalable',
    short: 'Se instala como app en PC, tablet o celular. Sin tienda de apps.',
    benefits: ['Instalable', 'Pantalla completa', 'Acceso rápido'],
    long: 'La plataforma es una PWA: se instala directo desde el navegador en cualquier dispositivo, abre a pantalla completa y queda como un acceso más en el escritorio o la home del celular.',
    includes: ['Instalación desde el navegador', 'Pantalla completa', 'Ícono en escritorio y home', 'Responsive real', 'Sin depender de una store'],
    example: 'Una tienda instala el POS en la tablet del mostrador y en el celular del dueño.',
  },
]

export const features: Feature[] = baseFeatures.map((f) => ({
  ...f,
  category: categoryById[f.id] ?? 'administracion',
}))

/** Simple icon/label pairs used in marquees and chips. */
export const featureChips = [
  { icon: ScanBarcode, label: 'Punto de venta' },
  { icon: Wallet, label: 'Caja diaria' },
  { icon: Boxes, label: 'Control de stock' },
  { icon: Users, label: 'Clientes' },
  { icon: BarChart3, label: 'Reportes' },
  { icon: UserCog, label: 'Usuarios y permisos' },
  { icon: Landmark, label: 'Cuenta corriente' },
  { icon: CreditCard, label: 'Gastos' },
  { icon: Truck, label: 'Proveedores' },
  { icon: Tag, label: 'Promociones' },
  { icon: Receipt, label: 'Comprobantes' },
  { icon: Smartphone, label: 'PWA instalable' },
  { icon: Building2, label: 'Multi-negocio' },
  { icon: Layers, label: 'Multi-sucursal' },
  { icon: ShieldCheck, label: 'Datos aislados' },
  { icon: Store, label: 'Pensado para el local' },
  { icon: Settings2, label: 'Configuración por negocio' },
  { icon: FileStack, label: 'Historial completo' },
]
