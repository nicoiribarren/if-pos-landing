export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: '¿Qué es este SaaS?',
    a: 'Es un sistema de ventas y gestión para comercios que funciona en la nube. Incluye punto de venta, caja, stock, clientes, reportes y usuarios en una sola plataforma que se usa desde el navegador y se instala como app.',
  },
  {
    q: '¿Qué significa que sea multi-negocio?',
    a: 'Que muchos comercios pueden usar el mismo sistema al mismo tiempo, cada uno con su propio espacio privado. Cada negocio tiene su cuenta, sus productos, sus ventas, su caja, sus clientes y su configuración, sin mezclarse con los demás.',
  },
  {
    q: '¿Mis datos se mezclan con los de otros negocios?',
    a: 'No. La plataforma está diseñada para que cada negocio funcione como un espacio aislado. Los productos, ventas, clientes y usuarios de un negocio no aparecen ni se cruzan con los de otro.',
  },
  {
    q: '¿Puedo crear mi propio negocio dentro del sistema?',
    a: 'Sí. Te registrás, creás tu negocio con nombre y rubro, elegís un plan y empezás a cargar productos. En pocos minutos tenés tu espacio listo para vender.',
  },
  {
    q: '¿Puedo cargar mis productos?',
    a: 'Sí. Cargás productos con precio, costo, categoría y stock. Podés armar tu catálogo a mano o ir sumándolos a medida que los vendés.',
  },
  {
    q: '¿Puedo usarlo en un local físico?',
    a: 'Está pensado para eso. Funciona en la PC del mostrador, en una tablet o en el celular, con un flujo de venta ágil para atender rápido.',
  },
  {
    q: '¿Puedo abrir y cerrar caja?',
    a: 'Sí. Cada turno abre su caja con un monto inicial, registra ingresos y egresos, y cierra con el detalle por método de pago y la diferencia real.',
  },
  {
    q: '¿Puedo controlar stock?',
    a: 'Sí. El stock se actualiza con cada venta y cada compra. Configurás stock mínimo por producto y recibís alertas cuando algo está por agotarse.',
  },
  {
    q: '¿Puedo tener varios usuarios?',
    a: 'Sí, según el plan. Cada usuario tiene su rol y sus permisos, así controlás qué puede hacer cada persona del negocio.',
  },
  {
    q: '¿Puedo usarlo desde celular o tablet?',
    a: 'Sí. El sistema es responsive y se adapta a cualquier pantalla. Además se instala como app en el dispositivo.',
  },
  {
    q: '¿El sistema es PWA instalable?',
    a: 'Sí. Es una PWA: se instala directo desde el navegador, sin pasar por una tienda de aplicaciones, y abre a pantalla completa como cualquier app.',
  },
  {
    q: '¿Puedo cambiar de plan?',
    a: 'Sí. Podés empezar con un plan chico y escalar a medida que tu negocio crece, sumando usuarios, productos y funcionalidades.',
  },
  {
    q: '¿Puedo cancelar la suscripción?',
    a: 'La suscripción es mensual. La idea es que uses el sistema mientras te sirva, con la flexibilidad de ajustar tu plan cuando lo necesites.',
  },
  {
    q: '¿Puedo tener varias sucursales?',
    a: 'La plataforma está preparada para multi-sucursal en los planes superiores, para negocios que operan en más de un local.',
  },
  {
    q: '¿Tiene reportes?',
    a: 'Sí. Reportes de ventas por día y por mes, ticket promedio, productos más vendidos, ingresos por método de pago, ventas por vendedor y cierres de caja.',
  },
  {
    q: '¿Puedo integrar Mercado Pago más adelante?',
    a: 'La arquitectura está preparada para sumar integraciones a futuro. En esta etapa las integraciones se muestran como preparadas, sin conexión real todavía.',
  },
  {
    q: '¿Puedo integrar AFIP más adelante?',
    a: 'Está contemplado como integración futura. Se irá habilitando según el roadmap del producto y el plan contratado.',
  },
  {
    q: '¿Necesito instalar algo?',
    a: 'No hace falta instalar programas. Se usa desde el navegador y, si querés, lo instalás como PWA con un clic para tenerlo a mano.',
  },
  {
    q: '¿Sirve para negocios chicos?',
    a: 'Sí. El plan Starter está pensado justo para empezar a ordenar ventas, caja y productos sin complicarte.',
  },
  {
    q: '¿Sirve para comercios con más volumen?',
    a: 'Sí. Los planes Pro, Business y Enterprise suman usuarios, permisos, proveedores, auditoría y multi-sucursal para operaciones más grandes.',
  },
]
