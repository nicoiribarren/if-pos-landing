import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

/**
 * Infinite horizontal marquee. Duplicates children for a seamless loop and
 * pauses on hover. Single instance per page (taste-skill marquee rule).
 */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className,
}: {
  children: ReactNode
  /** Seconds per loop. */
  speed?: number
  reverse?: boolean
  className?: string
}) {
  return (
    <div className={cn('marquee-pause mask-fade-x group relative flex overflow-hidden', className)}>
      <div
        className="animate-marquee flex shrink-0 items-center"
        style={{ ['--marquee-duration' as string]: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
