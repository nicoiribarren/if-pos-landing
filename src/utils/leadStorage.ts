import type { PlanId } from '@/data/plans'

export type LeadType = 'suscripcion' | 'demo' | 'llamada' | 'negocio_demo' | 'contacto'

export interface Lead {
  id: string
  type: LeadType
  createdAt: string
  name?: string
  email?: string
  phone?: string
  businessName?: string
  industry?: string
  plan?: PlanId | ''
  users?: string
  products?: string
  branches?: string
  needs?: string
  contactPreference?: string
  message?: string
}

const KEY = 'ifpos.leads'

/** Read all simulated leads from localStorage. */
export function getLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Lead[]) : []
  } catch {
    return []
  }
}

/** Append a simulated lead. Returns the stored record. */
export function saveLead(input: Omit<Lead, 'id' | 'createdAt'>): Lead {
  const lead: Lead = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  try {
    const all = getLeads()
    all.unshift(lead)
    localStorage.setItem(KEY, JSON.stringify(all.slice(0, 100)))
  } catch {
    /* ignore in demo */
  }
  return lead
}

export function clearLeads() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}
