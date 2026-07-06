import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/utils/cn'

/**
 * Card with a cursor-following spotlight border and optional subtle 3D tilt.
 * All pointer values live in motion values (never React state) per taste-skill 3.B.
 */
export function MotionCard({
  children,
  className,
  tilt = true,
  spotlight = true,
}: {
  children: ReactNode
  className?: string
  tilt?: boolean
  spotlight?: boolean
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const glowX = useMotionValue(-200)
  const glowY = useMotionValue(-200)

  const rotX = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 200, damping: 20 })
  const rotY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 })
  const glowBg = useTransform(
    [glowX, glowY],
    ([gx, gy]) => `radial-gradient(240px circle at ${gx}px ${gy}px, rgba(59,130,246,0.16), transparent 70%)`,
  )

  const active = !reduce

  function onMove(e: React.MouseEvent) {
    if (!ref.current || !active) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
    glowX.set(e.clientX - r.left)
    glowY.set(e.clientY - r.top)
  }
  function onLeave() {
    px.set(0.5)
    py.set(0.5)
    glowX.set(-200)
    glowY.set(-200)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        tilt && active
          ? { rotateX: rotX, rotateY: rotY, transformPerspective: 900, transformStyle: 'preserve-3d' }
          : undefined
      }
      className={cn(
        'card card-hover group/card relative overflow-hidden rounded-[var(--radius-lg)]',
        className,
      )}
    >
      {spotlight && active && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
          style={{ background: glowBg }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  )
}
