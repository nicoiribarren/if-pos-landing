import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  LayoutDashboard,
  ShoppingCart,
  Wallet,
  Boxes,
  Users,
  BarChart3,
  UserCog,
  Plus,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react'
import { MockFrame } from './MockFrame'
import { Tabs, type TabDef } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { businesses } from '@/data/businesses'
import { plans } from '@/data/plans'
import { formatCurrency, formatNumber } from '@/utils/formatCurrency'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/utils/cn'

const tabs: TabDef[] = [
  { id: 'ventas', label: 'Ventas', icon: ShoppingCart },
  { id: 'caja', label: 'Caja', icon: Wallet },
  { id: 'stock', label: 'Stock', icon: Boxes },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'reportes', label: 'Reportes', icon: BarChart3 },
  { id: 'usuarios', label: 'Usuarios', icon: UserCog },
]

const navItems = [
  { id: 'ventas', label: 'Ventas', icon: ShoppingCart },
  { id: 'caja', label: 'Caja', icon: Wallet },
  { id: 'stock', label: 'Stock', icon: Boxes },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'reportes', label: 'Reportes', icon: BarChart3 },
  { id: 'usuarios', label: 'Usuarios', icon: UserCog },
]

const recentSales = [
  { id: '#4821', item: 'Alimento premium 3kg', pay: 'Efectivo', amount: 18400 },
  { id: '#4820', item: 'Collar + correa', pay: 'Transferencia', amount: 9600 },
  { id: '#4819', item: 'Shampoo antipulgas', pay: 'Mercado Pago', amount: 5200 },
  { id: '#4818', item: 'Juguete mordillo', pay: 'Débito', amount: 3800 },
]

export function DashboardMockup({ onOpenReport }: { onOpenReport?: () => void }) {
  const toast = useToast()
  const [tenantId, setTenantId] = useState(businesses[0].id)
  const [tab, setTab] = useState('ventas')

  const tenant = useMemo(() => businesses.find((b) => b.id === tenantId)!, [tenantId])
  const plan = plans.find((p) => p.id === tenant.plan)!
  const switchable = businesses.slice(0, 3)

  // Derive per-tenant bars so the chart changes when you switch business.
  const bars = useMemo(() => {
    const seed = tenant.metrics.todaySales
    return Array.from({ length: 7 }, (_, i) => 30 + ((seed * (i + 3)) % 70))
  }, [tenant])

  return (
    <MockFrame
      title={tenant.name}
      subtitle={`${tenant.industry} · Panel del negocio`}
      accent={`linear-gradient(135deg, ${tenant.accent}, #22d3ee)`}
      right={
        <div className="hidden items-center gap-2 md:flex">
          <Badge tone="accent">Plan {plan.name}</Badge>
        </div>
      }
    >
      {/* Tenant switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--color-line)] px-4 py-2.5">
        <span className="mr-1 text-[11px] font-medium uppercase tracking-wide text-faint">Negocio</span>
        {switchable.map((b) => (
          <button
            key={b.id}
            onClick={() => setTenantId(b.id)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              b.id === tenantId
                ? 'border-[var(--color-accent-bright)] bg-[var(--color-accent-soft)] text-fg'
                : 'border-[var(--color-line)] text-muted hover:text-fg',
            )}
          >
            {b.name}
          </button>
        ))}
        <span className="ml-auto hidden sm:block">
          <Badge tone="violet">Datos aislados</Badge>
        </span>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-0">
        {/* Sidebar */}
        <aside className="hidden w-14 flex-col items-center gap-1 border-r border-[var(--color-line)] py-3 sm:flex lg:w-40 lg:items-stretch lg:px-2">
          <div className="mb-2 hidden items-center gap-2 px-2 text-xs font-semibold text-faint lg:flex">
            <LayoutDashboard className="size-4" /> Menú
          </div>
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={cn(
                'flex items-center gap-2.5 rounded-lg p-2 text-sm transition-colors lg:px-3',
                tab === n.id
                  ? 'bg-[var(--color-accent-soft)] text-fg'
                  : 'text-muted hover:bg-white/5 hover:text-fg',
              )}
              title={n.label}
            >
              <n.icon className="size-4 shrink-0" />
              <span className="hidden lg:inline">{n.label}</span>
            </button>
          ))}
        </aside>

        {/* Main panel */}
        <div className="min-w-0 p-4">
          {/* Mobile tabs */}
          <div className="mb-4 sm:hidden">
            <Tabs tabs={tabs} active={tab} onChange={setTab} layoutId="dash-tabs-m" size="sm" />
          </div>

          {/* KPI row (changes per tenant) */}
          <div className="mb-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            <Kpi label="Ventas hoy" value={formatNumber(tenant.metrics.todaySales)} trend="+12%" />
            <Kpi label="Facturación" value={formatCurrency(tenant.metrics.todayRevenue)} trend="+8%" />
            <Kpi label="Ticket prom." value={formatCurrency(tenant.metrics.ticketAvg)} />
            <Kpi
              label="Bajo stock"
              value={String(tenant.metrics.lowStock)}
              warn={tenant.metrics.lowStock > 6}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tenant.id + tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {(tab === 'ventas' || tab === 'reportes') && (
                <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
                  <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-3">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-medium text-muted">Ventas últimos 7 días</p>
                      <span className="inline-flex items-center gap-1 text-xs text-[var(--color-success)]">
                        <TrendingUp className="size-3.5" /> en alza
                      </span>
                    </div>
                    <div className="flex h-24 items-end gap-1.5">
                      {bars.map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                          className="flex-1 rounded-t bg-gradient-to-t from-[#2563eb]/40 to-[#22d3ee]"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-3">
                    <p className="mb-2 text-xs font-medium text-muted">Últimas ventas</p>
                    <ul className="space-y-2">
                      {recentSales.slice(0, 3).map((s) => (
                        <li key={s.id} className="flex items-center justify-between gap-2 text-xs">
                          <span className="truncate text-fg">{s.item}</span>
                          <span className="tnum shrink-0 text-muted">{formatCurrency(s.amount)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {tab === 'caja' && (
                <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-fg">Caja del día</p>
                    <Badge tone={tenant.cashOpen ? 'success' : 'warning'} dot={tenant.cashOpen}>
                      {tenant.cashOpen ? 'Abierta' : 'Cerrada'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {[
                      ['Efectivo', tenant.metrics.todayRevenue * 0.42],
                      ['Transferencia', tenant.metrics.todayRevenue * 0.31],
                      ['Tarjeta', tenant.metrics.todayRevenue * 0.18],
                      ['Mercado Pago', tenant.metrics.todayRevenue * 0.09],
                    ].map(([label, amt]) => (
                      <div key={label as string} className="rounded-lg bg-[var(--color-bg-soft)] p-2.5">
                        <p className="text-[11px] text-faint">{label as string}</p>
                        <p className="tnum mt-1 text-sm font-semibold text-fg">
                          {formatCurrency(Math.round(amt as number))}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'stock' && (
                <ul className="divide-y divide-[var(--color-line)] rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)]">
                  {[
                    ['Alimento premium 3kg', 42, false],
                    ['Collar de cuero M', 5, true],
                    ['Shampoo antipulgas', 27, false],
                    ['Juguete mordillo', 3, true],
                  ].map(([name, qty, low]) => (
                    <li key={name as string} className="flex items-center justify-between px-3.5 py-2.5 text-sm">
                      <span className="text-fg">{name as string}</span>
                      <Badge tone={low ? 'warning' : 'neutral'}>
                        {low ? <AlertTriangle className="size-3" /> : null}
                        {qty as number} u.
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}

              {tab === 'clientes' && (
                <ul className="divide-y divide-[var(--color-line)] rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)]">
                  {[
                    ['Lucía Medina', 'Últ. compra hoy', 0],
                    ['Comercio El Roble', 'Cuenta corriente', 46200],
                    ['Franco Ruiz', 'Últ. compra ayer', 0],
                  ].map(([name, meta, debt]) => (
                    <li key={name as string} className="flex items-center justify-between px-3.5 py-2.5 text-sm">
                      <div>
                        <p className="text-fg">{name as string}</p>
                        <p className="text-[11px] text-faint">{meta as string}</p>
                      </div>
                      {(debt as number) > 0 ? (
                        <span className="tnum text-xs text-[var(--color-warning)]">
                          Debe {formatCurrency(debt as number)}
                        </span>
                      ) : (
                        <span className="text-xs text-[var(--color-success)]">Al día</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {tab === 'usuarios' && (
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {[
                    ['Dueño', 'Acceso total', tenant.accent],
                    ['Cajero', 'POS y caja', '#60a5fa'],
                    ['Repositor', 'Stock', '#22d3ee'],
                    ['Encargado', 'Reportes y stock', '#8b5cf6'],
                  ]
                    .slice(0, tenant.users >= 4 ? 4 : 2)
                    .map(([role, scope, color]) => (
                      <li
                        key={role as string}
                        className="flex items-center gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-3"
                      >
                        <span
                          className="grid size-8 place-items-center rounded-full text-xs font-bold text-[#04121f]"
                          style={{ background: color as string }}
                        >
                          {(role as string).slice(0, 1)}
                        </span>
                        <div>
                          <p className="text-sm text-fg">{role as string}</p>
                          <p className="text-[11px] text-faint">{scope as string}</p>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={() =>
                toast({
                  variant: 'success',
                  title: 'Venta registrada',
                  description: `${tenant.name}: se descontó stock y se sumó a la caja.`,
                })
              }
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-3.5 py-2 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              <Plus className="size-3.5" /> Nueva venta
            </button>
            <button
              onClick={() =>
                onOpenReport?.() ??
                toast({ variant: 'info', title: 'Reporte generado', description: 'Vista de reporte en modo demo.' })
              }
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line-strong)] px-3.5 py-2 text-xs font-medium text-fg transition-colors hover:border-[var(--color-accent-bright)]"
            >
              Ver reporte <ArrowUpRight className="size-3.5" />
            </button>
            <span className="ml-auto hidden text-[11px] text-faint sm:block">PWA instalada</span>
          </div>
        </div>
      </div>
    </MockFrame>
  )
}

function Kpi({ label, value, trend, warn }: { label: string; value: string; trend?: string; warn?: boolean }) {
  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-3">
      <p className="text-[11px] text-faint">{label}</p>
      <p className={cn('tnum mt-1 text-base font-semibold', warn ? 'text-[var(--color-warning)]' : 'text-fg')}>
        {value}
      </p>
      {trend && <p className="mt-0.5 text-[11px] text-[var(--color-success)]">{trend} vs. ayer</p>}
    </div>
  )
}
