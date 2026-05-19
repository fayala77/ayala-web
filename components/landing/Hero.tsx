import Link from 'next/link'
import { Building2, Shield, FileText } from 'lucide-react'

const stats = [
  { icon: Building2, value: '+10', label: 'edificios administrados en Uruguay' },
  { icon: Shield, value: '100%', label: 'transparencia en cada gestión' },
  { icon: FileText, value: '+12 años', label: 'de experiencia profesional' },
]

export function Hero() {
  return (
    <section id="inicio" className="pt-16 bg-gradient-to-b from-ayala-bg-light to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="inline-block bg-ayala-bg text-ayala-mid text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
            Administración de Propiedad Horizontal · Uruguay
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ayala-dark leading-tight mb-6">
            Gestión profesional para su{' '}
            <span className="text-ayala-mid">copropiedad</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
            Combinamos experiencia, transparencia y tecnología para administrar su propiedad
            horizontal con los más altos estándares profesionales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contacto"
              className="bg-ayala-dark text-white font-semibold px-6 py-3 rounded-lg hover:bg-ayala-mid transition-colors text-center"
            >
              Contáctenos
            </a>
            <Link
              href="/login"
              className="border border-ayala-dark text-ayala-dark font-semibold px-6 py-3 rounded-lg hover:bg-ayala-bg-light transition-colors text-center"
            >
              Acceso propietarios →
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm"
            >
              <div className="bg-ayala-bg rounded-xl p-3 shrink-0">
                <stat.icon size={20} className="text-ayala-mid" />
              </div>
              <div>
                <p className="font-bold text-ayala-dark text-lg">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
