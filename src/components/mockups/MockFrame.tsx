import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utils/cn'

/**
 * App-preview chrome. This wraps REAL interactive component previews
 * (not static fake screenshots). Header shows live product context.
 */
export function MockFrame({
  title,
  subtitle,
  online = true,
  right,
  children,
  className,
  accent,
}: {
  title: ReactNode
  subtitle?: ReactNode
  online?: boolean
  right?: ReactNode
  children: ReactNode
  className?: string
  accent?: string
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] bg-[var(--color-bg-soft)] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] bg-[var(--color-surface)]/60 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="grid size-7 shrink-0 place-items-center rounded-lg text-[11px] font-bold text-[#04121f]"
            style={{ background: accent ?? 'linear-gradient(135deg,#3b82f6,#22d3ee)' }}
          >
            IF
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-fg">{title}</p>
            {subtitle && <p className="truncate text-[11px] text-faint">{subtitle}</p>}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {right}
          {online && (
            <Badge tone="success" dot className="hidden sm:inline-flex">
              Online
            </Badge>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
