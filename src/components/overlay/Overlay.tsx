// Island global de UI: toasts + modales + inspector de leads.
// Se monta UNA vez en la página (client:load). Cualquier otra island dispara
// modales/toasts a través del store (@/stores/ui), sin contexts compartidos.
import { useState } from 'react'
import { useStore } from '@nanostores/react'
import { MessageCircle, CalendarClock, Check } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { SubscriptionForm } from '@/components/forms/SubscriptionForm'
import { DemoForm } from '@/components/forms/DemoForm'
import { CreateBusinessForm } from '@/components/forms/CreateBusinessForm'
import { LeadsInspector } from '@/components/modals/LeadsInspector'
import { ToastViewport, useToast } from '@/hooks/useToast'
import { $modal, closeModal, modals } from '@/stores/ui'
import { site } from '@/config/site'
import { saveLead } from '@/utils/leadStorage'
import { cn } from '@/utils/cn'

/** Misma API que el viejo context: `const { openSubscribe } = useModals()`. */
export function useModals() {
  return modals
}

export function Overlay() {
  const modal = useStore($modal)

  return (
    <>
      <ToastViewport />

      <Modal
        open={modal?.kind === 'subscribe'}
        onClose={closeModal}
        size="lg"
        title="Suscribite al sistema"
        description="Completá tus datos y activamos tu negocio dentro de la plataforma."
      >
        <SubscriptionForm defaultPlan={modal?.plan} onDone={closeModal} />
      </Modal>

      <Modal
        open={modal?.kind === 'demo'}
        onClose={closeModal}
        size="lg"
        title="Pedí una demo"
        description="Te mostramos el sistema funcionando según lo que quieras ver."
      >
        <DemoForm preset={modal?.preset} onDone={closeModal} />
      </Modal>

      <Modal
        open={modal?.kind === 'create'}
        onClose={closeModal}
        size="md"
        title="Creá tu negocio"
        description="Elegí tu plan y activá tu negocio con su espacio privado."
      >
        <CreateBusinessForm defaultPlan={modal?.plan} onDone={closeModal} />
      </Modal>

      <Modal open={modal?.kind === 'whatsapp'} onClose={closeModal} size="sm" title="Contacto por WhatsApp">
        <WhatsappBody onClose={closeModal} />
      </Modal>

      <Modal open={modal?.kind === 'call'} onClose={closeModal} size="sm" title="Agendar una llamada">
        <CallBody onClose={closeModal} />
      </Modal>

      <LeadsInspector />
    </>
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
