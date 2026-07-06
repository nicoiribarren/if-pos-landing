// Estado global de UI compartido entre islands de Astro.
// Reemplaza a los contexts de React (ToastProvider/ModalProvider): cada island
// es un root de React separado, así que un context no los cruza; un store sí.
import { atom } from 'nanostores'
import type { PlanId } from '@/data/plans'

/* ---------------- Toasts ---------------- */

export type ToastVariant = 'success' | 'info' | 'warning'

export interface ToastItem {
  id: string
  title: string
  description?: string
  variant: ToastVariant
}

export const $toasts = atom<ToastItem[]>([])

const timers = new Map<string, number>()

export function toast(t: Omit<ToastItem, 'id'>) {
  const id = crypto.randomUUID()
  $toasts.set([...$toasts.get(), { ...t, id }].slice(-4))
  const handle = window.setTimeout(() => dismissToast(id), 4200)
  timers.set(id, handle)
}

export function dismissToast(id: string) {
  $toasts.set($toasts.get().filter((t) => t.id !== id))
  const handle = timers.get(id)
  if (handle) {
    window.clearTimeout(handle)
    timers.delete(id)
  }
}

/* ---------------- Modales globales ---------------- */

export type ModalKind = 'subscribe' | 'demo' | 'create' | 'whatsapp' | 'call'

export interface ModalState {
  kind: ModalKind
  plan?: PlanId
  preset?: string
}

export const $modal = atom<ModalState | null>(null)

export function closeModal() {
  $modal.set(null)
}

/** Misma API que tenía el context useModals(); ahora son funciones planas. */
export const modals = {
  openSubscribe: (plan?: PlanId) => $modal.set({ kind: 'subscribe', plan }),
  openDemo: (preset?: string) => $modal.set({ kind: 'demo', preset }),
  openCreate: (plan?: PlanId) => $modal.set({ kind: 'create', plan }),
  openWhatsapp: () => $modal.set({ kind: 'whatsapp' }),
  openCall: () => $modal.set({ kind: 'call' }),
}
