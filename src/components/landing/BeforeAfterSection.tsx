import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { X, Check, MoveHorizontal } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { beforeItems, afterItems } from '@/data/content'

export function BeforeAfterSection() {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  function setFromClient(clientX: number) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const p = ((clientX - r.left) / r.width) * 100
    setPos(Math.min(96, Math.max(4, p)))
  }

  return (
    <Section spacing="default" className="bg-[var(--color-bg-soft)]/40">
      <SectionHeader
        title={
          <>
            De la planilla al <span className="text-gradient">sistema</span>
          </>
        }
        description="Arrastrá el control para comparar cómo trabaja un negocio antes y después de la plataforma."
      />

      <div
        ref={ref}
        className="relative mx-auto mt-14 max-w-4xl select-none overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-line-strong)]"
        onMouseMove={(e) => dragging.current && setFromClient(e.clientX)}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchMove={(e) => setFromClient(e.touches[0].clientX)}
      >
        {/* After (base layer) */}
        <Panel
          tone="after"
          title="Después"
          items={afterItems}
          className="bg-[var(--color-surface)]"
        />

        {/* Before (clipped overlay) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Panel tone="before" title="Antes" items={beforeItems} className="bg-[var(--color-bg)]" />
        </div>

        {/* Handle */}
        <div className="absolute inset-y-0 z-20" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -left-px w-0.5 accent-gradient" />
          <button
            onMouseDown={() => (dragging.current = true)}
            onTouchStart={() => (dragging.current = true)}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid size-10 cursor-ew-resize place-items-center rounded-full accent-gradient text-[#04121f] shadow-lg"
            aria-label="Comparar antes y después"
          >
            <MoveHorizontal className="size-5" />
          </button>
        </div>
      </div>
    </Section>
  )
}

function Panel({
  tone,
  title,
  items,
  className,
}: {
  tone: 'before' | 'after'
  title: string
  items: string[]
  className?: string
}) {
  const isAfter = tone === 'after'
  return (
    <div className={`min-h-[22rem] p-6 sm:p-8 ${className ?? ''}`}>
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
          isAfter
            ? 'border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.1)] text-[var(--color-success)]'
            : 'border-[var(--color-line-strong)] bg-white/[0.03] text-muted'
        }`}
      >
        {title}
      </span>
      <ul className="mt-5 grid gap-2.5">
        {items.map((it, i) => (
          <motion.li
            key={it}
            initial={{ opacity: 0, x: isAfter ? 10 : -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 text-sm"
          >
            <span
              className={`grid size-6 shrink-0 place-items-center rounded-full ${
                isAfter ? 'bg-[var(--color-success)]/15 text-[var(--color-success)]' : 'bg-[var(--color-danger)]/15 text-[var(--color-danger)]'
              }`}
            >
              {isAfter ? <Check className="size-3.5" /> : <X className="size-3.5" />}
            </span>
            <span className={isAfter ? 'text-fg' : 'text-muted'}>{it}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
