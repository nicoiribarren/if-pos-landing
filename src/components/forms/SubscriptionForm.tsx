import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { FieldShell, Input, Select, Textarea } from '@/components/ui/Field'
import { industryOptions, userRangeOptions, productRangeOptions, contactPreferenceOptions, branchOptions } from '@/data/formOptions'
import { plans, type PlanId } from '@/data/plans'
import { useToast } from '@/hooks/useToast'
import { saveLead } from '@/utils/leadStorage'

const schema = z.object({
  name: z.string().min(2, 'Ingresá tu nombre'),
  email: z.string().email('Ingresá un email válido'),
  phone: z.string().min(6, 'Ingresá un teléfono'),
  businessName: z.string().min(2, 'Ingresá el nombre del negocio'),
  industry: z.string().min(1, 'Elegí un rubro'),
  plan: z.string().min(1, 'Elegí un plan'),
  users: z.string().optional(),
  products: z.string().optional(),
  branches: z.string().optional(),
  needs: z.string().optional(),
  contactPreference: z.string().optional(),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export function SubscriptionForm({ defaultPlan, onDone }: { defaultPlan?: PlanId; onDone?: () => void }) {
  const toast = useToast()
  const [success, setSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { plan: defaultPlan ?? '', contactPreference: 'WhatsApp' },
  })

  const selectedPlan = watch('plan')

  async function onSubmit(values: FormValues) {
    await new Promise((r) => setTimeout(r, 900)) // simulated latency
    saveLead({ type: 'suscripcion', ...values, plan: values.plan as PlanId })
    setSuccess(true)
    toast({ variant: 'success', title: 'Solicitud recibida', description: 'Te contactamos para activar tu negocio.' })
  }

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-6 text-center">
        <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-[var(--color-success)]/15 text-[var(--color-success)]">
          <CheckCircle2 className="size-7" />
        </span>
        <h4 className="text-lg font-bold text-fg">Solicitud recibida</h4>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Te contactaremos para activar tu negocio dentro del sistema. Guardamos tu interés en el plan{' '}
          <span className="font-semibold text-fg">{plans.find((p) => p.id === selectedPlan)?.name ?? 'elegido'}</span>.
        </p>
        {onDone && (
          <Button variant="secondary" className="mt-5" onClick={onDone}>
            Cerrar
          </Button>
        )}
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldShell id="sub-name" label="Nombre" required error={errors.name?.message}>
          <Input id="sub-name" placeholder="Tu nombre" invalid={!!errors.name} {...register('name')} />
        </FieldShell>
        <FieldShell id="sub-email" label="Email" required error={errors.email?.message}>
          <Input id="sub-email" type="email" placeholder="tu@email.com" invalid={!!errors.email} {...register('email')} />
        </FieldShell>
        <FieldShell id="sub-phone" label="Teléfono" required error={errors.phone?.message}>
          <Input id="sub-phone" placeholder="+54 9 11 ..." invalid={!!errors.phone} {...register('phone')} />
        </FieldShell>
        <FieldShell id="sub-business" label="Nombre del negocio" required error={errors.businessName?.message}>
          <Input id="sub-business" placeholder="Ej. Petshop Luna" invalid={!!errors.businessName} {...register('businessName')} />
        </FieldShell>
        <FieldShell id="sub-industry" label="Rubro" required error={errors.industry?.message}>
          <Select id="sub-industry" invalid={!!errors.industry} defaultValue="" {...register('industry')}>
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
        <FieldShell id="sub-plan" label="Plan" required error={errors.plan?.message}>
          <Select id="sub-plan" invalid={!!errors.plan} defaultValue={defaultPlan ?? ''} {...register('plan')}>
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
        <FieldShell id="sub-users" label="Usuarios estimados">
          <Select id="sub-users" defaultValue="" {...register('users')}>
            <option value="">Sin definir</option>
            {userRangeOptions.map((o) => (
              <option key={o.value} value={o.label}>
                {o.label}
              </option>
            ))}
          </Select>
        </FieldShell>
        <FieldShell id="sub-products" label="Productos estimados">
          <Select id="sub-products" defaultValue="" {...register('products')}>
            <option value="">Sin definir</option>
            {productRangeOptions.map((o) => (
              <option key={o.value} value={o.label}>
                {o.label}
              </option>
            ))}
          </Select>
        </FieldShell>
        <FieldShell id="sub-branches" label="Sucursales">
          <Select id="sub-branches" defaultValue="" {...register('branches')}>
            <option value="">Sin definir</option>
            {branchOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
        </FieldShell>
        <FieldShell id="sub-contact" label="Preferencia de contacto">
          <Select id="sub-contact" {...register('contactPreference')}>
            {contactPreferenceOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </Select>
        </FieldShell>
      </div>
      <FieldShell id="sub-needs" label="¿Qué necesitás controlar?" hint="Contanos brevemente qué buscás resolver.">
        <Input id="sub-needs" placeholder="Ventas, caja, stock, clientes..." {...register('needs')} />
      </FieldShell>
      <FieldShell id="sub-message" label="Mensaje" hint="Opcional, pero nos ayuda a preparar tu cuenta.">
        <Textarea id="sub-message" placeholder="Contanos sobre tu negocio" {...register('message')} />
      </FieldShell>

      <Button type="submit" size="lg" loading={isSubmitting} icon={Sparkles} fullWidth>
        {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
      </Button>
      <p className="text-center text-xs text-faint">
        Modo demo: no se realiza ningún cobro. Guardamos tu solicitud localmente en este navegador.
      </p>
    </form>
  )
}
