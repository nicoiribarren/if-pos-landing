import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { cn } from '@/utils/cn'

export function AccordionItem({
  question,
  children,
  defaultOpen = false,
}: {
  question: ReactNode
  children: ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-[var(--color-line)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-fg"
      >
        <span className={cn('text-base font-medium', open ? 'text-fg' : 'text-fg/90')}>{question}</span>
        <span
          className={cn(
            'grid size-8 shrink-0 place-items-center rounded-full border border-[var(--color-line-strong)] transition-all duration-300',
            open && 'rotate-45 border-[var(--color-accent-bright)] text-[var(--color-accent-bright)]',
          )}
        >
          <Plus className="size-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[70ch] pb-5 pr-12 text-sm leading-relaxed text-muted">{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
