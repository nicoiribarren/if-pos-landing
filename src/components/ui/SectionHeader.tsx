import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { cn } from '@/utils/cn'

/**
 * Vertical-stacked section header (no split-header, eyebrow used sparingly).
 * Pass `eyebrow` only where it earns its place (page uses <= 1 per 3 sections).
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'mx-auto max-w-2xl text-center items-center' : 'max-w-2xl',
        className,
      )}
    >
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-bright)]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold leading-[1.1] text-fg sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      )}
    </Reveal>
  )
}
