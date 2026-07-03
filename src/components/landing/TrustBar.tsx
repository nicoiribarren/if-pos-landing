import { Marquee } from '@/components/effects/Marquee'
import { Reveal } from '@/components/ui/Reveal'
import { industriesMarquee } from '@/data/businesses'

export function TrustBar() {
  return (
    <section className="relative border-y border-[var(--color-line)] bg-[var(--color-bg-soft)]/50 py-10">
      <div className="container-page">
        <Reveal className="mb-6 text-center">
          <p className="text-sm font-medium text-muted">Una plataforma preparada para distintos tipos de comercios</p>
        </Reveal>
      </div>
      <Marquee speed={38}>
        {industriesMarquee.map((r) => (
          <span
            key={r}
            className="mx-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-2.5 text-sm font-medium text-fg"
          >
            <span className="size-1.5 rounded-full accent-gradient" />
            {r}
          </span>
        ))}
      </Marquee>
    </section>
  )
}
