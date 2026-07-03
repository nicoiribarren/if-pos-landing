import { cn } from '@/utils/cn'

/** Technical grid with a radial fade, purely decorative background. */
export function AnimatedGrid({ className, fade = 'center' }: { className?: string; fade?: 'center' | 'top' | 'bottom' }) {
  const maskMap = {
    center: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%)',
    top: 'linear-gradient(to bottom, #000, transparent 70%)',
    bottom: 'linear-gradient(to top, #000, transparent 70%)',
  }
  return (
    <div
      aria-hidden
      className={cn('grid-lines pointer-events-none absolute inset-0 opacity-60', className)}
      style={{ WebkitMaskImage: maskMap[fade], maskImage: maskMap[fade] }}
    />
  )
}
