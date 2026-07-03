import { cn } from '@/utils/cn'

/**
 * Ambient aurora background. Single accent (blue/cyan) plus violet used ONLY
 * here as ambient glow, never on interactive elements.
 */
export function GlowBackground({
  className,
  variant = 'default',
}: {
  className?: string
  variant?: 'default' | 'hero' | 'subtle'
}) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      {variant === 'hero' && (
        <>
          <div className="animate-aurora absolute -top-40 left-1/4 size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.32),transparent_65%)] blur-2xl" />
          <div className="animate-aurora absolute -top-20 right-1/5 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.24),transparent_65%)] blur-2xl [animation-delay:-7s]" />
          <div className="animate-aurora absolute top-40 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.2),transparent_65%)] blur-3xl [animation-delay:-13s]" />
        </>
      )}
      {variant === 'default' && (
        <>
          <div className="animate-aurora absolute -left-20 top-1/4 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16),transparent_68%)] blur-3xl" />
          <div className="animate-aurora absolute -right-24 bottom-0 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.12),transparent_68%)] blur-3xl [animation-delay:-9s]" />
        </>
      )}
      {variant === 'subtle' && (
        <div className="animate-aurora absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.1),transparent_70%)] blur-3xl" />
      )}
    </div>
  )
}
