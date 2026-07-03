import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'
import { cn } from '@/utils/cn'

export type ToastVariant = 'success' | 'info' | 'warning'

export interface ToastItem {
  id: string
  title: string
  description?: string
  variant: ToastVariant
}

interface ToastContextValue {
  toast: (t: Omit<ToastItem, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

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

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const timers = useRef<Map<string, number>>(new Map())

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id))
    const handle = timers.current.get(id)
    if (handle) {
      window.clearTimeout(handle)
      timers.current.delete(id)
    }
  }, [])

  const toast = useCallback(
    (t: Omit<ToastItem, 'id'>) => {
      const id = crypto.randomUUID()
      setItems((prev) => [...prev, { ...t, id }].slice(-4))
      const handle = window.setTimeout(() => dismiss(id), 4200)
      timers.current.set(id, handle)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
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
                  {t.description && (
                    <p className="mt-0.5 text-sm text-muted">{t.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(t.id)}
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
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx.toast
}
