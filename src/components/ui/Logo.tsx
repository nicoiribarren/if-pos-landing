import { site } from '@/config/site'
import { cn } from '@/utils/cn'

/** Brand monogram (inline SVG) + wordmark. */
export function Logo({ className, showCompany = false }: { className?: string; showCompany?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="relative grid size-9 place-items-center rounded-[10px] border border-[var(--color-line-strong)] bg-[var(--color-bg-soft)]">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden>
          <path d="M9 9H12V23H9V9Z" fill="url(#lg)" />
          <path d="M15 9H24V11.6H18V14.4H23V17H18V23H15V9Z" fill="#F8FAFC" />
          <defs>
            <linearGradient id="lg" x1="6" y1="8" x2="26" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-tight text-fg">{site.productName}</span>
        {showCompany && (
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-faint">
            by {site.company}
          </span>
        )}
      </span>
    </span>
  )
}
