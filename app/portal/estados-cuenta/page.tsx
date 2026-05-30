import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { getBuildingContent, getAccessibleBuildings } from '@/lib/portal-content'
import { Download, Calendar } from 'lucide-react'

export default async function EstadosCuentaPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const buildings = getAccessibleBuildings(session.user.role!, session.user.building!)
  const isAdmin = session.user.role === 'admin'

  return (
    <div>
      <h1 className="text-2xl font-bold text-ayala-dark mb-2">Estados de cuenta</h1>
      <p className="text-gray-500 mb-8">Rendiciones de cuentas del complejo por período</p>

      <div className="space-y-10">
        {buildings.map((building) => {
          const content = getBuildingContent(building)
          if (!content) return null
          return (
            <div key={building}>
              {isAdmin && (
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {building}
                </h2>
              )}
              {content.estadosCuenta.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 px-6 py-10 text-center">
                  <p className="text-sm text-gray-500 mb-1">Los estados de cuenta se publicarán próximamente.</p>
                  <p className="text-xs text-gray-400">Consultás: info@ayalaestudio.com.uy</p>
                </div>
              ) : (
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
                      {content.estadosCuenta.map((e, i) => (
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
                              target="_blank"
                              rel="noopener noreferrer"
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
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
