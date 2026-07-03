import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Lock, Unlock, ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { MockFrame } from './MockFrame'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/utils/formatCurrency'
import { useToast } from '@/hooks/useToast'
import { Counter } from '@/components/effects/Counter'

const breakdown = [
  { label: 'Efectivo', value: 141900 },
  { label: 'Transferencia', value: 98600 },
  { label: 'Tarjeta', value: 52400 },
  { label: 'Mercado Pago', value: 28900 },
]

const movements = [
  { type: 'in', label: 'Venta #4821', amount: 18400 },
  { type: 'in', label: 'Venta #4822', amount: 9600 },
  { type: 'out', label: 'Pago proveedor', amount: 24000 },
  { type: 'in', label: 'Venta #4823', amount: 5200 },
]

export function CashRegisterMockup() {
  const toast = useToast()
  const [open, setOpen] = useState(true)
  const [closed, setClosed] = useState(false)

  const total = breakdown.reduce((s, b) => s + b.value, 0)

  function apertura() {
    setOpen(true)
    setClosed(false)
    toast({ variant: 'success', title: 'Caja abierta', description: 'Monto inicial cargado. Todo movimiento queda registrado.' })
  }
  function cierre() {
    setOpen(false)
    setClosed(true)
    toast({ variant: 'info', title: 'Caja cerrada', description: `Total del turno ${formatCurrency(total)}. Diferencia $0.` })
  }

  return (
    <MockFrame title="Caja diaria" subtitle="Kiosco Centro · Turno tarde" accent="linear-gradient(135deg,#60a5fa,#22d3ee)">
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {open ? <Unlock className="size-4 text-[var(--color-success)]" /> : <Lock className="size-4 text-[var(--color-warning)]" />}
            <span className="text-sm font-semibold text-fg">Estado</span>
          </div>
          <Badge tone={open ? 'success' : 'warning'} dot={open}>
            {open ? 'Abierta' : 'Cerrada'}
          </Badge>
        </div>

        <div className="mb-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 text-center">
          <p className="text-xs text-faint">Total del turno</p>
          <p className="mt-1 text-2xl font-bold text-fg">
            <Counter value={total} prefix="$ " />
          </p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {breakdown.map((b) => (
            <div key={b.label} className="rounded-lg bg-[var(--color-bg-soft)] p-2.5">
              <p className="text-[11px] text-faint">{b.label}</p>
              <p className="tnum mt-1 text-sm font-semibold text-fg">{formatCurrency(b.value)}</p>
            </div>
          ))}
        </div>

        <p className="mb-2 text-xs font-medium text-muted">Movimientos</p>
        <ul className="mb-4 space-y-1.5">
          {movements.map((m, i) => (
            <li key={i} className="flex items-center justify-between rounded-lg bg-[var(--color-bg-soft)] px-3 py-2 text-xs">
              <span className="flex items-center gap-2 text-fg">
                {m.type === 'in' ? (
                  <ArrowDownRight className="size-3.5 text-[var(--color-success)]" />
                ) : (
                  <ArrowUpRight className="size-3.5 text-[var(--color-danger)]" />
                )}
                {m.label}
              </span>
              <span className={m.type === 'in' ? 'tnum text-[var(--color-success)]' : 'tnum text-[var(--color-danger)]'}>
                {m.type === 'in' ? '+' : '-'}
                {formatCurrency(m.amount)}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={apertura}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line-strong)] px-3.5 py-2 text-xs font-medium text-fg transition-colors hover:border-[var(--color-accent-bright)]"
          >
            <Unlock className="size-3.5" /> Simular apertura
          </button>
          <button
            onClick={cierre}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-3.5 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5 active:scale-95"
          >
            <Lock className="size-3.5" /> Simular cierre
          </button>
        </div>

        <AnimatePresence>
          {closed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 overflow-hidden"
            >
              <div className="rounded-lg border border-[var(--color-success)]/30 bg-[var(--color-success)]/10 p-3 text-xs text-[var(--color-success)]">
                Cierre confirmado. Total contado {formatCurrency(total)}, diferencia $0.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MockFrame>
  )
}
