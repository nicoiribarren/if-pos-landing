import type { LucideIcon } from 'lucide-react'
import {
  CreditCard,
  Landmark,
  MessageCircle,
  Mail,
  KeyRound,
  FileText,
  LineChart,
  ImageIcon,
  Plug,
  Database,
  Printer,
  ScanLine,
} from 'lucide-react'

export type IntegrationStatus = 'preparado' | 'futuro' | 'segun-plan' | 'personalizado'

export interface Integration {
  icon: LucideIcon
  name: string
  description: string
  status: IntegrationStatus
}

export const integrationStatusLabels: Record<IntegrationStatus, string> = {
  preparado: 'Preparado para integrar',
  futuro: 'Integración futura',
  'segun-plan': 'Según plan',
  personalizado: 'Personalizado',
}

export const integrations: Integration[] = [
  { icon: CreditCard, name: 'Mercado Pago', description: 'Cobros con billetera y QR desde el POS.', status: 'preparado' },
  { icon: Landmark, name: 'Stripe', description: 'Pagos con tarjeta para negocios online.', status: 'futuro' },
  { icon: MessageCircle, name: 'WhatsApp', description: 'Comprobantes y avisos por mensaje.', status: 'futuro' },
  { icon: Mail, name: 'Email', description: 'Notificaciones y resúmenes automáticos.', status: 'preparado' },
  { icon: KeyRound, name: 'Google OAuth', description: 'Ingreso rápido y seguro con Google.', status: 'preparado' },
  { icon: FileText, name: 'AFIP', description: 'Facturación electrónica a futuro.', status: 'futuro' },
  { icon: LineChart, name: 'Analytics', description: 'Métricas de uso y comportamiento.', status: 'segun-plan' },
  { icon: ImageIcon, name: 'Cloudinary', description: 'Imágenes de productos optimizadas.', status: 'preparado' },
  { icon: Plug, name: 'APIs externas', description: 'Conexión con otros sistemas del negocio.', status: 'personalizado' },
  { icon: Database, name: 'Bases de datos', description: 'Exportación e integración de datos.', status: 'personalizado' },
  { icon: Printer, name: 'Impresoras térmicas', description: 'Ticket impreso directo desde el POS.', status: 'preparado' },
  { icon: ScanLine, name: 'Lectores de código', description: 'Escaneo de productos en el mostrador.', status: 'preparado' },
]
