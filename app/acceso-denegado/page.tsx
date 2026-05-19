import Link from 'next/link'

export default function AccesoDenegadoPage() {
  return (
    <div className="min-h-screen bg-ayala-bg-light flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 w-full max-w-sm text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h1 className="text-xl font-bold text-ayala-dark mb-2">Acceso no autorizado</h1>
        <p className="text-sm text-gray-500 mb-6">
          Su cuenta de Google no está registrada en el portal. Para solicitar acceso contáctenos.
        </p>
        <a
          href="mailto:info@ayalaestudio.com.uy?subject=Solicitud de acceso al portal"
          className="block w-full bg-ayala-dark text-white font-medium py-2.5 rounded-lg text-sm hover:bg-ayala-mid transition-colors mb-3"
        >
          Solicitar acceso
        </a>
        <Link href="/" className="text-sm text-ayala-mid hover:underline">
          ← Volver al sitio
        </Link>
      </div>
    </div>
  )
}
