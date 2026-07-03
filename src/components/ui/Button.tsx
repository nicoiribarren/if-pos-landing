import { forwardRef, useRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: LucideIcon
  iconRight?: LucideIcon
  loading?: boolean
  magnetic?: boolean
  fullWidth?: boolean
  children?: ReactNode
}

const base =
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold ' +
  'transition-[transform,box-shadow,background-color,color] duration-200 ease-[var(--ease-out-expo)] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-[var(--color-bg)] disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.97] cursor-pointer'

const variants: Record<Variant, string> = {
  // Blue-600 base keeps white text at WCAG AA; cyan lives in the hover glow only.
  primary:
    'bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white shadow-[0_8px_30px_-8px_rgba(37,99,235,0.6)] ' +
    'hover:shadow-[0_10px_40px_-8px_rgba(34,211,238,0.55)] hover:-translate-y-0.5',
  secondary:
    'glass text-fg hover:bg-white/[0.07] hover:-translate-y-0.5',
  outline:
    'border border-[var(--color-line-strong)] text-fg hover:border-[var(--color-accent-bright)] hover:bg-white/[0.03]',
  ghost: 'text-muted hover:text-fg hover:bg-white/[0.04]',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconRight: IconRight,
    loading,
    magnetic = false,
    fullWidth,
    className,
    children,
    disabled,
    ...props
  },
  ref,
) {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 18 })
  const y = useSpring(my, { stiffness: 220, damping: 18 })

  const enableMagnet = magnetic && !reduce

  function onMove(e: React.MouseEvent) {
    if (!enableMagnet || !wrapRef.current) return
    const r = wrapRef.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 14)
    my.set(((e.clientY - r.top) / r.height - 0.5) * 14)
  }
  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={enableMagnet ? { x, y } : undefined}
      className={cn('inline-flex', fullWidth && 'w-full')}
    >
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        {...props}
      >
        {loading && (
          <span
            className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden
          />
        )}
        {!loading && Icon && <Icon className="size-[1.15em]" strokeWidth={2} />}
        {children}
        {!loading && IconRight && <IconRight className="size-[1.15em]" strokeWidth={2} />}
      </button>
    </motion.div>
  )
})
