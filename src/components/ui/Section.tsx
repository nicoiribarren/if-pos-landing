import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

/** Consistent vertical rhythm + anchor id + optional container. */
export function Section({
  id,
  children,
  className,
  container = true,
  spacing = 'default',
}: {
  id?: string
  children: ReactNode
  className?: string
  container?: boolean
  spacing?: 'default' | 'tight' | 'loose' | 'none'
}) {
  const pad = {
    default: 'py-20 md:py-28',
    tight: 'py-14 md:py-20',
    loose: 'py-24 md:py-36',
    none: '',
  }[spacing]

  return (
    <section id={id} className={cn('relative scroll-mt-24', pad, className)}>
      {container ? <div className="container-page">{children}</div> : children}
    </section>
  )
}
