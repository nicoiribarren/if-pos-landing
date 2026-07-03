import { motion, useScroll, useSpring } from 'framer-motion'

/** Top-of-page reading progress bar driven by scroll (no scroll listeners). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left accent-gradient"
    />
  )
}
