import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Minus, Trash2, CreditCard, Search, Check } from 'lucide-react'
import { MockFrame } from './MockFrame'
import { formatCurrency } from '@/utils/formatCurrency'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/utils/cn'

interface Product {
  id: string
  name: string
  price: number
  stock: number
}

const catalog: Product[] = [
  { id: 'p1', name: 'Alimento premium 3kg', price: 18400, stock: 42 },
  { id: 'p2', name: 'Collar de cuero M', price: 9600, stock: 12 },
  { id: 'p3', name: 'Shampoo antipulgas', price: 5200, stock: 27 },
  { id: 'p4', name: 'Juguete mordillo', price: 3800, stock: 9 },
  { id: 'p5', name: 'Piedras sanitarias 4kg', price: 7100, stock: 18 },
  { id: 'p6', name: 'Snack dental x6', price: 4300, stock: 33 },
]

const payMethods = ['Efectivo', 'Transferencia', 'Tarjeta', 'Mercado Pago']

export function POSMockup() {
  const toast = useToast()
  const [cart, setCart] = useState<Record<string, number>>({ p1: 1, p3: 2 })
  const [pay, setPay] = useState('Efectivo')
  const [sold, setSold] = useState<string[]>([])

  const items = Object.entries(cart).filter(([, q]) => q > 0)
  const total = useMemo(
    () => items.reduce((sum, [id, q]) => sum + (catalog.find((p) => p.id === id)!.price * q), 0),
    [items],
  )

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }))
  const sub = (id: string) => setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) - 1) }))
  const remove = (id: string) => setCart((c) => ({ ...c, [id]: 0 }))

  function checkout() {
    if (items.length === 0) {
      toast({ variant: 'warning', title: 'Carrito vacío', description: 'Agregá productos para cobrar.' })
      return
    }
    setSold(items.map(([id]) => id))
    setTimeout(() => setSold([]), 1200)
    toast({
      variant: 'success',
      title: 'Venta registrada',
      description: `${formatCurrency(total)} con ${pay}. Stock descontado y caja actualizada.`,
    })
    setCart({})
  }

  return (
    <MockFrame title="Punto de venta" subtitle="Petshop Luna · Mostrador" accent="linear-gradient(135deg,#22d3ee,#3b82f6)">
      <div className="grid gap-0 lg:grid-cols-[1.5fr_1fr]">
        {/* Catalog */}
        <div className="border-b border-[var(--color-line)] p-4 lg:border-b-0 lg:border-r">
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg-soft)] px-3 py-2 text-sm text-faint">
            <Search className="size-4" />
            <span>Buscar producto o escanear código</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {catalog.map((p) => (
              <button
                key={p.id}
                onClick={() => add(p.id)}
                className={cn(
                  'group relative rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-2.5 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent-bright)]',
                  sold.includes(p.id) && 'border-[var(--color-success)]',
                )}
              >
                <div className="mb-6 text-xs font-medium leading-tight text-fg">{p.name}</div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className="tnum text-xs font-semibold text-[var(--color-cyan)]">
                    {formatCurrency(p.price)}
                  </span>
                  <span className="grid size-6 place-items-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)] transition-colors group-hover:bg-[var(--color-accent-bright)] group-hover:text-white">
                    <Plus className="size-3.5" />
                  </span>
                </div>
                <AnimatePresence>
                  {sold.includes(p.id) && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute right-2 top-2 grid size-5 place-items-center rounded-full bg-[var(--color-success)] text-[#04121f]"
                    >
                      <Check className="size-3" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="flex flex-col p-4">
          <p className="mb-2 text-sm font-semibold text-fg">Carrito</p>
          <ul className="mb-3 flex-1 space-y-2">
            <AnimatePresence initial={false}>
              {items.length === 0 && (
                <li className="rounded-lg border border-dashed border-[var(--color-line)] p-4 text-center text-xs text-faint">
                  Tocá un producto para sumarlo
                </li>
              )}
              {items.map(([id, q]) => {
                const p = catalog.find((x) => x.id === id)!
                return (
                  <motion.li
                    key={id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-2 rounded-lg bg-[var(--color-bg-soft)] p-2"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs text-fg">{p.name}</p>
                      <p className="tnum text-[11px] text-faint">{formatCurrency(p.price)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <IconBtn onClick={() => sub(id)}>
                        <Minus className="size-3" />
                      </IconBtn>
                      <span className="tnum w-5 text-center text-xs text-fg">{q}</span>
                      <IconBtn onClick={() => add(id)}>
                        <Plus className="size-3" />
                      </IconBtn>
                      <IconBtn onClick={() => remove(id)}>
                        <Trash2 className="size-3" />
                      </IconBtn>
                    </div>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </ul>

          <div className="mb-2 flex flex-wrap gap-1.5">
            {payMethods.map((m) => (
              <button
                key={m}
                onClick={() => setPay(m)}
                className={cn(
                  'rounded-full border px-2.5 py-1 text-[11px] transition-colors',
                  pay === m
                    ? 'border-[var(--color-accent-bright)] bg-[var(--color-accent-soft)] text-fg'
                    : 'border-[var(--color-line)] text-muted hover:text-fg',
                )}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="mb-3 flex items-center justify-between border-t border-[var(--color-line)] pt-3">
            <span className="text-sm text-muted">Total</span>
            <motion.span
              key={total}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="tnum text-lg font-bold text-fg"
            >
              {formatCurrency(total)}
            </motion.span>
          </div>

          <button
            onClick={checkout}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <CreditCard className="size-4" /> Cobrar
          </button>
        </div>
      </div>
    </MockFrame>
  )
}

function IconBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="grid size-6 place-items-center rounded-md border border-[var(--color-line)] text-muted transition-colors hover:border-[var(--color-line-strong)] hover:text-fg"
    >
      {children}
    </button>
  )
}
