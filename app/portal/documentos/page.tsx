import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { getBuildingContent, getAccessibleBuildings } from '@/lib/portal-content'
import { Download, FileText } from 'lucide-react'

export default async function DocumentosPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const buildings = getAccessibleBuildings(session.user.role!, session.user.building!)
  const isAdmin = session.user.role === 'admin'

  return (
    <div>
      <h1 className="text-2xl font-bold text-ayala-dark mb-2">Documentos</h1>
      <p className="text-gray-500 mb-8">Seguros, contratos y documentación del complejo</p>

      <div className="space-y-12">
        {buildings.map((building) => {
          const content = getBuildingContent(building)
          if (!content) return null
          return (
            <div key={building}>
              {isAdmin && (
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  {building}
                </h2>
              )}
              <div className="space-y-8">
                {content.documentos.map((cat) => (
                  <div key={cat.categoria}>
                    <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-3">
                      {cat.categoria}
                    </h3>
                    <div className="space-y-3">
                      {cat.items.map((doc) => (
                        <div
                          key={doc.titulo}
                          className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-ayala-bg rounded-lg p-2 shrink-0">
                              <FileText size={16} className="text-ayala-mid" />
                            </div>
                            <div>
                              <p className="font-medium text-ayala-dark text-sm">{doc.titulo}</p>
                              {doc.info && <p className="text-xs text-gray-400">{doc.info}</p>}
                            </div>
                          </div>
                          <a
                            href={doc.archivo}
                            className="flex items-center gap-1 text-ayala-mid hover:text-ayala-dark text-xs font-medium shrink-0"
                          >
                            <Download size={13} />
                            Descargar
                          </a>
                        </div>
                      ))}
                    </div>
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
