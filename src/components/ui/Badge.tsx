import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'violet'

const tones: Record<Tone, string> = {
  neutral: 'border-[var(--color-line-strong)] bg-white/[0.03] text-muted',
  accent: 'border-[rgba(59,130,246,0.3)] bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)]',
  success: 'border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.1)] text-[var(--color-success)]',
  warning: 'border-[rgba(251,191,36,0.3)] bg-[rgba(251,191,36,0.1)] text-[var(--color-warning)]',
  violet: 'border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.12)] text-[#c4b5fd]',
}

export function Badge({
  children,
  tone = 'neutral',
  icon: Icon,
  className,
  dot,
}: {
  children: ReactNode
  tone?: Tone
  icon?: LucideIcon
  className?: string
  /** Only for real semantic state (e.g. live/online). */
  dot?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-current" />
        </span>
      )}
      {Icon && <Icon className="size-3.5" strokeWidth={2} />}
      {children}
    </span>
  )
}
