import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { getBuildingContent, getAccessibleBuildings } from '@/lib/portal-content'
import { Download } from 'lucide-react'

export default async function ReglamentosPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const buildings = getAccessibleBuildings(session.user.role!, session.user.building!)
  const isAdmin = session.user.role === 'admin'

  return (
    <div>
      <h1 className="text-2xl font-bold text-ayala-dark mb-2">Reglamentos</h1>
      <p className="text-gray-500 mb-8">Documentos reglamentarios del complejo</p>

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
              <div className="space-y-4">
                {content.reglamentos.map((r) => (
                  <div
                    key={r.titulo}
                    className="bg-white rounded-2xl border border-gray-200 p-6 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-ayala-dark">{r.titulo}</h3>
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
        })}
      </div>
    </div>
  )
}
