import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { MessageCircle, CalendarClock, Check } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { SubscriptionForm } from '@/components/forms/SubscriptionForm'
import { DemoForm } from '@/components/forms/DemoForm'
import { CreateBusinessForm } from '@/components/forms/CreateBusinessForm'
import { site } from '@/config/site'
import type { PlanId } from '@/data/plans'
import { useToast } from '@/hooks/useToast'
import { saveLead } from '@/utils/leadStorage'
import { cn } from '@/utils/cn'

type ModalKind = 'subscribe' | 'demo' | 'create' | 'whatsapp' | 'call' | null

interface ModalContextValue {
  openSubscribe: (plan?: PlanId) => void
  openDemo: (preset?: string) => void
  openCreate: (plan?: PlanId) => void
  openWhatsapp: () => void
  openCall: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [kind, setKind] = useState<ModalKind>(null)
  const [plan, setPlan] = useState<PlanId | undefined>()
  const [preset, setPreset] = useState<string | undefined>()

  const close = useCallback(() => setKind(null), [])

  const value = useMemo<ModalContextValue>(
    () => ({
      openSubscribe: (p) => {
        setPlan(p)
        setKind('subscribe')
      },
      openDemo: (pr) => {
        setPreset(pr)
        setKind('demo')
      },
      openCreate: (p) => {
        setPlan(p)
        setKind('create')
      },
      openWhatsapp: () => setKind('whatsapp'),
      openCall: () => setKind('call'),
    }),
    [],
  )

  return (
    <ModalContext.Provider value={value}>
      {children}

      <Modal
        open={kind === 'subscribe'}
        onClose={close}
        size="lg"
        title="Suscribite al sistema"
        description="Completá tus datos y activamos tu negocio dentro de la plataforma."
      >
        <SubscriptionForm defaultPlan={plan} onDone={close} />
      </Modal>

      <Modal
        open={kind === 'demo'}
        onClose={close}
        size="lg"
        title="Pedí una demo"
        description="Te mostramos el sistema funcionando según lo que quieras ver."
      >
        <DemoForm preset={preset} onDone={close} />
      </Modal>

      <Modal
        open={kind === 'create'}
        onClose={close}
        size="md"
        title="Creá tu negocio"
        description="Simulamos el alta de tu negocio dentro del SaaS, con su espacio privado."
      >
        <CreateBusinessForm defaultPlan={plan} onDone={close} />
      </Modal>

      <Modal open={kind === 'whatsapp'} onClose={close} size="sm" title="Contacto por WhatsApp">
        <WhatsappBody onClose={close} />
      </Modal>

      <Modal open={kind === 'call'} onClose={close} size="sm" title="Agendar una llamada">
        <CallBody onClose={close} />
      </Modal>
    </ModalContext.Provider>
  )
}

function WhatsappBody({ onClose }: { onClose: () => void }) {
  const toast = useToast()
  const message = `Hola ${site.company}, quiero información sobre ${site.productName} para mi negocio.`
  return (
    <div className="grid gap-4">
      <div className="flex items-start gap-3 rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--color-success)]/15 text-[var(--color-success)]">
          <MessageCircle className="size-5" />
        </span>
        <div>
          <p className="text-sm font-medium text-fg">Mensaje prearmado</p>
          <p className="mt-1 text-sm text-muted">{message}</p>
        </div>
      </div>
      <Button
        icon={MessageCircle}
        onClick={() => {
          toast({ variant: 'info', title: 'Acción simulada', description: 'Acá se abriría WhatsApp con el mensaje listo.' })
          onClose()
        }}
        fullWidth
      >
        Abrir WhatsApp
      </Button>
      <p className="text-center text-xs text-faint">Modo demo: no se abre WhatsApp real.</p>
    </div>
  )
}

const days = ['Lun 14', 'Mar 15', 'Mié 16', 'Jue 17', 'Vie 18']
const slots = ['10:00', '11:30', '15:00', '16:30', '18:00']

function CallBody({ onClose }: { onClose: () => void }) {
  const toast = useToast()
  const [day, setDay] = useState<string | null>(null)
  const [slot, setSlot] = useState<string | null>(null)

  function confirm() {
    if (!day || !slot) return
    saveLead({ type: 'llamada', message: `Llamada ${day} a las ${slot}` })
    toast({ variant: 'success', title: 'Llamada agendada', description: `${day} a las ${slot} (simulado).` })
    onClose()
  }

  return (
    <div className="grid gap-4">
      <div>
        <p className="mb-2 text-sm font-medium text-fg">Elegí un día</p>
        <div className="flex flex-wrap gap-2">
          {days.map((d) => (
            <button
              key={d}
              onClick={() => setDay(d)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                day === d ? 'border-[var(--color-accent-bright)] bg-[var(--color-accent-soft)] text-fg' : 'border-[var(--color-line)] text-muted hover:text-fg',
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-fg">Elegí un horario</p>
        <div className="flex flex-wrap gap-2">
          {slots.map((s) => (
            <button
              key={s}
              onClick={() => setSlot(s)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                slot === s ? 'border-[var(--color-accent-bright)] bg-[var(--color-accent-soft)] text-fg' : 'border-[var(--color-line)] text-muted hover:text-fg',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <Button icon={day && slot ? Check : CalendarClock} disabled={!day || !slot} onClick={confirm} fullWidth>
        {day && slot ? `Confirmar ${day} ${slot}` : 'Elegí día y horario'}
      </Button>
      <p className="text-center text-xs text-faint">Modo demo: no se conecta ningún calendario real.</p>
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useModals() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModals must be used within ModalProvider')
  return ctx
}
