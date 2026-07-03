import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Users, Package, TrendingUp, Wallet } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { businesses, type DemoBusiness } from '@/data/businesses'
import { plans } from '@/data/plans'
import { formatCurrency, formatNumber } from '@/utils/formatCurrency'
import { staggerParent, staggerChild, viewportOnce } from '@/utils/animationVariants'

export function BusinessSimulationSection() {
  const [selected, setSelected] = useState<DemoBusiness | null>(null)

  return (
    <Section spacing="default">
      <SectionHeader
        title={
          <>
            Cada negocio tiene su propio <span className="text-gradient">espacio</span> dentro del sistema
          </>
        }
        description="Distintos comercios, el mismo sistema, datos independientes. Pasá el mouse o tocá una tarjeta para ver su panel."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {businesses.map((b) => {
          const plan = plans.find((p) => p.id === b.plan)!
          return (
            <motion.button
              key={b.id}
              variants={staggerChild}
              onClick={() => setSelected(b)}
              className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-line-strong)]"
              style={{ ['--accent' as string]: b.accent }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${b.accent}, transparent)` }}
              />
              <div className="flex items-center justify-between">
                <span
                  className="grid size-11 place-items-center rounded-xl text-sm font-bold text-[#04121f]"
                  style={{ background: b.accent }}
                >
                  {b.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </span>
                <Badge tone="neutral">
                  <Lock className="size-3" /> Datos privados
                </Badge>
              </div>
              <h3 className="mt-4 font-semibold text-fg">{b.name}</h3>
              <p className="text-xs text-faint">
                {b.industry} · Plan {plan.name}
              </p>

              {/* mini dashboard reveal */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <Mini icon={TrendingUp} label="Ventas/mes" value={formatNumber(b.monthlySales)} />
                <Mini icon={Package} label="Productos" value={formatNumber(b.products)} />
                <Mini icon={Users} label="Usuarios" value={String(b.users)} />
                <Mini icon={Wallet} label="Caja" value={b.cashOpen ? 'Abierta' : 'Cerrada'} />
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      <Modal open={!!selected} onClose={() => setSelected(null)} size="md" title={selected?.name}>
        {selected && (
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <Badge tone="accent">Plan {plans.find((p) => p.id === selected.plan)!.name}</Badge>
              <Badge tone="violet">
                <Lock className="size-3" /> Espacio aislado
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <Stat label="Ventas del mes" value={formatNumber(selected.monthlySales)} />
              <Stat label="Facturación hoy" value={formatCurrency(selected.metrics.todayRevenue)} />
              <Stat label="Productos" value={formatNumber(selected.products)} />
              <Stat label="Ticket promedio" value={formatCurrency(selected.metrics.ticketAvg)} />
              <Stat label="Usuarios activos" value={String(selected.users)} />
              <Stat label="Bajo stock" value={String(selected.metrics.lowStock)} />
            </div>
            <p className="rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-3 text-xs text-muted">
              Estos datos pertenecen solo a {selected.name}. No se cruzan con los de ningún otro negocio de la plataforma.
            </p>
          </div>
        )}
      </Modal>
    </Section>
  )
}

function Mini({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[var(--color-bg-soft)] p-2.5">
      <p className="flex items-center gap-1 text-[10px] text-faint">
        <Icon className="size-3" /> {label}
      </p>
      <p className="tnum mt-0.5 text-sm font-semibold text-fg">{value}</p>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-3">
      <p className="text-[11px] text-faint">{label}</p>
      <p className="tnum mt-1 text-sm font-semibold text-fg">{value}</p>
    </div>
  )
}
