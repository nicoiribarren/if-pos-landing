import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ScanBarcode, Wallet, Boxes, Users, BarChart3, Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Tabs, type TabDef } from '@/components/ui/Tabs'
import { POSMockup } from '@/components/mockups/POSMockup'
import { CashRegisterMockup } from '@/components/mockups/CashRegisterMockup'
import { InventoryMockup } from '@/components/mockups/InventoryMockup'
import { CustomersMockup } from '@/components/mockups/CustomersMockup'
import { ReportsMockup } from '@/components/mockups/ReportsMockup'

interface ShowcaseTab {
  id: string
  label: string
  icon: LucideIcon
  title: string
  desc: string
  points: string[]
  mockup: React.ReactNode
}

const data: ShowcaseTab[] = [
  {
    id: 'pos',
    label: 'POS',
    icon: ScanBarcode,
    title: 'Vendé rápido desde un POS simple y moderno',
    desc: 'Buscá productos, armá el carrito, aplicá descuentos, elegí el método de pago y confirmá. El stock se descuenta y la caja se actualiza sola.',
    points: ['Carrito ágil de mostrador', 'Varios métodos de pago', 'Descuenta stock y registra caja'],
    mockup: <POSMockup />,
  },
  {
    id: 'caja',
    label: 'Caja',
    icon: Wallet,
    title: 'Controlá cada apertura, cierre y movimiento de caja',
    desc: 'Abrí la caja con un monto inicial, registrá ingresos y egresos, y cerrá con el detalle por método de pago y la diferencia real.',
    points: ['Apertura y cierre por turno', 'Ingresos, egresos y gastos', 'Resumen por método de pago'],
    mockup: <CashRegisterMockup />,
  },
  {
    id: 'stock',
    label: 'Stock',
    icon: Boxes,
    title: 'Stock actualizado con cada venta',
    desc: 'Cargá productos con stock mínimo y recibí alertas cuando algo está por agotarse. Cada venta y cada compra ajustan el inventario.',
    points: ['Alertas de bajo stock', 'Movimientos de inventario', 'Categorías y ajustes'],
    mockup: <InventoryMockup />,
  },
  {
    id: 'clientes',
    label: 'Clientes',
    icon: Users,
    title: 'Clientes organizados, historial claro y cuenta corriente',
    desc: 'Cada cliente con su ficha: historial de compras, total gastado, última visita y deuda. Registrá pagos y llevá la cuenta corriente al día.',
    points: ['Historial de compras', 'Cuenta corriente y deuda', 'Registro de pagos'],
    mockup: <CustomersMockup />,
  },
  {
    id: 'reportes',
    label: 'Reportes',
    icon: BarChart3,
    title: 'Reportes simples para entender cómo va tu negocio',
    desc: 'Ventas por día y por mes, ticket promedio, productos más vendidos e ingresos por método de pago. Cambiá el rango y mirá cómo evoluciona.',
    points: ['Ventas del día y del mes', 'Ranking de productos', 'Filtros por fecha'],
    mockup: <ReportsMockup />,
  },
]

const tabs: TabDef[] = data.map((d) => ({ id: d.id, label: d.label, icon: d.icon }))

export function ProductShowcase() {
  const [active, setActive] = useState('pos')
  const current = data.find((d) => d.id === active)!

  return (
    <Section id="producto" spacing="default" className="bg-[var(--color-bg-soft)]/40">
      <SectionHeader
        title={
          <>
            Probá el sistema <span className="text-gradient">funcionando</span>, módulo por módulo
          </>
        }
        description="No es una captura: cada pestaña es una simulación real que podés tocar. Elegí un módulo y jugá con él."
      />

      <div className="mt-10 flex justify-center">
        <Tabs tabs={tabs} active={active} onChange={setActive} layoutId="showcase-tabs" />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`copy-${current.id}`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.3 }}
          >
            <span className="grid size-12 place-items-center rounded-xl accent-gradient text-[#04121f]">
              <current.icon className="size-6" />
            </span>
            <h3 className="mt-5 text-2xl font-bold text-fg">{current.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-muted">{current.desc}</p>
            <ul className="mt-5 grid gap-2.5">
              {current.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm text-fg">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)]">
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`mock-${current.id}`}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {current.mockup}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
