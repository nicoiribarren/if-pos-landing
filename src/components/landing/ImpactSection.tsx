import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { GlowBackground } from '@/components/effects/GlowBackground'
import { Counter } from '@/components/effects/Counter'
import { impactMetrics, impactDisclaimer } from '@/data/metrics'
import { staggerParent, staggerChild, viewportOnce } from '@/utils/animationVariants'

export function ImpactSection() {
  return (
    <Section spacing="default" className="overflow-hidden">
      <GlowBackground variant="default" />
      <div className="relative">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {impactMetrics.map((m) => (
            <motion.div
              key={m.label}
              variants={staggerChild}
              className="rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[var(--color-surface)] p-7"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)]">
                  <m.icon className="size-5" />
                </span>
              </div>
              <p className="mt-5 text-4xl font-bold tracking-tight text-fg sm:text-5xl">
                <span className="text-gradient-accent">
                  <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                </span>
              </p>
              <p className="mt-2 text-sm text-muted">{m.label}</p>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-[var(--color-bg-soft)]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(100, Math.max(25, m.value === 0 ? 100 : m.value))}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full accent-gradient"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-faint">{impactDisclaimer}</p>
      </div>
    </Section>
  )
}
