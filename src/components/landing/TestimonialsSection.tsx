import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { testimonials } from '@/data/testimonials'
import { staggerParent, staggerChild, viewportOnce } from '@/utils/animationVariants'

export function TestimonialsSection() {
  return (
    <Section spacing="default">
      <SectionHeader
        eyebrow="Testimonios"
        title={
          <>
            Negocios que ya <span className="text-gradient">ordenaron</span> su operación
          </>
        }
        description="Casos representativos del tipo de comercio para el que está pensado el sistema."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {testimonials.map((t) => (
          <motion.figure
            key={t.name}
            variants={staggerChild}
            className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-line-strong)]"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="size-4 fill-[var(--color-warning)] text-[var(--color-warning)]" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-fg">"{t.quote}"</blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-[var(--color-line)] pt-4">
              <span
                className="grid size-10 place-items-center rounded-full text-xs font-bold text-[#04121f]"
                style={{ background: t.accent }}
              >
                {t.initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-fg">{t.name}</p>
                <p className="text-xs text-faint">
                  {t.role} en {t.business}
                </p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </Section>
  )
}
