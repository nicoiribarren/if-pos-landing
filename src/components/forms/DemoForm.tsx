import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, PlayCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { FieldShell, Input, Select, Textarea } from '@/components/ui/Field'
import { industryOptions, userRangeOptions, productRangeOptions } from '@/data/formOptions'
import { useToast } from '@/hooks/useToast'
import { saveLead } from '@/utils/leadStorage'
import { cn } from '@/utils/cn'

const schema = z.object({
  name: z.string().min(2, 'Ingresá tu nombre'),
  email: z.string().email('Ingresá un email válido'),
  phone: z.string().min(6, 'Ingresá un teléfono'),
  industry: z.string().min(1, 'Elegí un rubro'),
  users: z.string().optional(),
  products: z.string().optional(),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

const quickActions = [
  'Quiero ver el POS',
  'Quiero ver caja',
  'Quiero ver stock',
  'Quiero ver reportes',
  'Quiero saber qué plan necesito',
]

export function DemoForm({ preset, onDone }: { preset?: string; onDone?: () => void }) {
  const toast = useToast()
  const [success, setSuccess] = useState(false)
  const [active, setActive] = useState<string | null>(preset ?? null)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (preset) {
      setActive(preset)
      setValue('message', preset)
    }
  }, [preset, setValue])

  function pick(action: string) {
    setActive(action)
    setValue('message', action)
  }

  async function onSubmit(values: FormValues) {
    await new Promise((r) => setTimeout(r, 900))
    saveLead({ type: 'demo', ...values })
    setSuccess(true)
    toast({ variant: 'success', title: 'Demo solicitada', description: 'Coordinamos una recorrida por el sistema.' })
  }

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-6 text-center">
        <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-[var(--color-success)]/15 text-[var(--color-success)]">
          <CheckCircle2 className="size-7" />
        </span>
        <h4 className="text-lg font-bold text-fg">Demo solicitada</h4>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Te vamos a mostrar el sistema funcionando según lo que quieras ver. Gracias por tu interés.
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
      <div>
        <p className="mb-2 text-sm font-medium text-fg">¿Qué te gustaría ver?</p>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => pick(a)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                active === a
                  ? 'border-[var(--color-accent-bright)] bg-[var(--color-accent-soft)] text-fg'
                  : 'border-[var(--color-line)] text-muted hover:text-fg',
              )}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldShell id="demo-name" label="Nombre" required error={errors.name?.message}>
          <Input id="demo-name" placeholder="Tu nombre" invalid={!!errors.name} {...register('name')} />
        </FieldShell>
        <FieldShell id="demo-email" label="Email" required error={errors.email?.message}>
          <Input id="demo-email" type="email" placeholder="tu@email.com" invalid={!!errors.email} {...register('email')} />
        </FieldShell>
        <FieldShell id="demo-phone" label="Teléfono" required error={errors.phone?.message}>
          <Input id="demo-phone" placeholder="+54 9 11 ..." invalid={!!errors.phone} {...register('phone')} />
        </FieldShell>
        <FieldShell id="demo-industry" label="Rubro" required error={errors.industry?.message}>
          <Select id="demo-industry" invalid={!!errors.industry} defaultValue="" {...register('industry')}>
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
        <FieldShell id="demo-users" label="Usuarios estimados">
          <Select id="demo-users" defaultValue="" {...register('users')}>
            <option value="">Sin definir</option>
            {userRangeOptions.map((o) => (
              <option key={o.value} value={o.label}>
                {o.label}
              </option>
            ))}
          </Select>
        </FieldShell>
        <FieldShell id="demo-products" label="Productos estimados">
          <Select id="demo-products" defaultValue="" {...register('products')}>
            <option value="">Sin definir</option>
            {productRangeOptions.map((o) => (
              <option key={o.value} value={o.label}>
                {o.label}
              </option>
            ))}
          </Select>
        </FieldShell>
      </div>

      <FieldShell id="demo-message" label="¿Qué querés ver del sistema?">
        <Textarea id="demo-message" placeholder="Contanos qué parte te interesa" {...register('message')} />
      </FieldShell>

      <Button type="submit" size="lg" loading={isSubmitting} icon={PlayCircle} fullWidth>
        {isSubmitting ? 'Enviando...' : 'Pedir demo'}
      </Button>
      <p className="text-center text-xs text-faint">Modo demo: guardamos tu pedido localmente en este navegador.</p>
    </form>
  )
}
