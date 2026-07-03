import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles, Store, TrendingUp, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { GlowBackground } from '@/components/effects/GlowBackground'
import { AnimatedGrid } from '@/components/effects/AnimatedGrid'
import { MouseSpotlight } from '@/components/effects/MouseSpotlight'
import { DashboardMockup } from '@/components/mockups/DashboardMockup'
import { CodeTerminal } from '@/components/mockups/CodeTerminal'
import { useModals } from '@/components/modals/ModalProvider'
import { EASE } from '@/utils/animationVariants'

const headlineLines = [
  [{ t: 'Un sistema de ' }, { t: 'ventas', grad: true }, { t: ' completo ' }],
  [{ t: 'para manejar tu ' }, { t: 'negocio', grad: true }],
]

export function HeroSection() {
  const reduce = useReducedMotion()
  const { openCreate, openDemo } = useModals()

  return (
    <section id="inicio" className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24 pb-16">
      <GlowBackground variant="hero" />
      <AnimatedGrid fade="center" />
      <MouseSpotlight />

      <div className="container-page relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        {/* Copy */}
        <div className="max-w-xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <Badge tone="accent" icon={Sparkles}>
              Plataforma SaaS multi-negocio para comercios
            </Badge>
          </motion.div>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-[3.6rem]">
            {headlineLines.map((line, li) => (
              <span key={li} className="block">
                {line.map((w, wi) => (
                  <motion.span
                    key={wi}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + li * 0.12 + wi * 0.05, ease: EASE }}
                    className={w.grad ? 'text-gradient' : undefined}
                  >
                    {w.t}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            Creá tu negocio dentro de la plataforma y vendé, controlá caja, gestioná stock y mirá reportes desde una PWA
            moderna e instalable.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button size="lg" magnetic iconRight={ArrowRight} onClick={() => openCreate()}>
              Crear mi negocio
            </Button>
            <Button size="lg" variant="secondary" onClick={() => openDemo()}>
              Pedir demo
            </Button>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-faint"
          >
            <span className="inline-flex items-center gap-1.5">
              <Store className="size-3.5 text-[var(--color-accent-bright)]" /> Pensado para el local
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-[var(--color-accent-bright)]" /> Datos aislados por negocio
            </span>
            <span className="inline-flex items-center gap-1.5">
              <TrendingUp className="size-3.5 text-[var(--color-accent-bright)]" /> Reportes en tiempo real
            </span>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className="relative"
        >
          <div className={reduce ? '' : 'animate-float'}>
            <DashboardMockup />
          </div>

          {/* Floating cards */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1, duration: 0.6, ease: EASE }}
            className="absolute -left-4 top-16 hidden sm:block"
          >
            <FloatCard title="Caja abierta" sub="Turno tarde activo" tone="success" />
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 20, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.15, duration: 0.6, ease: EASE }}
            className="absolute -right-3 top-1/3 hidden md:block"
          >
            <FloatCard title="Nuevo negocio registrado" sub="Plan Pro activo" tone="accent" />
          </motion.div>

          <div className="absolute -bottom-8 -left-6 hidden lg:block">
            <CodeTerminal />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FloatCard({ title, sub, tone }: { title: string; sub: string; tone: 'success' | 'accent' }) {
  const color = tone === 'success' ? 'var(--color-success)' : 'var(--color-cyan)'
  return (
    <div className="glass flex items-center gap-2.5 rounded-[var(--radius)] px-3.5 py-2.5 shadow-xl">
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full opacity-60" style={{ background: color }} />
        <span className="relative inline-flex size-2.5 rounded-full" style={{ background: color }} />
      </span>
      <div>
        <p className="text-xs font-semibold text-fg">{title}</p>
        <p className="text-[10px] text-faint">{sub}</p>
      </div>
    </div>
  )
}
