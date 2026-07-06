import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Rocket, Check, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { FieldShell, Input, Select } from '@/components/ui/Field'
import { industryOptions } from '@/data/formOptions'
import { plans, type PlanId } from '@/data/plans'
import { useToast } from '@/hooks/useToast'
import { saveLead } from '@/utils/leadStorage'
import { startCheckout } from '@/lib/checkout'

const schema = z.object({
  name: z.string().min(2, 'Ingresá tu nombre'),
  email: z.string().email('Ingresá un email válido'),
  businessName: z.string().min(2, 'Ingresá el nombre del negocio'),
  industry: z.string().min(1, 'Elegí un rubro'),
  plan: z.string().min(1, 'Elegí un plan'),
})

type FormValues = z.infer<typeof schema>

const provisioning = [
  'Preparando tu suscripción',
  'Generando el pago seguro',
  'Redirigiendo a Mercado Pago',
]

export function CreateBusinessForm({ defaultPlan, onDone }: { defaultPlan?: PlanId; onDone?: () => void }) {
  const toast = useToast()
  const [step, setStep] = useState<'form' | 'provisioning' | 'done'>('form')
  const [progress, setProgress] = useState(0)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { plan: defaultPlan ?? '' },
  })

  // Avanza la animación de provisioning en paralelo mientras corre el alta real.
  function animateProvisioning(): () => void {
    let i = 0
    const timer = setInterval(() => {
      i = Math.min(i + 1, provisioning.length - 1)
      setProgress(i)
    }, 650)
    return () => clearInterval(timer)
  }

  // Fallback modo demo (dev sin backend / MP aún no configurado): simula el alta.
  async function runDemo(values: FormValues) {
    setStep('provisioning')
    for (let i = 0; i < provisioning.length; i++) {
      await new Promise((r) => setTimeout(r, 600))
      setProgress(i + 1)
    }
    saveLead({ type: 'negocio_demo', ...values, plan: values.plan as PlanId })
    setStep('done')
    toast({ variant: 'success', title: 'Negocio creado en modo demo', description: `${values.businessName} ya tiene su espacio.` })
  }

  async function onSubmit(values: FormValues) {
    setStep('provisioning')
    const stop = animateProvisioning()
    try {
      // Pide el checkout al backend de la landing. La cuenta se crea recién
      // cuando el pago se confirma (webhook) → email para definir contraseña.
      const res = await startCheckout({
        name: values.name,
        email: values.email,
        businessName: values.businessName,
        industry: values.industry,
        planCode: values.plan,
      })
      stop()
      setProgress(provisioning.length)

      if (res.mode === 'redirect') {
        window.location.href = res.url
        return
      }
      // Backend/MP no disponible → caemos a demo para no romper la landing.
      await runDemo(values)
    } catch (e) {
      stop()
      setStep('form')
      toast({ variant: 'warning', title: 'No pudimos iniciar el pago', description: e instanceof Error ? e.message : 'Reintentá en unos segundos.' })
    }
  }

  if (step === 'provisioning') {
    return (
      <div className="py-4">
        <ul className="space-y-3">
          {provisioning.map((label, i) => {
            const state = i < progress ? 'done' : i === progress ? 'active' : 'pending'
            return (
              <li key={label} className="flex items-center gap-3">
                <span
                  className={
                    state === 'done'
                      ? 'grid size-6 place-items-center rounded-full bg-[var(--color-success)] text-[#04121f]'
                      : state === 'active'
                        ? 'grid size-6 place-items-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)]'
                        : 'grid size-6 place-items-center rounded-full border border-[var(--color-line)] text-faint'
                  }
                >
                  {state === 'done' ? <Check className="size-3.5" /> : state === 'active' ? <Loader2 className="size-3.5 animate-spin" /> : i + 1}
                </span>
                <span className={state === 'pending' ? 'text-sm text-faint' : 'text-sm text-fg'}>{label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  if (step === 'done') {
    const v = getValues()
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-4 text-center">
        <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full accent-gradient text-[#04121f]">
          <Rocket className="size-7" />
        </span>
        <h4 className="text-lg font-bold text-fg">{v.businessName} está listo</h4>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Creamos un espacio privado de demostración para tu negocio con el plan{' '}
          <span className="font-semibold text-fg">{plans.find((p) => p.id === v.plan)?.name}</span>. Sus datos quedan aislados del resto.
        </p>
        {onDone && (
          <Button className="mt-5" onClick={onDone}>
            Entendido
          </Button>
        )}
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldShell id="cb-name" label="Tu nombre" required error={errors.name?.message}>
          <Input id="cb-name" placeholder="Tu nombre" invalid={!!errors.name} {...register('name')} />
        </FieldShell>
        <FieldShell id="cb-email" label="Email" required error={errors.email?.message}>
          <Input id="cb-email" type="email" placeholder="tu@email.com" invalid={!!errors.email} {...register('email')} />
        </FieldShell>
        <FieldShell id="cb-business" label="Nombre del negocio" required error={errors.businessName?.message}>
          <Input id="cb-business" placeholder="Ej. Kiosco Centro" invalid={!!errors.businessName} {...register('businessName')} />
        </FieldShell>
        <FieldShell id="cb-industry" label="Rubro" required error={errors.industry?.message}>
          <Select id="cb-industry" invalid={!!errors.industry} defaultValue="" {...register('industry')}>
            <option value="" disabled>
              Elegí un rubro
            </option>
            {industryOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
        </FieldShell>
      </div>
      <FieldShell id="cb-plan" label="Plan" required error={errors.plan?.message}>
        <Select id="cb-plan" invalid={!!errors.plan} defaultValue={defaultPlan ?? ''} {...register('plan')}>
          <option value="" disabled>
            Elegí un plan
          </option>
          {plans.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </Select>
      </FieldShell>

      <Button type="submit" size="lg" icon={Rocket} fullWidth>
        Continuar al pago
      </Button>
      <p className="text-center text-xs text-faint">
        Te llevamos a Mercado Pago para activar tu suscripción. Cuando el pago se
        confirma, creamos tu negocio y te enviamos un email para definir tu contraseña.
      </p>
    </form>
  )
}
