import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/utils/cn'

const lines: { text: string; tone: 'cmd' | 'ok' | 'muted' }[] = [
  { text: 'tenant.create({ name: "Petshop Luna" })', tone: 'cmd' },
  { text: 'business.workspace.ready', tone: 'ok' },
  { text: 'products.import(618)', tone: 'cmd' },
  { text: 'stock.synced', tone: 'ok' },
  { text: 'cash.register.opened', tone: 'ok' },
  { text: 'sale.created  #4821  $18.400', tone: 'cmd' },
  { text: 'report.updated', tone: 'ok' },
  { text: 'system online', tone: 'muted' },
]

const toneClass = {
  cmd: 'text-[var(--color-cyan)]',
  ok: 'text-[var(--color-success)]',
  muted: 'text-faint',
}

export function CodeTerminal({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(reduce ? lines.length : 0)

  useEffect(() => {
    if (reduce) {
      setVisible(lines.length)
      return
    }
    let i = 0
    let handle = 0
    const step = () => {
      i += 1
      setVisible(i)
      if (i < lines.length) {
        handle = window.setTimeout(step, 620)
      } else {
        handle = window.setTimeout(() => {
          i = 0
          setVisible(0)
          handle = window.setTimeout(step, 620)
        }, 2600)
      }
    }
    handle = window.setTimeout(step, 400)
    return () => window.clearTimeout(handle)
  }, [reduce])

  return (
    <div
      className={cn(
        'glass w-full max-w-xs rounded-[var(--radius)] p-3 font-mono text-[11px] leading-relaxed shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]',
        className,
      )}
    >
      <div className="mb-2 flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-[var(--color-danger)]/70" />
        <span className="size-2 rounded-full bg-[var(--color-warning)]/70" />
        <span className="size-2 rounded-full bg-[var(--color-success)]/70" />
        <span className="ml-2 text-[10px] text-faint">if-pos · deploy</span>
      </div>
      <div className="min-h-[9.5rem] space-y-0.5">
        {lines.slice(0, visible).map((l, i) => (
          <p key={i} className={toneClass[l.tone]}>
            <span className="mr-1.5 text-[var(--color-faint)]">{l.tone === 'cmd' ? '›' : '✓'}</span>
            {l.text}
          </p>
        ))}
        {visible < lines.length && !reduce && (
          <span className="inline-block h-3 w-1.5 animate-pulse bg-[var(--color-cyan)] align-middle" />
        )}
      </div>
    </div>
  )
}
