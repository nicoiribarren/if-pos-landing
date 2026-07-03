import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, TrendingUp } from 'lucide-react'
import { MockFrame } from './MockFrame'
import { formatCurrency } from '@/utils/formatCurrency'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/utils/cn'

const ranges = ['Hoy', '7 días', 'Mes'] as const
type Range = (typeof ranges)[number]

const dataByRange: Record<Range, { revenue: number; sales: number; ticket: number; bars: number[]; top: [string, number][] }> = {
  Hoy: {
    revenue: 318400,
    sales: 47,
    ticket: 6774,
    bars: [30, 45, 38, 62, 55, 70, 48],
    top: [['Alimento premium 3kg', 12], ['Snack dental x6', 9], ['Collar de cuero M', 7]],
  },
  '7 días': {
    revenue: 2140800,
    sales: 312,
    ticket: 6862,
    bars: [52, 61, 48, 73, 66, 88, 79],
    top: [['Alimento premium 3kg', 84], ['Piedras sanitarias 4kg', 61], ['Snack dental x6', 52]],
  },
  Mes: {
    revenue: 8642300,
    sales: 1284,
    ticket: 6730,
    bars: [40, 58, 66, 72, 61, 80, 92],
    top: [['Alimento premium 3kg', 342], ['Shampoo antipulgas', 228], ['Collar de cuero M', 196]],
  },
}

export function ReportsMockup() {
  const toast = useToast()
  const [range, setRange] = useState<Range>('Hoy')
  const d = useMemo(() => dataByRange[range], [range])

  return (
    <MockFrame title="Reportes" subtitle="Perfumería Bella · Panel de análisis" accent="linear-gradient(135deg,#22d3ee,#8b5cf6)">
      <div className="p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex rounded-full border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-1">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                  range === r ? 'bg-[var(--color-accent-soft)] text-fg' : 'text-muted hover:text-fg',
                )}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={() => toast({ variant: 'info', title: 'Exportación simulada', description: 'En modo demo no se genera archivo real.' })}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line-strong)] px-3 py-1.5 text-xs font-medium text-fg transition-colors hover:border-[var(--color-accent-bright)]"
          >
            <Download className="size-3.5" /> Exportar
          </button>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2.5">
          <Metric label="Facturación" value={formatCurrency(d.revenue)} />
          <Metric label="Ventas" value={String(d.sales)} />
          <Metric label="Ticket prom." value={formatCurrency(d.ticket)} />
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-3">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium text-muted">Evolución de ventas</p>
              <span className="inline-flex items-center gap-1 text-xs text-[var(--color-success)]">
                <TrendingUp className="size-3.5" /> {range}
              </span>
            </div>
            <div className="flex h-28 items-end gap-2">
              {d.bars.map((h, i) => (
                <motion.div
                  key={`${range}-${i}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 rounded-t bg-gradient-to-t from-[#2563eb]/40 to-[#22d3ee]"
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-3">
            <p className="mb-2 text-xs font-medium text-muted">Más vendidos</p>
            <ul className="space-y-2.5">
              {d.top.map(([name, qty], i) => (
                <li key={name}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="truncate text-fg">{name}</span>
                    <span className="tnum shrink-0 text-faint">{qty} u.</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-bg-soft)]">
                    <motion.div
                      key={`${range}-bar-${i}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${100 - i * 26}%` }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full accent-gradient"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MockFrame>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-3">
      <p className="text-[11px] text-faint">{label}</p>
      <p className="tnum mt-1 text-sm font-semibold text-fg">{value}</p>
    </div>
  )
}
