import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { onboardingSteps } from '@/data/content'

export function OnboardingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <Section id="como-funciona" spacing="default">
      <SectionHeader
        title={
          <>
            De registrarte a vender <span className="text-gradient">en minutos</span>
          </>
        }
        description="Un camino simple, paso a paso, desde crear tu cuenta hasta analizar tus primeros reportes."
      />

      <div ref={ref} className="relative mx-auto mt-16 max-w-3xl">
        {/* Track */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-[var(--color-line)] md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-[19px] top-2 bottom-2 w-px origin-top accent-gradient md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-6 md:space-y-8">
          {onboardingSteps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative md:grid md:grid-cols-2 md:gap-14"
            >
              {/* Number pinned to the timeline track */}
              <span className="absolute left-0 top-0 z-10 grid size-10 place-items-center rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface)] text-sm font-bold text-[var(--color-accent-bright)] md:left-1/2 md:-translate-x-1/2">
                {s.n}
              </span>
              <div
                className={`group ml-14 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-line-strong)] md:ml-0 ${
                  i % 2 === 0 ? 'md:col-start-1 md:text-right' : 'md:col-start-2'
                }`}
              >
                <h3 className="font-semibold text-fg">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.text}</p>
                <p className="mt-2 text-xs text-[var(--color-cyan)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {s.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
