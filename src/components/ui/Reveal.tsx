import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '@/utils/animationVariants'
import { cn } from '@/utils/cn'

/** Fade + rise on scroll into view. Fires once. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'span' | 'section'
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]
  return (
    <MotionTag
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  )
}
