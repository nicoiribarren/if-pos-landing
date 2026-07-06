import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlowBackground } from '@/components/effects/GlowBackground'
import { AnimatedGrid } from '@/components/effects/AnimatedGrid'
import { useModals } from '@/components/overlay/Overlay'
import { EASE } from '@/utils/animationVariants'

const perks = ['Sin instalar nada', 'Planes mensuales', 'Datos separados por negocio', 'Instalable como PWA']

export function FinalCTASection() {
  const { openCreate, openDemo, openWhatsapp } = useModals()

  function goPlans() {
    document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <GlowBackground variant="hero" />
      <AnimatedGrid fade="center" />
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="glass mx-auto max-w-4xl rounded-[var(--radius-xl)] p-10 text-center sm:p-14"
        >
          <h2 className="text-3xl font-bold leading-tight text-fg sm:text-4xl md:text-5xl">
            Tu negocio puede <span className="text-gradient">vender mejor</span> desde hoy
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Creá tu espacio dentro de la plataforma y empezá a ordenar ventas, caja, stock, clientes y reportes con un
            sistema moderno y simple de usar.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" magnetic iconRight={ArrowRight} onClick={() => openCreate()}>
              Crear mi negocio
            </Button>
            <Button size="lg" variant="secondary" icon={PlayCircle} onClick={() => openDemo()}>
              Pedir demo
            </Button>
            <Button size="lg" variant="ghost" onClick={goPlans}>
              Ver planes
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-faint">
            {perks.map((p) => (
              <span key={p} className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full accent-gradient" /> {p}
              </span>
            ))}
          </div>

          <button
            onClick={openWhatsapp}
            className="mx-auto mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-success)] transition-colors hover:text-[var(--color-cyan)]"
          >
            <MessageCircle className="size-4" /> Hablar por WhatsApp
          </button>
        </motion.div>
      </div>
    </section>
  )
}
