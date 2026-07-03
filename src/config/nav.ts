export interface NavLink {
  id: string
  label: string
}

/** Anchor targets must match section ids rendered in App.tsx. */
export const navLinks: NavLink[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'funcionalidades', label: 'Funcionalidades' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'planes', label: 'Planes' },
  { id: 'rubros', label: 'Rubros' },
  { id: 'seguridad', label: 'Seguridad' },
  { id: 'contacto', label: 'Contacto' },
]

export const sectionIds = navLinks.map((l) => l.id)
