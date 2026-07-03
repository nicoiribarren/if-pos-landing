import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { integrations, integrationStatusLabels, type IntegrationStatus } from '@/data/integrations'
import { staggerParent, staggerChild, viewportOnce } from '@/utils/animationVariants'
import { cn } from '@/utils/cn'

const statusStyle: Record<IntegrationStatus, string> = {
  preparado: 'text-[var(--color-cyan)] border-[rgba(34,211,238,0.3)] bg-[rgba(34,211,238,0.08)]',
  futuro: 'text-muted border-[var(--color-line-strong)] bg-white/[0.02]',
  'segun-plan': 'text-[#c4b5fd] border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.1)]',
  personalizado: 'text-[var(--color-warning)] border-[rgba(251,191,36,0.3)] bg-[rgba(251,191,36,0.08)]',
}

export function IntegrationsSection() {
  return (
    <Section spacing="default">
      <SectionHeader
        title={
          <>
            Preparado para <span className="text-gradient">integrar</span> lo que tu negocio necesite
          </>
        }
        description="Estas integraciones están contempladas a futuro. Se van habilitando según el roadmap del producto y el plan contratado."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {integrations.map((it) => (
          <motion.div
            key={it.name}
            variants={staggerChild}
            className="group flex items-start gap-4 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-line-strong)]"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-[var(--color-line)] bg-[var(--color-bg-soft)] text-fg transition-colors group-hover:text-[var(--color-accent-bright)]">
              <it.icon className="size-5" />
            </span>
            <div className="min-w-0">
              <h3 className="font-semibold text-fg">{it.name}</h3>
              <p className="mt-1 text-sm text-muted">{it.description}</p>
              <span
                className={cn('mt-3 inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium', statusStyle[it.status])}
              >
                {integrationStatusLabels[it.status]}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
