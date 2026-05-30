import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { getAccessibleBuildings } from '@/lib/portal-content'
import { getCampaignsByBuilding } from '@/lib/mailchimp-campaigns'
import { Calendar, ExternalLink } from 'lucide-react'

export default async function ComunicadosPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const buildings = getAccessibleBuildings(session.user.role!, session.user.building!)
  const isAdmin = session.user.role === 'admin'

  const campaignsByBuilding = await Promise.all(
    buildings.map(async (building) => ({
      building,
      campaigns: await getCampaignsByBuilding(building),
    }))
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-ayala-dark mb-2">Comunicados</h1>
      <p className="text-gray-500 mb-8">Avisos y comunicaciones de la administración</p>

      <div className="space-y-10">
        {campaignsByBuilding.map(({ building, campaigns }) => (
          <div key={building}>
            {isAdmin && (
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {building}
              </h2>
            )}
            {campaigns.length === 0 ? (
              <p className="text-sm text-gray-400">Sin comunicados registrados.</p>
            ) : (
              <div className="space-y-3">
                {campaigns.map((c) => (
                  <a
                    key={c.id}
                    href={c.archiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white rounded-2xl border border-gray-200 px-6 py-4 hover:border-ayala-light hover:shadow-sm transition-all group"
                  >
                    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 shrink-0 w-24">
                      <Calendar size={12} />
                      {c.fecha}
                    </span>
                    <span className="text-sm font-medium text-ayala-dark truncate flex-1 group-hover:text-ayala-mid transition-colors">
                      {c.titulo}
                    </span>
                    <ExternalLink size={14} className="text-gray-300 group-hover:text-ayala-mid transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
