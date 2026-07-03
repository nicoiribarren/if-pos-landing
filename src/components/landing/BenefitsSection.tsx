import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { benefits } from '@/data/content'
import { useModals } from '@/components/modals/ModalProvider'
import { staggerParent, staggerChild, viewportOnce } from '@/utils/animationVariants'

export function BenefitsSection() {
  const { openCreate } = useModals()

  return (
    <Section spacing="default">
      <SectionHeader
        title={
          <>
            Beneficios <span className="text-gradient">concretos</span> para tu negocio
          </>
        }
        description="Menos tareas manuales, más control y una mejor experiencia para vender todos los días."
      />

      <div className="mt-14 grid gap-3 lg:grid-cols-3">
        {/* Featured cell */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-accent-bright)]/40 bg-gradient-to-br from-[var(--color-accent-soft)] to-transparent p-7 lg:row-span-2"
        >
          <div>
            <span className="grid size-12 place-items-center rounded-xl accent-gradient text-[#04121f]">
              <Sparkles className="size-6" />
            </span>
            <h3 className="mt-5 text-2xl font-bold text-fg">Tu local, convertido en una plataforma digital</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Todo el negocio ordenado en un sistema simple para el vendedor y completo para el administrador, listo para
              crecer por etapas.
            </p>
          </div>
          <Button className="mt-8 w-fit" iconRight={ArrowRight} onClick={() => openCreate()}>
            Crear mi negocio
          </Button>
        </motion.div>

        {/* Benefit chips */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-3 sm:grid-cols-2 lg:col-span-2"
        >
          {benefits.map((b) => (
            <motion.div
              key={b}
              variants={staggerChild}
              className="flex items-center gap-3 rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3.5 transition-colors hover:border-[var(--color-line-strong)]"
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)]">
                <Check className="size-3.5" strokeWidth={2.5} />
              </span>
              <span className="text-sm text-fg">{b}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
