import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Ayala Gerencia & Administración | Propiedad Horizontal Uruguay',
  description:
    'Administración profesional de copropiedades en Uruguay. Transparencia, tecnología y atención personalizada para su propiedad horizontal.',
  keywords: 'administración propiedad horizontal Uruguay, gestión copropiedades, expensas Uruguay, Punta del Este',
  openGraph: {
    title: 'Ayala Gerencia & Administración',
    description: 'Administración profesional de copropiedades en Uruguay.',
    type: 'website',
    locale: 'es_UY',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900 font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
