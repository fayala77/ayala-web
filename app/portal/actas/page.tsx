import { Download, Calendar } from 'lucide-react'

const actas = [
  { titulo: 'Asamblea Ordinaria 2026', fecha: '15/03/2026', tipo: 'Asamblea', archivo: '#' },
  { titulo: 'Reunión CD — Febrero 2026', fecha: '10/02/2026', tipo: 'CD', archivo: '#' },
  { titulo: 'Asamblea Extraordinaria — Obras', fecha: '20/11/2025', tipo: 'Asamblea', archivo: '#' },
  { titulo: 'Asamblea Ordinaria 2025', fecha: '18/03/2025', tipo: 'Asamblea', archivo: '#' },
]

export default function ActasPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ayala-dark mb-2">Actas</h1>
      <p className="text-gray-500 mb-8">Actas de asambleas y reuniones de Comisión Directiva</p>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ayala-bg-light border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-gray-700">Documento</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-700">Tipo</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-700">Fecha</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {actas.map((a) => (
              <tr key={a.titulo} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-ayala-dark">{a.titulo}</td>
                <td className="px-6 py-4">
                  <span className="bg-ayala-bg text-ayala-mid text-xs font-medium px-2 py-0.5 rounded-full">
                    {a.tipo}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 flex items-center gap-1">
                  <Calendar size={13} />
                  {a.fecha}
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={a.archivo}
                    className="inline-flex items-center gap-1 text-ayala-mid hover:text-ayala-dark text-xs font-medium"
                  >
                    <Download size={13} />
                    Descargar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Para solicitar documentos más antiguos contactá a la administración.
      </p>
    </div>
  )
}
