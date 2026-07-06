import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { navLinks, sectionIds } from '@/config/nav'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useModals } from '@/components/overlay/Overlay'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn } from '@/utils/cn'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const { openCreate, openDemo } = useModals()
  const { scrollY } = useScroll()
  useLockBodyScroll(open)

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function go(id: string) {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[80] transition-all duration-300',
          scrolled ? 'border-b border-[var(--color-line)] bg-[var(--color-bg)]/80 backdrop-blur-xl' : 'bg-transparent',
        )}
      >
        <nav className="container-page flex h-16 items-center justify-between gap-4">
          <a href="#inicio" onClick={(e) => (e.preventDefault(), go('inicio'))} className="shrink-0">
            <Logo showCompany />
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.filter((l) => l.id !== 'inicio').map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={cn(
                  'relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors',
                  active === l.id ? 'text-fg' : 'text-muted hover:text-fg',
                )}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/[0.06]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Badge tone="accent" className="hidden xl:inline-flex">
              SaaS para comercios
            </Badge>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => openDemo()}>
              Pedir demo
            </Button>
            <Button size="sm" className="hidden sm:inline-flex" iconRight={ArrowRight} onClick={() => openCreate()}>
              Crear mi negocio
            </Button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full border border-[var(--color-line-strong)] text-fg lg:hidden"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="size-5" />
                  </motion.span>
                ) : (
                  <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu className="size-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[79] lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-16 mx-3 rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-bg-soft)]/95 p-4 shadow-2xl backdrop-blur-xl"
            >
              <div className="grid gap-1">
                {navLinks.map((l, i) => (
                  <motion.button
                    key={l.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    onClick={() => go(l.id)}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium transition-colors',
                      active === l.id ? 'bg-[var(--color-accent-soft)] text-fg' : 'text-muted hover:bg-white/5 hover:text-fg',
                    )}
                  >
                    {l.label}
                    <ArrowRight className="size-4 opacity-50" />
                  </motion.button>
                ))}
              </div>
              <div className="mt-4 grid gap-2">
                <Button fullWidth onClick={() => (setOpen(false), openCreate())} iconRight={ArrowRight}>
                  Crear mi negocio
                </Button>
                <Button fullWidth variant="secondary" onClick={() => (setOpen(false), openDemo())}>
                  Pedir demo
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
