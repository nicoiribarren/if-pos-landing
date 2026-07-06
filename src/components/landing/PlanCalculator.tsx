import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, ArrowRight, Check } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { recommendPlan, type CalculatorAnswers } from '@/utils/planRecommendation'
import { plans } from '@/data/plans'
import { industryOptions, userRangeOptions, productRangeOptions } from '@/data/formOptions'
import { useModals } from '@/components/overlay/Overlay'
import { cn } from '@/utils/cn'

const boolQuestions: { key: keyof CalculatorAnswers; label: string }[] = [
  { key: 'physical', label: '¿Tenés local físico?' },
  { key: 'cashControl', label: '¿Necesitás controlar caja?' },
  { key: 'currentAccount', label: '¿Necesitás cuenta corriente?' },
  { key: 'advancedReports', label: '¿Querés reportes avanzados?' },
  { key: 'multiBranch', label: '¿Tenés más de una sucursal?' },
  { key: 'integrations', label: '¿Querés integraciones futuras?' },
  { key: 'priority', label: '¿Querés soporte prioritario?' },
]

const initial: CalculatorAnswers = {
  businessType: industryOptions[0],
  users: 'few',
  products: 'medium',
  physical: true,
  cashControl: true,
  currentAccount: false,
  advancedReports: false,
  multiBranch: false,
  integrations: false,
  priority: false,
}

export function PlanCalculator() {
  const [answers, setAnswers] = useState<CalculatorAnswers>(initial)
  const { openSubscribe, openDemo } = useModals()

  const rec = useMemo(() => recommendPlan(answers), [answers])
  const plan = plans.find((p) => p.id === rec.plan)!

  function set<K extends keyof CalculatorAnswers>(key: K, value: CalculatorAnswers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }))
  }

  return (
    <Section spacing="default">
      <SectionHeader
        title={
          <>
            ¿No sabés qué plan necesita tu <span className="text-gradient">negocio</span>?
          </>
        }
        description="Respondé unas preguntas rápidas y te sugerimos el plan que mejor se adapta. Todo se calcula al instante."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        {/* Questions */}
        <div className="grid gap-5 rounded-[var(--radius-xl)] border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Selector label="Tipo de negocio" value={answers.businessType} options={industryOptions.map((o) => ({ value: o, label: o }))} onChange={(v) => set('businessType', v)} />
            <Selector label="Usuarios" value={answers.users} options={userRangeOptions} onChange={(v) => set('users', v as CalculatorAnswers['users'])} />
            <Selector label="Productos" value={answers.products} options={productRangeOptions} onChange={(v) => set('products', v as CalculatorAnswers['products'])} />
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {boolQuestions.map((q) => (
              <button
                key={q.key}
                onClick={() => set(q.key, !answers[q.key] as never)}
                className={cn(
                  'flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors',
                  answers[q.key]
                    ? 'border-[var(--color-accent-bright)] bg-[var(--color-accent-soft)] text-fg'
                    : 'border-[var(--color-line)] text-muted hover:text-fg',
                )}
              >
                {q.label}
                <span
                  className={cn(
                    'grid size-5 shrink-0 place-items-center rounded-full border transition-colors',
                    answers[q.key] ? 'border-transparent accent-gradient text-[#04121f]' : 'border-[var(--color-line-strong)]',
                  )}
                >
                  {answers[q.key] && <Check className="size-3" strokeWidth={3} />}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div className="lg:sticky lg:top-24">
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-accent-bright)]/40 bg-gradient-to-b from-[var(--color-accent-soft)] to-transparent p-6">
            <Badge tone="accent" icon={Sparkles}>
              Plan recomendado
            </Badge>
            <AnimatePresence mode="wait">
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="mt-4 text-2xl font-bold text-fg">{plan.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{rec.reason}</p>
                <div className="mt-4 grid gap-1.5 text-xs">
                  <Info label={plan.limits.businesses} />
                  <Info label={plan.limits.users} />
                  <Info label={plan.limits.products} />
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-6 grid gap-2">
              <Button fullWidth iconRight={ArrowRight} onClick={() => openSubscribe(plan.id)}>
                Suscribirme a este plan
              </Button>
              <Button fullWidth variant="secondary" onClick={() => openDemo(`Quiero asesoramiento sobre el plan ${plan.name}`)}>
                Pedir asesoramiento
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Selector({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-[var(--radius-sm)] border border-[var(--color-line-strong)] bg-[var(--color-bg-soft)] px-3 text-sm text-fg focus:border-[var(--color-accent-bright)] focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function Info({ label }: { label: string }) {
  return (
    <p className="flex items-center gap-2 text-fg">
      <Check className="size-3.5 shrink-0 text-[var(--color-cyan)]" /> {label}
    </p>
  )
}
