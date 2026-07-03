import { Check, Minus } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'
import { plans, comparison, type ComparisonRow } from '@/data/plans'
import { cn } from '@/utils/cn'

const cols = ['starter', 'pro', 'business', 'enterprise'] as const

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="mx-auto size-4 text-[var(--color-cyan)]" />
  if (value === false) return <Minus className="mx-auto size-4 text-faint" />
  return <span className="text-xs text-fg">{value}</span>
}

export function PricingComparison() {
  return (
    <Section id="comparacion" spacing="default" className="bg-[var(--color-bg-soft)]/40">
      <SectionHeader title="Comparación de planes en detalle" align="center" />

      {/* Desktop table */}
      <Reveal className="mt-12 hidden overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] lg:block">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[var(--color-surface)]">
              <th className="p-4 text-left font-semibold text-muted">Funcionalidad</th>
              {plans.map((p) => (
                <th
                  key={p.id}
                  className={cn('p-4 text-center font-semibold', p.featured ? 'text-[var(--color-accent-bright)]' : 'text-fg')}
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map((row: ComparisonRow, i) => (
              <tr key={row.label} className={cn('border-t border-[var(--color-line)]', i % 2 === 1 && 'bg-[var(--color-surface)]/40')}>
                <td className="p-4 text-muted">
                  {row.label}
                  {row.hint && <span className="ml-1 text-[10px] text-faint">({row.hint})</span>}
                </td>
                {cols.map((c) => (
                  <td key={c} className="p-4 text-center">
                    <Cell value={row[c]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      {/* Mobile cards */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
        {plans.map((p) => (
          <div
            key={p.id}
            className={cn(
              'rounded-[var(--radius-lg)] border bg-[var(--color-surface)] p-5',
              p.featured ? 'border-[var(--color-accent-bright)]/50' : 'border-[var(--color-line)]',
            )}
          >
            <h3 className="mb-3 text-base font-bold text-fg">{p.name}</h3>
            <ul className="space-y-2">
              {comparison.map((row) => (
                <li key={row.label} className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-muted">{row.label}</span>
                  <span className="shrink-0 text-right">
                    <Cell value={row[p.id as (typeof cols)[number]]} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
