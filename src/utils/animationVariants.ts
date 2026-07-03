import type { Variants } from 'framer-motion'

export const EASE = [0.16, 1, 0.3, 1] as const

/** Fade + rise, used for scroll-reveal of section blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

/** Parent that staggers its children on view. */
export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
}

/** Shared viewport config so reveals fire once, a third of the way in. */
export const viewportOnce = { once: true, amount: 0.25 } as const
