import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface TabDef {
  id: string
  label: string
  icon?: LucideIcon
}

/** Pill tabs with a shared animated indicator (layoutId). */
export function Tabs({
  tabs,
  active,
  onChange,
  layoutId,
  className,
  size = 'md',
}: {
  tabs: TabDef[]
  active: string
  onChange: (id: string) => void
  layoutId: string
  className?: string
  size?: 'sm' | 'md'
}) {
  return (
    <div
      className={cn(
        'inline-flex flex-wrap items-center gap-1 rounded-full border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-1',
        className,
      )}
      role="tablist"
    >
      {tabs.map((t) => {
        const isActive = t.id === active
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(t.id)}
            className={cn(
              'relative inline-flex items-center gap-1.5 rounded-full font-medium transition-colors duration-200',
              size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
              isActive ? 'text-white' : 'text-muted hover:text-fg',
            )}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {t.icon && <t.icon className={cn('relative z-10', size === 'sm' ? 'size-3.5' : 'size-4')} />}
            <span className="relative z-10">{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}
