import { Mail, MessageCircle, MapPin, AtSign, Globe, Share2, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Badge } from '@/components/ui/Badge'
import { navLinks } from '@/config/nav'
import { site } from '@/config/site'
import { useModals } from '@/components/overlay/Overlay'

const featureLinks = ['Punto de venta', 'Caja', 'Stock', 'Clientes', 'Reportes', 'Usuarios']

export function Footer() {
  const { openCreate, openWhatsapp } = useModals()

  function go(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-[var(--color-line)] bg-[var(--color-bg-soft)]">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo showCompany />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Un sistema de ventas, caja, stock, clientes y reportes para que cada comercio tenga su propio espacio dentro de una plataforma moderna.
            </p>
            <div className="mt-5 flex gap-2">
              {[AtSign, Globe, Share2].map((Icon, i) => (
                <button
                  key={i}
                  className="grid size-9 place-items-center rounded-full border border-[var(--color-line)] text-muted transition-colors hover:border-[var(--color-accent-bright)] hover:text-fg"
                  aria-label="Red social"
                >
                  <Icon className="size-4" />
                </button>
              ))}
            </div>
          </div>

          <FooterCol title="Navegación">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => go(l.id)} className="text-left text-muted transition-colors hover:text-fg">
                {l.label}
              </button>
            ))}
          </FooterCol>

          <FooterCol title="Funcionalidades">
            {featureLinks.map((f) => (
              <button key={f} onClick={() => go('funcionalidades')} className="text-left text-muted transition-colors hover:text-fg">
                {f}
              </button>
            ))}
          </FooterCol>

          <FooterCol title="Contacto">
            <a href={`mailto:${site.contactEmail}`} className="flex items-center gap-2 text-muted transition-colors hover:text-fg">
              <Mail className="size-4" /> {site.contactEmail}
            </a>
            <button onClick={openWhatsapp} className="flex items-center gap-2 text-left text-muted transition-colors hover:text-fg">
              <MessageCircle className="size-4" /> {site.whatsapp}
            </button>
            <span className="flex items-center gap-2 text-muted">
              <MapPin className="size-4" /> {site.location}
            </span>
            <button
              onClick={() => openCreate()}
              className="mt-1 inline-flex items-center gap-1.5 text-[var(--color-accent-bright)] transition-colors hover:text-[var(--color-cyan)]"
            >
              Crear mi negocio <ArrowRight className="size-4" />
            </button>
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-line)] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} {site.productName}. Powered by {site.company}. Hecho en {site.location}.
          </p>
          <Badge tone="warning">Modo demo · sin integraciones reales</Badge>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold text-fg">{title}</h4>
      <div className="flex flex-col gap-2.5 text-sm">{children}</div>
    </div>
  )
}
