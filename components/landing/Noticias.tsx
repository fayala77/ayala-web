import { Calendar } from 'lucide-react'
import noticias from '@/lib/noticias.json'

const tagColors: Record<string, string> = {
  Administrativo: 'bg-blue-50 text-blue-700',
  Seguros: 'bg-green-50 text-green-700',
  Novedades: 'bg-ayala-bg text-ayala-mid',
  Normativa: 'bg-purple-50 text-purple-700',
  Mercado: 'bg-yellow-50 text-yellow-700',
}

export function Noticias() {
  const ultimas = noticias.slice(0, 3)

  return (
    <section id="noticias" className="py-20 bg-ayala-bg-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-ayala-mid text-sm font-semibold uppercase tracking-wider">
            Novedades
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-ayala-dark mt-2">
            Últimas noticias
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {ultimas.map((n) => (
            <article
              key={n.titulo}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${tagColors[n.tag] ?? 'bg-gray-100 text-gray-600'}`}
                >
                  {n.tag}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar size={12} />
                  {n.fecha}
                </span>
              </div>
              <h3 className="font-semibold text-ayala-dark text-base mb-3 leading-snug">
                {n.titulo}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">{n.resumen}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
