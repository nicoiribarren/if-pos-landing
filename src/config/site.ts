/**
 * Central product configuration.
 * Change PRODUCT_NAME here to rebrand the whole landing (IF POS, IF Commerce,
 * IF Ventas, IF Store, IF Business, IF SaaS ...).
 */
export const site = {
  productName: 'IF POS',
  company: 'IF SOFTWARE',
  tagline: 'SaaS para comercios',
  domain: 'ifpos.app',
  contactEmail: 'hola@ifsoftware.app',
  whatsapp: '+54 9 11 0000 0000',
  location: 'Argentina',
  // Everything on this landing is simulated. No real backend, payments, or messaging.
  demoMode: true,
} as const

export type Site = typeof site
