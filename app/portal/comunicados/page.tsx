import { Calendar } from 'lucide-react'

const comunicados = [
  {
    titulo: 'Corte de agua — Mantenimiento de cisternas',
    fecha: '12/05/2026',
    cuerpo: 'Se informa que el día jueves 15 de mayo se realizará el mantenimiento anual de cisternas. El corte de agua será de 9:00 a 14:00 hs aproximadamente. Disculpen las molestias.',
    importante: true,
  },
  {
    titulo: 'Recordatorio: pago de expensas junio',
    fecha: '01/06/2026',
    cuerpo: 'Les recordamos que el vencimiento para el pago de expensas del mes de junio es el 10 de junio. Pasada dicha fecha se aplicará el recargo correspondiente según el reglamento.',
    importante: false,
  },
  {
    titulo: 'Nuevo acceso al portal digital',
    fecha: '20/04/2026',
    cuerpo: 'Ya está disponible el portal digital para propietarios. Pueden consultar actas, reglamentos, estados de cuenta y el saldo de expensas. Para solicitar acceso envíen un email a info@ayalaestudio.com.uy indicando su unidad.',
    importante: false,
  },
]

export default function ComunicadosPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ayala-dark mb-2">Comunicados</h1>
      <p className="text-gray-500 mb-8">Avisos y comunicaciones de la administración</p>

      <div className="space-y-4">
        {comunicados.map((c) => (
          <div
            key={c.titulo}
            className={`bg-white rounded-2xl border p-6 ${
              c.importante ? 'border-orange-200 bg-orange-50/30' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                {c.importante && (
                  <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                    Importante
                  </span>
                )}
                <h2 className="font-semibold text-ayala-dark">{c.titulo}</h2>
              </div>
              <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                <Calendar size={12} />
                {c.fecha}
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{c.cuerpo}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
