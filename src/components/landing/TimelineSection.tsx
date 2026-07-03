import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { timeline, timelineDisclaimer } from '@/data/content'

export function TimelineSection() {
  return (
    <Section spacing="default" className="bg-[var(--color-bg-soft)]/40">
      <SectionHeader
        title={
          <>
            En marcha <span className="text-gradient">el mismo día</span>
          </>
        }
        description="Un recorrido posible desde que elegís el plan hasta que empezás a analizar tus reportes."
      />

      <div className="relative mt-16">
        <div className="absolute left-0 right-0 top-5 hidden h-px bg-[var(--color-line)] lg:block" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 right-0 top-5 hidden h-px origin-left accent-gradient lg:block"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-7 lg:gap-3">
          {timeline.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <span className="relative z-10 grid size-10 place-items-center rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface)] text-xs font-bold text-[var(--color-accent-bright)]">
                {i + 1}
              </span>
              <p className="mt-4 text-xs font-semibold text-[var(--color-cyan)]">{t.time}</p>
              <p className="mt-1 text-sm text-fg">{t.title}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-faint">{timelineDisclaimer}</p>
    </Section>
  )
}
