import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { MotionCard } from '@/components/ui/MotionCard'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { features, type Feature } from '@/data/features'
import { useModals } from '@/components/modals/ModalProvider'
import { staggerParent, staggerChild, viewportOnce } from '@/utils/animationVariants'

export function FeaturesSection() {
  const [selected, setSelected] = useState<Feature | null>(null)
  const { openDemo } = useModals()

  return (
    <Section id="funcionalidades" spacing="default">
      <SectionHeader
        title={
          <>
            Todo lo que un comercio necesita para <span className="text-gradient">vender y gestionar mejor</span>
          </>
        }
        description="Un sistema completo, módulo por módulo, para operar el negocio desde una sola plataforma."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {features.map((f) => (
          <motion.div key={f.id} variants={staggerChild}>
            <MotionCard className="h-full p-6">
              <span className="grid size-12 place-items-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)]">
                <f.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-fg">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.short}</p>
              <ul className="mt-4 space-y-1.5">
                {f.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-muted">
                    <Check className="size-3.5 shrink-0 text-[var(--color-cyan)]" /> {b}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelected(f)}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent-bright)] transition-colors hover:text-[var(--color-cyan)]"
              >
                Ver más <ArrowRight className="size-4" />
              </button>
            </MotionCard>
          </motion.div>
        ))}
      </motion.div>

      <Modal open={!!selected} onClose={() => setSelected(null)} size="md" title={selected?.title}>
        {selected && (
          <div className="grid gap-5">
            <p className="text-sm leading-relaxed text-muted">{selected.long}</p>
            <div>
              <p className="mb-2 text-sm font-semibold text-fg">Qué incluye</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {selected.includes.map((inc) => (
                  <li key={inc} className="flex items-center gap-2 text-sm text-muted">
                    <Check className="size-4 shrink-0 text-[var(--color-cyan)]" /> {inc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-faint">Ejemplo de uso</p>
              <p className="mt-1.5 text-sm text-fg">{selected.example}</p>
            </div>
            <Button
              fullWidth
              iconRight={ArrowRight}
              onClick={() => {
                setSelected(null)
                openDemo(`Quiero probar la función: ${selected.title}`)
              }}
            >
              Quiero probar esta función
            </Button>
          </div>
        )}
      </Modal>
    </Section>
  )
}
