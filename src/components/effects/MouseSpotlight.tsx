import { useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from 'framer-motion'

/**
 * Hero spotlight that follows the cursor. Wrap a relative section; the glow
 * tracks pointer via motion values (no React state re-renders).
 */
export function MouseSpotlight({ size = 520 }: { size?: number }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const bg = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, rgba(34,211,238,0.1), transparent 65%)`

  if (reduce) return null

  return (
    <motion.div
      ref={ref}
      aria-hidden
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        x.set(e.clientX - r.left)
        y.set(e.clientY - r.top)
      }}
      onMouseLeave={() => {
        x.set(-1000)
        y.set(-1000)
      }}
      className="pointer-events-auto absolute inset-0 z-0"
      style={{ background: bg }}
    />
  )
}
