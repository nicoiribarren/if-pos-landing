import { PlayCircle, CalendarClock, MessageCircle, Check } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SubscriptionForm } from '@/components/forms/SubscriptionForm'
import { useModals } from '@/components/overlay/Overlay'

const points = [
  'Activamos tu negocio dentro de la plataforma',
  'Te ayudamos a elegir el plan correcto',
  'Cargamos tus primeros productos con vos',
  'Empezás a vender con el POS el mismo día',
]

const quickActions = [
  { icon: PlayCircle, label: 'Pedir demo', kind: 'demo' as const },
  { icon: CalendarClock, label: 'Agendar una llamada', kind: 'call' as const },
  { icon: MessageCircle, label: 'Escribir por WhatsApp', kind: 'whatsapp' as const },
]

export function ContactSection() {
  const { openDemo, openCall, openWhatsapp } = useModals()

  const run = (kind: 'demo' | 'call' | 'whatsapp') => {
    if (kind === 'demo') openDemo()
    if (kind === 'call') openCall()
    if (kind === 'whatsapp') openWhatsapp()
  }

  return (
    <Section id="contacto" spacing="default">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <SectionHeader
            align="left"
            title={
              <>
                Creá tu negocio dentro de la <span className="text-gradient">plataforma</span>
              </>
            }
            description="Completá el formulario y coordinamos la activación de tu negocio. También podés pedir una demo, agendar una llamada o escribirnos."
          />
          <ul className="mt-6 grid gap-2.5">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm text-fg">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)]">
                  <Check className="size-3.5" strokeWidth={2.5} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-2">
            {quickActions.map((a) => (
              <button
                key={a.kind}
                onClick={() => run(a.kind)}
                className="group flex items-center gap-3 rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 text-left text-sm text-fg transition-colors hover:border-[var(--color-accent-bright)]"
              >
                <a.icon className="size-4 text-[var(--color-cyan)]" />
                {a.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 sm:p-7">
          <SubscriptionForm />
        </div>
      </div>
    </Section>
  )
}
