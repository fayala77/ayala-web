import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FileText, BookOpen, Bell, CreditCard, FolderOpen, Calculator, Building2, ExternalLink } from 'lucide-react'
import { getBuildingContent } from '@/lib/portal-content'
import { getCampaignsByBuilding } from '@/lib/mailchimp-campaigns'

export default async function PortalPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const building = session.user.building ?? ''
  const unit = session.user.unit ?? ''
  const content = getBuildingContent(building)
  const campaigns = building ? await getCampaignsByBuilding(building) : []

  const latestComunicado = campaigns[0] ?? null
  const latestActa = content?.actas[0] ?? null

  const actasCount = content?.actas.length ?? 0
  const reglamentosCount = content?.reglamentos.length ?? 0
  const comunicadosCount = campaigns.length
  const estadosCount = content?.estadosCuenta.length ?? 0
  const docCount = content?.documentos.reduce((s, cat) => s + cat.items.length, 0) ?? 0

  const sections = [
    {
      href: '/portal/edificio',
      label: 'Mi edificio',
      desc: 'Datos del complejo, CD, banco y seguros',
      icon: Building2,
      color: 'text-ayala-mid bg-ayala-bg',
      count: null,
      last: null,
    },
    {
      href: '/portal/actas',
      label: 'Actas',
      desc: 'Actas de asambleas y reuniones de CD',
      icon: FileText,
      color: 'text-blue-600 bg-blue-50',
      count: actasCount,
      last: content?.actas[0]?.fecha ?? null,
    },
    {
      href: '/portal/reglamentos',
      label: 'Reglamentos',
      desc: 'Reglamento de copropiedad y convivencia',
      icon: BookOpen,
      color: 'text-green-600 bg-green-50',
      count: reglamentosCount,
      last: reglamentosCount > 0 ? 'Vigentes' : null,
    },
    {
      href: '/portal/comunicados',
      label: 'Comunicados',
      desc: 'Avisos y comunicaciones de administración',
      icon: Bell,
      color: 'text-orange-600 bg-orange-50',
      count: comunicadosCount,
      last: campaigns[0]?.fecha ?? null,
    },
    {
      href: '/portal/estados-cuenta',
      label: 'Estados de cuenta',
      desc: 'Rendiciones de cuentas periódicas',
      icon: CreditCard,
      color: 'text-purple-600 bg-purple-50',
      count: estadosCount,
      last: content?.estadosCuenta[0]?.fecha ?? null,
    },
    {
      href: '/portal/documentos',
      label: 'Documentos',
      desc: 'Seguros, contratos y otros documentos',
      icon: FolderOpen,
      color: 'text-red-600 bg-red-50',
      count: docCount,
      last: null,
    },
    {
      href: '/portal/saldo',
      label: 'Consulta de saldo',
      desc: 'Verificá el saldo de expensas de tu unidad',
      icon: Calculator,
      color: 'text-gray-600 bg-gray-50',
      count: null,
      last: null,
    },
  ]

  return (
    <div>
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ayala-dark">
          Bienvenido/a, {session?.user?.name?.split(' ')[0]}
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-500 text-sm">{building}</span>
          {unit && unit !== 'Admin' && (
            <>
              <span className="text-gray-300">·</span>
              <span className="bg-ayala-bg text-ayala-mid text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Unidad {unit}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Novedades */}
      {(latestComunicado || latestActa) && (
        <div className="mb-8 bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-3 border-b border-gray-100 bg-ayala-bg-light">
            <p className="text-xs font-semibold text-ayala-mid uppercase tracking-wider">Últimas novedades</p>
          </div>
          <div className="divide-y divide-gray-50">
            {latestComunicado && (
              <a
                href={latestComunicado.archiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
                    <Bell size={13} className="text-orange-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 mb-0.5">Último comunicado · {latestComunicado.fecha}</p>
                    <p className="text-sm font-medium text-ayala-dark truncate group-hover:text-ayala-mid transition-colors">
                      {latestComunicado.titulo}
                    </p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-gray-300 shrink-0 group-hover:text-ayala-mid transition-colors" />
              </a>
            )}
            {latestActa && (
              <a
                href={latestActa.archivo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                    <FileText size={13} className="text-blue-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 mb-0.5">Última acta · {latestActa.fecha}</p>
                    <p className="text-sm font-medium text-ayala-dark truncate group-hover:text-ayala-mid transition-colors">
                      {latestActa.titulo}
                    </p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-gray-300 shrink-0 group-hover:text-ayala-mid transition-colors" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Secciones */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-ayala-light hover:shadow-sm transition-all group flex flex-col"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
              <s.icon size={18} />
            </div>
            <h2 className="font-semibold text-ayala-dark group-hover:text-ayala-mid transition-colors mb-1">
              {s.label}
            </h2>
            <p className="text-sm text-gray-500 mb-4 flex-1">{s.desc}</p>
            {(s.count !== null || s.last) && (
              <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100">
                {s.count !== null && (
                  <span className="text-xs font-semibold text-ayala-mid">
                    {s.count === 0 ? 'Sin documentos' : `${s.count} ${s.count === 1 ? 'documento' : 'documentos'}`}
                  </span>
                )}
                {s.count !== null && s.last && (
                  <span className="text-gray-300 text-xs">·</span>
                )}
                {s.last && (
                  <span className="text-xs text-gray-400">{s.last}</span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Contacto */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="font-semibold text-ayala-dark mb-1">¿Necesitás ayuda?</h2>
        <p className="text-sm text-gray-500 mb-4">
          Contactá a la administración para cualquier consulta.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href="mailto:info@ayalaestudio.com.uy" className="text-ayala-mid hover:underline">
            ✉️ info@ayalaestudio.com.uy
          </a>
          <a href="https://wa.me/59893700520" target="_blank" rel="noopener noreferrer" className="text-ayala-mid hover:underline">
            💬 +598 93 700 520
          </a>
        </div>
      </div>
    </div>
  )
}
