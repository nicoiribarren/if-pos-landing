import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Check } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { deviceViews } from '@/data/content'
import { cn } from '@/utils/cn'

const perks = [
  'Instalable en un clic',
  'Uso en mostrador',
  'Ideal para caja',
  'Ideal para el vendedor',
  'Acceso rápido',
  'Sin tienda de apps',
]

export function PWASection() {
  const [device, setDevice] = useState(deviceViews[0].id)
  const current = deviceViews.find((d) => d.id === device)!

  return (
    <Section spacing="default" className="bg-[var(--color-bg-soft)]/40">
      <SectionHeader
        title={
          <>
            Usalo desde PC, tablet o celular, <span className="text-gradient">como una app</span>
          </>
        }
        description="Una PWA instalable que abre a pantalla completa y acompaña el flujo real de un local físico."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <div className="inline-flex rounded-full border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-1">
            {deviceViews.map((d) => (
              <button
                key={d.id}
                onClick={() => setDevice(d.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  device === d.id ? 'bg-[var(--color-accent-soft)] text-fg' : 'text-muted hover:text-fg',
                )}
              >
                <d.icon className="size-4" /> {d.label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-6 max-w-md text-base leading-relaxed text-muted"
            >
              {current.detail}
            </motion.p>
          </AnimatePresence>
          <ul className="mt-6 grid grid-cols-2 gap-2.5">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-fg">
                <Check className="size-4 shrink-0 text-[var(--color-cyan)]" /> {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Device frame */}
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.94, rotateY: 8 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'relative rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] bg-[var(--color-surface)] p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]',
                current.id === 'pc' && 'w-full max-w-lg',
                current.id === 'tablet' && 'w-full max-w-sm',
                current.id === 'mobile' && 'w-56',
              )}
            >
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-[11px] font-medium text-faint">{current.label}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-accent-soft)] px-2 py-0.5 text-[10px] text-[var(--color-accent-bright)]">
                  <Download className="size-2.5" /> PWA
                </span>
              </div>
              <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-3">
                <div className="mb-3 flex items-center gap-2">
                  <span className="size-6 rounded-md accent-gradient" />
                  <div className="h-2 w-20 rounded-full bg-[var(--color-line-strong)]" />
                  <span className="ml-auto text-[10px] font-semibold text-[var(--color-cyan)]">{current.screen}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-10 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)]" />
                  ))}
                </div>
                <div className="mt-2 h-8 rounded-md accent-gradient opacity-90" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
