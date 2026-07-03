import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { industries } from '@/data/industries'
import { plans } from '@/data/plans'
import { useModals } from '@/components/modals/ModalProvider'
import { cn } from '@/utils/cn'

export function IndustriesSection() {
  const [active, setActive] = useState(industries[0].id)
  const current = industries.find((i) => i.id === active)!
  const plan = plans.find((p) => p.id === current.plan)!
  const { openDemo } = useModals()

  return (
    <Section id="rubros" spacing="default" className="bg-[var(--color-bg-soft)]/40">
      <SectionHeader
        title={
          <>
            Un sistema para <span className="text-gradient">distintos tipos</span> de negocios
          </>
        }
        description="Elegí tu rubro y mirá cómo se adapta el sistema al día a día de tu negocio."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Industry list */}
        <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActive(ind.id)}
              className={cn(
                'flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all lg:w-full',
                active === ind.id
                  ? 'border-[var(--color-accent-bright)] bg-[var(--color-accent-soft)] text-fg'
                  : 'border-[var(--color-line)] bg-[var(--color-surface)] text-muted hover:text-fg',
              )}
            >
              <ind.icon className="size-4 shrink-0" />
              {ind.name}
            </button>
          ))}
        </div>

        {/* Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[var(--color-surface)] p-7"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-xl accent-gradient text-[#04121f]">
                <current.icon className="size-6" />
              </span>
              <h3 className="text-2xl font-bold text-fg">{current.name}</h3>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-danger)]">El problema</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{current.problem}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-success)]">Cómo ayuda</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{current.solution}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {current.useful.map((u) => (
                <Badge key={u} tone="neutral">
                  {u}
                </Badge>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-line)] pt-5">
              <p className="text-sm text-muted">
                Plan recomendado: <span className="font-semibold text-fg">{plan.name}</span>
              </p>
              <Button iconRight={ArrowRight} onClick={() => openDemo(current.cta)}>
                {current.cta}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
