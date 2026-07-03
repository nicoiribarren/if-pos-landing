import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GlowBackground } from '@/components/effects/GlowBackground'
import { TenantNetworkMockup } from '@/components/mockups/TenantNetworkMockup'
import { multitenantPoints } from '@/data/content'
import { staggerParent, staggerChild, viewportOnce } from '@/utils/animationVariants'

export function MultitenantSection() {
  return (
    <Section spacing="default" className="overflow-hidden">
      <GlowBackground variant="subtle" />
      <div className="relative">
        <SectionHeader
          title={
            <>
              Un solo sistema, <span className="text-gradient">muchos negocios</span>, datos separados
            </>
          }
          description="La plataforma está preparada para que muchos comercios usen el mismo SaaS al mismo tiempo, pero cada uno con su propio espacio privado."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <TenantNetworkMockup />

          <motion.ul
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-2.5 sm:grid-cols-2"
          >
            {multitenantPoints.map((p) => (
              <motion.li
                key={p}
                variants={staggerChild}
                className="flex items-center gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3"
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)]">
                  <Check className="size-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-sm text-fg">{p}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </Section>
  )
}
