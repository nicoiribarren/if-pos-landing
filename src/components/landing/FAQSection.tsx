import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AccordionItem } from '@/components/ui/Accordion'
import { Reveal } from '@/components/ui/Reveal'
import { faqs } from '@/data/faqs'

export function FAQSection() {
  const mid = Math.ceil(faqs.length / 2)
  const columns = [faqs.slice(0, mid), faqs.slice(mid)]

  return (
    <Section spacing="default" className="bg-[var(--color-bg-soft)]/40">
      <SectionHeader
        title={
          <>
            Preguntas <span className="text-gradient">frecuentes</span>
          </>
        }
        description="Lo que suelen consultar los comercios antes de empezar a usar el sistema."
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-x-10 md:grid-cols-2">
        {columns.map((col, ci) => (
          <Reveal key={ci} delay={ci * 0.05}>
            {col.map((f, i) => (
              <AccordionItem key={f.q} question={f.q} defaultOpen={ci === 0 && i === 0}>
                {f.a}
              </AccordionItem>
            ))}
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
