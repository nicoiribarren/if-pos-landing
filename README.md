# IF POS — Landing SaaS multitenant para comercios

Landing comercial de **IF POS** (by IF SOFTWARE): un sistema SaaS de ventas, caja, stock, clientes y reportes donde cada negocio tiene su propio espacio privado dentro de la plataforma.

> **Modo demo**: no hay backend, pagos ni integraciones reales. Todas las acciones (suscripción, demo, alta de negocio, WhatsApp, llamada) se simulan con modales, toasts y localStorage.

## Correr el proyecto

```bash
npm install
npm run dev        # desarrollo en http://localhost:5173
npm run build      # build de producción en dist/
npm run preview    # servir el build
```

## Configuración rápida

| Qué | Dónde |
|---|---|
| Nombre del producto, empresa, contacto | `src/config/site.ts` |
| Links del navbar / anchors | `src/config/nav.ts` |
| Planes, precios y tabla comparativa | `src/data/plans.ts` |
| Funcionalidades y modales | `src/data/features.ts` |
| Rubros / casos de uso | `src/data/industries.ts` |
| Negocios demo del dashboard | `src/data/businesses.ts` |
| FAQs, testimonios, métricas | `src/data/faqs.ts`, `testimonials.ts`, `metrics.ts` |
| Tokens de diseño (colores, fuentes, radios) | `src/styles/globals.css` (`@theme`) |

## Panel oculto de leads

Los formularios guardan leads simulados en localStorage. Para inspeccionarlos, abrí la landing con:

```
http://localhost:5173/?demo=leads
```

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- framer-motion (animaciones, respeta `prefers-reduced-motion`)
- react-hook-form + zod (formularios validados)
- lucide-react (íconos)
- Fuentes self-hosted: Space Grotesk / DM Sans / JetBrains Mono

## Estructura

```
src/
  config/      # site.ts (branding), nav.ts
  data/        # todo el contenido comercial editable
  components/
    ui/        # Button, Modal, Tabs, Accordion, Field, ...
    effects/   # GlowBackground, Marquee, Counter, ScrollProgress, ...
    mockups/   # mini-apps interactivas (POS, caja, stock, clientes, reportes, dashboard)
    landing/   # las 25 secciones de la página
    layout/    # Navbar, Footer, FloatingActions
    forms/     # SubscriptionForm, DemoForm, CreateBusinessForm
    modals/    # ModalProvider (CTAs globales), LeadsInspector
  hooks/       # useToast, useActiveSection, useLocalStorage, ...
  utils/       # cn, formatCurrency, planRecommendation, leadStorage
```

Para conectar un backend real más adelante: reemplazar `src/utils/leadStorage.ts` por llamadas a tu API; los formularios y modales ya están desacoplados de la persistencia.
