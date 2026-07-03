import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { securityPoints, securityBadges, securityDisclaimer } from '@/data/content'
import { staggerParent, staggerChild, viewportOnce } from '@/utils/animationVariants'

export function SecuritySection() {
  return (
    <Section id="seguridad" spacing="default">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <SectionHeader
            align="left"
            title={
              <>
                Cada negocio tiene sus <span className="text-gradient">datos separados</span>
              </>
            }
            description="La plataforma está pensada para que múltiples negocios usen el sistema sin mezclar información."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {securityBadges.map((b) => (
              <Badge key={b} tone="accent" icon={ShieldCheck}>
                {b}
              </Badge>
            ))}
          </div>
          <p className="mt-6 max-w-lg text-xs leading-relaxed text-faint">{securityDisclaimer}</p>
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-3 sm:grid-cols-2"
        >
          {securityPoints.map((p) => (
            <motion.div
              key={p.title}
              variants={staggerChild}
              className="group rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-line-strong)]"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)]">
                <p.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-fg">{p.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
