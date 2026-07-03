import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Counter } from '@/components/effects/Counter'
import { quickMetrics } from '@/data/metrics'
import { staggerParent, staggerChild, viewportOnce } from '@/utils/animationVariants'

export function MetricsSection() {
  return (
    <Section spacing="tight">
      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6"
      >
        {quickMetrics.map((m) => (
          <motion.div
            key={m.label}
            variants={staggerChild}
            className="group rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-line-strong)] hover:shadow-[var(--shadow-glow)]"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)] transition-colors group-hover:accent-gradient group-hover:text-[#04121f]">
              <m.icon className="size-5" />
            </span>
            <p className="mt-4 text-2xl font-bold text-fg">
              <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
            </p>
            <p className="mt-1 text-xs leading-snug text-muted">{m.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
