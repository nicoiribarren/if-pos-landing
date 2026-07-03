export interface Testimonial {
  name: string
  role: string
  business: string
  industry: string
  quote: string
  rating: number
  /** Initials for the avatar chip. */
  initials: string
  accent: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Carla Bianchi',
    role: 'Dueña',
    business: 'Petshop Luna',
    industry: 'Petshop',
    quote:
      'Antes anotábamos las ventas en papel. Ahora tenemos caja, stock y clientes en un solo lugar y sabemos qué reponer.',
    rating: 5,
    initials: 'CB',
    accent: '#22d3ee',
  },
  {
    name: 'Marcos Ferreyra',
    role: 'Encargado',
    business: 'Kiosco Centro',
    industry: 'Kiosco',
    quote:
      'Nos sirvió para ordenar el mostrador y saber qué productos se venden más. El cierre de caja dejó de ser un dolor de cabeza.',
    rating: 5,
    initials: 'MF',
    accent: '#60a5fa',
  },
  {
    name: 'Julieta Sosa',
    role: 'Fundadora',
    business: 'Perfumería Bella',
    industry: 'Cosmética',
    quote:
      'Es simple para vender y completo para administrar. Mis vendedoras aprendieron a usarlo en una tarde.',
    rating: 5,
    initials: 'JS',
    accent: '#8b5cf6',
  },
  {
    name: 'Diego Paredes',
    role: 'Socio',
    business: 'Ferretería Roma',
    industry: 'Ferretería',
    quote:
      'Pudimos sumar usuarios y controlar mejor quién hace cada operación. La trazabilidad nos cambió la forma de trabajar.',
    rating: 5,
    initials: 'DP',
    accent: '#22d3ee',
  },
  {
    name: 'Romina Álvarez',
    role: 'Dueña',
    business: 'Tienda Norte',
    industry: 'Indumentaria',
    quote:
      'Nos gustó que funcione como una app y que sea fácil de usar desde la tablet en pleno mostrador.',
    rating: 5,
    initials: 'RA',
    accent: '#60a5fa',
  },
  {
    name: 'Nahuel Ibáñez',
    role: 'Gerente',
    business: 'Distribuidora Sur',
    industry: 'Distribuidora',
    quote:
      'La cuenta corriente y las compras a proveedores en el mismo sistema nos ahorran horas de planilla por semana.',
    rating: 5,
    initials: 'NI',
    accent: '#8b5cf6',
  },
]
