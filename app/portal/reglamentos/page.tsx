import { Download } from 'lucide-react'

const reglamentos = [
  {
    titulo: 'Reglamento de Copropiedad',
    descripcion: 'Documento fundacional del régimen de propiedad horizontal.',
    vigente: true,
    archivo: '#',
  },
  {
    titulo: 'Reglamento de Convivencia',
    descripcion: 'Normas de convivencia y uso de espacios comunes.',
    vigente: true,
    archivo: '#',
  },
  {
    titulo: 'Reglamento de Uso de Amenities',
    descripcion: 'Normas para el uso de piscina, gimnasio y salón de usos múltiples.',
    vigente: true,
    archivo: '#',
  },
]

export default function ReglamentosPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ayala-dark mb-2">Reglamentos</h1>
      <p className="text-gray-500 mb-8">Documentos reglamentarios del complejo</p>

      <div className="space-y-4">
        {reglamentos.map((r) => (
          <div key={r.titulo} className="bg-white rounded-2xl border border-gray-200 p-6 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-semibold text-ayala-dark">{r.titulo}</h2>
                {r.vigente && (
                  <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                    Vigente
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{r.descripcion}</p>
            </div>
            <a
              href={r.archivo}
              className="flex items-center gap-2 bg-ayala-bg text-ayala-mid text-sm font-medium px-4 py-2 rounded-lg hover:bg-ayala-dark hover:text-white transition-colors shrink-0"
            >
              <Download size={14} />
              Descargar
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
