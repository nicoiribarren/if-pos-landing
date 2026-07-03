import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Star } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { MotionCard } from '@/components/ui/MotionCard'
import { plans, planDisclaimer, ANNUAL_DISCOUNT, type Plan } from '@/data/plans'
import { formatCurrency } from '@/utils/formatCurrency'
import { useModals } from '@/components/modals/ModalProvider'
import { cn } from '@/utils/cn'

export function PricingSection() {
  const [annual, setAnnual] = useState(false)
  const { openSubscribe } = useModals()

  function scrollToComparison() {
    document.getElementById('comparacion')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Section id="planes" spacing="default">
      <SectionHeader
        title={
          <>
            Planes para cada <span className="text-gradient">etapa</span> de tu negocio
          </>
        }
        description="Elegí un plan mensual y empezá a usar el sistema de ventas, caja, stock y reportes desde una plataforma preparada para crecer."
      />

      {/* Toggle */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <span className={cn('text-sm font-medium transition-colors', !annual ? 'text-fg' : 'text-faint')}>Mensual</span>
        <button
          onClick={() => setAnnual((v) => !v)}
          className="relative h-7 w-12 rounded-full border border-[var(--color-line-strong)] bg-[var(--color-bg-soft)] p-0.5"
          role="switch"
          aria-checked={annual}
          aria-label="Cambiar facturación anual"
        >
          <motion.span
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            className={cn('block size-5 rounded-full accent-gradient', annual && 'ml-auto')}
          />
        </button>
        <span className={cn('text-sm font-medium transition-colors', annual ? 'text-fg' : 'text-faint')}>Anual</span>
        <Badge tone="success">2 meses de ahorro</Badge>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-4" style={{ transformStyle: 'preserve-3d' }}>
        {plans.map((p) => (
          <PlanCard key={p.id} plan={p} annual={annual} onChoose={() => openSubscribe(p.id)} />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <Button variant="outline" onClick={scrollToComparison}>
          Comparar planes en detalle
        </Button>
        <p className="mx-auto max-w-2xl text-center text-xs text-faint">{planDisclaimer}</p>
      </div>
    </Section>
  )
}

function PlanCard({ plan, annual, onChoose }: { plan: Plan; annual: boolean; onChoose: () => void }) {
  const featured = plan.featured
  const price =
    plan.monthly === null ? null : annual ? Math.round(plan.monthly * (1 - ANNUAL_DISCOUNT)) : plan.monthly

  return (
    <MotionCard
      tilt={false}
      className={cn(
        'flex h-full flex-col p-6',
        featured && 'border-[var(--color-accent-bright)]/50 bg-gradient-to-b from-[var(--color-accent-soft)] to-transparent shadow-[var(--shadow-glow)]',
      )}
    >
      {featured && (
        <div className="mb-4 flex justify-center">
          <Badge tone="accent" icon={Star}>
            {plan.badge}
          </Badge>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-fg">{plan.name}</h3>
        {!featured && <Badge tone="neutral">{plan.badge}</Badge>}
      </div>

      <div className="mt-4">
        {price === null ? (
          <p className="text-3xl font-bold text-fg">A medida</p>
        ) : (
          <p className="flex items-baseline gap-1">
            <span className="tnum text-3xl font-bold text-fg">{formatCurrency(price)}</span>
            <span className="text-sm text-faint">/mes</span>
          </p>
        )}
        {annual && price !== null && (
          <p className="mt-1 text-xs text-[var(--color-success)]">Facturado anual, precio con descuento</p>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">{plan.description}</p>

      <div className="mt-4 grid gap-1.5 rounded-[var(--radius)] border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-3 text-xs">
        <Limit label={plan.limits.businesses} />
        <Limit label={plan.limits.users} />
        <Limit label={plan.limits.products} />
      </div>

      <ul className="mt-5 flex-1 space-y-2">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-muted">
            <Check className="mt-0.5 size-4 shrink-0 text-[var(--color-cyan)]" /> {f}
          </li>
        ))}
      </ul>

      <Button
        variant={featured ? 'primary' : 'secondary'}
        fullWidth
        className="mt-6"
        iconRight={ArrowRight}
        onClick={onChoose}
      >
        {plan.cta}
      </Button>
    </MotionCard>
  )
}

function Limit({ label }: { label: string }) {
  return (
    <p className="flex items-center gap-2 text-fg">
      <span className="size-1.5 rounded-full accent-gradient" /> {label}
    </p>
  )
}
