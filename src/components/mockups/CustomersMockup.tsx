import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, HandCoins, History } from 'lucide-react'
import { MockFrame } from './MockFrame'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/utils/formatCurrency'
import { useToast } from '@/hooks/useToast'

const purchases = [
  { label: 'Alimento premium 3kg', date: 'Hoy', amount: 18400 },
  { label: 'Snack dental x6', date: 'Hace 5 días', amount: 4300 },
  { label: 'Collar de cuero M', date: 'Hace 2 semanas', amount: 9600 },
]

export function CustomersMockup() {
  const toast = useToast()
  const [debt, setDebt] = useState(46200)
  const totalBought = 328500

  function pay() {
    const amount = Math.min(debt, 20000)
    setDebt((d) => Math.max(0, d - amount))
    toast({ variant: 'success', title: 'Pago registrado', description: `Se registró ${formatCurrency(amount)} a cuenta.` })
  }

  return (
    <MockFrame title="Clientes" subtitle="Distribuidora Sur · Ficha de cliente" accent="linear-gradient(135deg,#3b82f6,#8b5cf6)">
      <div className="p-4">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-[#3b82f6] to-[#22d3ee] text-sm font-bold text-[#04121f]">
            ER
          </span>
          <div>
            <p className="font-semibold text-fg">Comercio El Roble</p>
            <div className="mt-0.5 flex flex-wrap items-center gap-3 text-[11px] text-faint">
              <span className="flex items-center gap-1">
                <Phone className="size-3" /> +54 9 351 555 0134
              </span>
              <span className="flex items-center gap-1">
                <Mail className="size-3" /> compras@elroble.com
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2.5">
          <Stat label="Total comprado" value={formatCurrency(totalBought)} />
          <Stat label="Última compra" value="Hoy" />
          <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-3">
            <p className="text-[11px] text-faint">Deuda</p>
            <motion.p
              key={debt}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              className={debt > 0 ? 'tnum mt-1 text-sm font-semibold text-[var(--color-warning)]' : 'tnum mt-1 text-sm font-semibold text-[var(--color-success)]'}
            >
              {debt > 0 ? formatCurrency(debt) : 'Al día'}
            </motion.p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
            <History className="size-3.5" /> Historial de compras
          </p>
          <Badge tone="accent">Cuenta corriente</Badge>
        </div>
        <ul className="mb-4 space-y-1.5">
          {purchases.map((p, i) => (
            <li key={i} className="flex items-center justify-between rounded-lg bg-[var(--color-bg-soft)] px-3 py-2 text-xs">
              <span className="text-fg">{p.label}</span>
              <span className="flex items-center gap-3">
                <span className="text-faint">{p.date}</span>
                <span className="tnum text-muted">{formatCurrency(p.amount)}</span>
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={pay}
          disabled={debt === 0}
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-3.5 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
        >
          <HandCoins className="size-3.5" /> Registrar pago
        </button>
      </div>
    </MockFrame>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-3">
      <p className="text-[11px] text-faint">{label}</p>
      <p className="tnum mt-1 text-sm font-semibold text-fg">{value}</p>
    </div>
  )
}
