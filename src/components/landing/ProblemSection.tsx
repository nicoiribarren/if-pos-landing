import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { problems } from '@/data/content'
import { staggerParent, staggerChild, viewportOnce } from '@/utils/animationVariants'

export function ProblemSection() {
  return (
    <Section spacing="default">
      <SectionHeader
        title={
          <>
            Muchos comercios venden todos los días, pero no tienen un{' '}
            <span className="text-gradient">sistema claro</span> para controlar lo que pasa
          </>
        }
        description="Tu negocio puede vender todos los días, pero si la caja, el stock y los clientes están desordenados, crecer se vuelve difícil."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {problems.map((p) => (
          <motion.div
            key={p.title}
            variants={staggerChild}
            className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 transition-colors duration-300 hover:border-[var(--color-line-strong)]"
          >
            <span className="grid size-11 place-items-center rounded-xl border border-[var(--color-line)] bg-[var(--color-bg-soft)] text-[var(--color-danger)] transition-transform duration-300 group-hover:-translate-y-0.5">
              <p.icon className="size-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold text-fg">{p.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
