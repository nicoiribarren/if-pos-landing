import { useState } from 'react'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { MessageCircle, PlayCircle } from 'lucide-react'
import { useModals } from '@/components/modals/ModalProvider'

/** Floating WhatsApp + demo buttons that appear after the hero. */
export function FloatingActions() {
  const [show, setShow] = useState(false)
  const { openWhatsapp, openDemo } = useModals()
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 700))

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-2.5"
        >
          <button
            onClick={() => openDemo()}
            className="glass hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-fg shadow-lg transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            <PlayCircle className="size-4 text-[var(--color-cyan)]" /> Pedir demo
          </button>
          <button
            onClick={openWhatsapp}
            aria-label="Contacto por WhatsApp"
            className="grid size-13 place-items-center rounded-full bg-[var(--color-success)] text-[#04121f] shadow-[0_10px_30px_-8px_rgba(52,211,153,0.6)] transition-transform hover:-translate-y-0.5 active:scale-95"
          >
            <MessageCircle className="size-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
