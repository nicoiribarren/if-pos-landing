import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { solutionFlow } from '@/data/content'
import { cn } from '@/utils/cn'

export function SolutionSection() {
  const [active, setActive] = useState(solutionFlow[0].key)
  const current = solutionFlow.find((s) => s.key === active)!

  return (
    <Section spacing="default" className="bg-[var(--color-bg-soft)]/40">
      <SectionHeader
        eyebrow="La solución"
        title={
          <>
            Todo el negocio, ordenado en un <span className="text-gradient">sistema simple</span> y moderno
          </>
        }
        description="Centralizá ventas, caja, productos, clientes y reportes en un sistema simple para vendedores y completo para administradores."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        {/* Connected flow */}
        <div className="flex flex-wrap items-stretch gap-2">
          {solutionFlow.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <button
                onMouseEnter={() => setActive(s.key)}
                onClick={() => setActive(s.key)}
                className={cn(
                  'rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300',
                  active === s.key
                    ? 'border-[var(--color-accent-bright)] bg-[var(--color-accent-soft)] text-fg shadow-[var(--shadow-glow)]'
                    : 'border-[var(--color-line)] bg-[var(--color-surface)] text-muted hover:text-fg',
                )}
              >
                {s.label}
              </button>
              {i < solutionFlow.length - 1 && (
                <ArrowRight className="size-4 shrink-0 text-faint" />
              )}
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <div className="relative min-h-[180px] rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <span className="grid size-11 place-items-center rounded-xl accent-gradient text-[#04121f]">
                <Check className="size-5" strokeWidth={2.4} />
              </span>
              <h3 className="mt-4 text-xl font-bold text-fg">{current.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{current.detail}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
