import { Download, Calendar } from 'lucide-react'

const estados = [
  { periodo: 'Enero – Marzo 2026', fecha: '15/04/2026', moneda: 'UYU', archivo: '#' },
  { periodo: 'Octubre – Diciembre 2025', fecha: '15/01/2026', moneda: 'UYU', archivo: '#' },
  { periodo: 'Julio – Septiembre 2025', fecha: '10/10/2025', moneda: 'UYU', archivo: '#' },
  { periodo: 'Abril – Junio 2025', fecha: '10/07/2025', moneda: 'UYU', archivo: '#' },
  { periodo: 'Enero – Marzo 2025', fecha: '12/04/2025', moneda: 'UYU', archivo: '#' },
]

export default function EstadosCuentaPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ayala-dark mb-2">Estados de cuenta</h1>
      <p className="text-gray-500 mb-8">Rendiciones de cuentas del complejo por período</p>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ayala-bg-light border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-gray-700">Período</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-700">Moneda</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-700">Publicado</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {estados.map((e, i) => (
              <tr key={e.periodo} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-ayala-dark">
                  {e.periodo}
                  {i === 0 && (
                    <span className="ml-2 bg-ayala-bg text-ayala-mid text-xs px-2 py-0.5 rounded-full">
                      Último
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-500">{e.moneda}</td>
                <td className="px-6 py-4 text-gray-500 flex items-center gap-1">
                  <Calendar size={13} />
                  {e.fecha}
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={e.archivo}
                    className="inline-flex items-center gap-1 text-ayala-mid hover:text-ayala-dark text-xs font-medium"
                  >
                    <Download size={13} />
                    Ver informe
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
