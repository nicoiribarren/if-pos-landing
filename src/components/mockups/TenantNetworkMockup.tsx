import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Server, Lock } from 'lucide-react'
import { businesses } from '@/data/businesses'
import { site } from '@/config/site'
import { cn } from '@/utils/cn'

// Positions (%) around the central hub for the 6 businesses, lg+ only.
const nodePos = [
  { x: 12, y: 18 },
  { x: 84, y: 14 },
  { x: 6, y: 60 },
  { x: 90, y: 58 },
  { x: 26, y: 90 },
  { x: 72, y: 92 },
]

export function TenantNetworkMockup() {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState<string | null>(null)

  return (
    <div className="relative">
      {/* Desktop: radial hub-and-spoke */}
      <div className="relative hidden aspect-[4/3] w-full lg:block">
        <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {nodePos.map((p, i) => {
            const active = hover === businesses[i].id
            return (
              <motion.line
                key={i}
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                stroke={active ? businesses[i].accent : 'rgba(148,163,184,0.28)'}
                strokeWidth={active ? 0.5 : 0.3}
                strokeDasharray="1.6 1.6"
                initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 * i }}
              />
            )
          })}
        </svg>

        {/* Central hub */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="glass flex flex-col items-center gap-1 rounded-2xl px-5 py-4 text-center shadow-[var(--shadow-glow)]">
            <span className="grid size-10 place-items-center rounded-xl accent-gradient text-[#04121f]">
              <Server className="size-5" strokeWidth={2.2} />
            </span>
            <p className="mt-1 text-sm font-bold text-fg">Plataforma {site.productName}</p>
            <p className="text-[11px] text-faint">Un sistema, muchos negocios</p>
          </div>
        </div>

        {/* Business nodes */}
        {businesses.map((b, i) => (
          <button
            key={b.id}
            onMouseEnter={() => setHover(b.id)}
            onMouseLeave={() => setHover(null)}
            style={{ left: `${nodePos[i].x}%`, top: `${nodePos[i].y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <TenantChip name={b.name} industry={b.industry} accent={b.accent} active={hover === b.id} />
          </button>
        ))}
      </div>

      {/* Mobile / tablet: hub on top + grid */}
      <div className="lg:hidden">
        <div className="glass mx-auto mb-5 flex w-fit flex-col items-center gap-1 rounded-2xl px-5 py-4 text-center">
          <span className="grid size-10 place-items-center rounded-xl accent-gradient text-[#04121f]">
            <Server className="size-5" strokeWidth={2.2} />
          </span>
          <p className="mt-1 text-sm font-bold text-fg">Plataforma {site.productName}</p>
          <p className="text-[11px] text-faint">Un sistema, muchos negocios</p>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {businesses.map((b) => (
            <TenantChip key={b.id} name={b.name} industry={b.industry} accent={b.accent} active stacked />
          ))}
        </div>
      </div>
    </div>
  )
}

function TenantChip({
  name,
  industry,
  accent,
  active,
  stacked,
}: {
  name: string
  industry: string
  accent: string
  active: boolean
  stacked?: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-xl border bg-[var(--color-surface)] px-3 py-2 text-left transition-all duration-300',
        active ? 'border-[var(--color-line-strong)] shadow-lg' : 'border-[var(--color-line)]',
        stacked ? 'w-full' : 'w-max',
      )}
      style={active && !stacked ? { boxShadow: `0 0 0 1px ${accent}55, 0 12px 30px -12px ${accent}66` } : undefined}
    >
      <span className="grid size-7 shrink-0 place-items-center rounded-lg text-[10px] font-bold text-[#04121f]" style={{ background: accent }}>
        {name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-fg">{name}</p>
        <p className="flex items-center gap-1 text-[10px] text-faint">
          <Lock className="size-2.5" /> {industry}
        </p>
      </div>
    </div>
  )
}
