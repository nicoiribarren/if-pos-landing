import { useEffect, useState } from 'react'
import { Trash2, Inbox } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { getLeads, clearLeads, type Lead } from '@/utils/leadStorage'

const typeLabels: Record<Lead['type'], string> = {
  suscripcion: 'Suscripción',
  demo: 'Demo',
  llamada: 'Llamada',
  negocio_demo: 'Negocio demo',
  contacto: 'Contacto',
}

/**
 * Hidden dev/demo panel: opens with ?demo=leads in the URL.
 * Lists the simulated leads stored in localStorage.
 */
export function LeadsInspector() {
  const [open, setOpen] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('demo') === 'leads') {
      setLeads(getLeads())
      setOpen(true)
    }
  }, [])

  function refresh() {
    setLeads(getLeads())
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      size="lg"
      title="Leads simulados (modo demo)"
      description="Registros guardados en localStorage por los formularios de esta landing."
    >
      {leads.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[var(--radius)] border border-dashed border-[var(--color-line)] py-10 text-center">
          <Inbox className="size-8 text-faint" />
          <p className="text-sm text-muted">Todavía no hay leads guardados.</p>
          <p className="max-w-xs text-xs text-faint">
            Completá el formulario de suscripción, pedí una demo o creá un negocio para ver registros acá.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          <ul className="max-h-[50vh] space-y-2 overflow-y-auto pr-1">
            {leads.map((l) => (
              <li key={l.id} className="rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="accent">{typeLabels[l.type]}</Badge>
                  {l.plan && <Badge tone="neutral">Plan {l.plan}</Badge>}
                  <span className="ml-auto text-[11px] text-faint">
                    {new Date(l.createdAt).toLocaleString('es-AR')}
                  </span>
                </div>
                <p className="mt-2 text-sm text-fg">
                  {[l.name, l.businessName, l.industry].filter(Boolean).join(' · ') || 'Sin datos de contacto'}
                </p>
                {(l.email || l.phone) && (
                  <p className="mt-0.5 text-xs text-muted">{[l.email, l.phone].filter(Boolean).join(' · ')}</p>
                )}
                {l.message && <p className="mt-1.5 text-xs italic text-faint">"{l.message}"</p>}
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            icon={Trash2}
            onClick={() => {
              clearLeads()
              refresh()
            }}
          >
            Borrar todos
          </Button>
        </div>
      )}
    </Modal>
  )
}
