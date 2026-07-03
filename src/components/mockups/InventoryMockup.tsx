import { useState } from 'react'
import { motion } from 'framer-motion'
import { PackagePlus, PackageMinus, AlertTriangle } from 'lucide-react'
import { MockFrame } from './MockFrame'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/utils/cn'

interface Row {
  id: string
  name: string
  category: string
  stock: number
  min: number
}

const initial: Row[] = [
  { id: 's1', name: 'Alimento premium 3kg', category: 'Alimentos', stock: 42, min: 10 },
  { id: 's2', name: 'Collar de cuero M', category: 'Accesorios', stock: 5, min: 8 },
  { id: 's3', name: 'Shampoo antipulgas', category: 'Higiene', stock: 27, min: 6 },
  { id: 's4', name: 'Juguete mordillo', category: 'Juguetes', stock: 3, min: 5 },
  { id: 's5', name: 'Piedras sanitarias 4kg', category: 'Higiene', stock: 18, min: 6 },
]

export function InventoryMockup() {
  const toast = useToast()
  const [rows, setRows] = useState<Row[]>(initial)

  function change(id: string, delta: number) {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r
        const next = Math.max(0, r.stock + delta)
        if (delta < 0 && next <= r.min) {
          toast({ variant: 'warning', title: 'Bajo stock', description: `${r.name} llegó al mínimo. Conviene reponer.` })
        }
        return { ...r, stock: next }
      }),
    )
    if (delta > 0) {
      toast({ variant: 'success', title: 'Ingreso de stock', description: 'Se sumaron unidades al inventario.' })
    }
  }

  return (
    <MockFrame title="Stock y productos" subtitle="Ferretería Roma · Inventario" accent="linear-gradient(135deg,#8b5cf6,#3b82f6)">
      <div className="p-4">
        <div className="overflow-hidden rounded-xl border border-[var(--color-line)]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-line)] bg-[var(--color-surface)] text-[11px] uppercase tracking-wide text-faint">
                <th className="px-3 py-2 font-medium">Producto</th>
                <th className="hidden px-3 py-2 font-medium sm:table-cell">Categoría</th>
                <th className="px-3 py-2 text-center font-medium">Stock</th>
                <th className="px-3 py-2 text-right font-medium">Ajustar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-line)]">
              {rows.map((r) => {
                const low = r.stock <= r.min
                return (
                  <tr key={r.id} className="bg-[var(--color-bg-soft)]">
                    <td className="px-3 py-2.5">
                      <span className="text-fg">{r.name}</span>
                    </td>
                    <td className="hidden px-3 py-2.5 text-muted sm:table-cell">{r.category}</td>
                    <td className="px-3 py-2.5 text-center">
                      <motion.span
                        key={r.stock}
                        initial={{ scale: 1.25, color: low ? '#fbbf24' : '#22d3ee' }}
                        animate={{ scale: 1, color: low ? '#fbbf24' : '#f8fafc' }}
                        className="tnum inline-flex items-center gap-1 font-semibold"
                      >
                        {low && <AlertTriangle className="size-3" />}
                        {r.stock}
                      </motion.span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => change(r.id, -1)}
                          className="grid size-7 place-items-center rounded-md border border-[var(--color-line)] text-muted transition-colors hover:border-[var(--color-danger)] hover:text-[var(--color-danger)]"
                          title="Simular venta"
                        >
                          <PackageMinus className="size-3.5" />
                        </button>
                        <button
                          onClick={() => change(r.id, 5)}
                          className="grid size-7 place-items-center rounded-md border border-[var(--color-line)] text-muted transition-colors hover:border-[var(--color-success)] hover:text-[var(--color-success)]"
                          title="Simular ingreso"
                        >
                          <PackagePlus className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-faint">
          <Badge tone="warning">
            <AlertTriangle className="size-3" /> {rows.filter((r) => r.stock <= r.min).length} en bajo stock
          </Badge>
          <span className={cn('hidden sm:inline')}>Restá o sumá unidades para ver la alerta en vivo.</span>
        </div>
      </div>
    </MockFrame>
  )
}
