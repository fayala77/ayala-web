import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { getBuildingContent, getAccessibleBuildings } from '@/lib/portal-content'
import { Calendar } from 'lucide-react'

export default async function ComunicadosPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const buildings = getAccessibleBuildings(session.user.role!, session.user.building!)
  const isAdmin = session.user.role === 'admin'

  return (
    <div>
      <h1 className="text-2xl font-bold text-ayala-dark mb-2">Comunicados</h1>
      <p className="text-gray-500 mb-8">Avisos y comunicaciones de la administración</p>

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
                {content.comunicados.map((c) => (
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
                        <h3 className="font-semibold text-ayala-dark">{c.titulo}</h3>
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
        })}
      </div>
    </div>
  )
}
