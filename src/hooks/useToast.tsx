// API compatible con la versión con context: los componentes siguen haciendo
// `const toast = useToast()`. Ahora delega en el store global (@/stores/ui),
// así funciona igual dentro de cualquier island de Astro.
import { useStore } from '@nanostores/react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'
import { $toasts, toast, dismissToast } from '@/stores/ui'
import { cn } from '@/utils/cn'

export type { ToastVariant, ToastItem } from '@/stores/ui'

export function useToast() {
  return toast
}

const icons = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
} as const

const accents = {
  success: 'text-[var(--color-success)]',
  info: 'text-[var(--color-cyan)]',
  warning: 'text-[var(--color-warning)]',
} as const

/** Viewport de toasts. Se monta una sola vez, dentro de la island Overlay. */
export function ToastViewport() {
  const items = useStore($toasts)

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6">
      <AnimatePresence>
        {items.map((t) => {
          const Icon = icons[t.variant]
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.96 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="glass pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-[var(--radius)] p-4 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.8)]"
              role="status"
            >
              <Icon className={cn('mt-0.5 size-5 shrink-0', accents[t.variant])} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-fg">{t.title}</p>
                {t.description && <p className="mt-0.5 text-sm text-muted">{t.description}</p>}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(t.id)}
                className="rounded-md p-1 text-faint transition-colors hover:text-fg"
                aria-label="Cerrar notificación"
              >
                <X className="size-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
