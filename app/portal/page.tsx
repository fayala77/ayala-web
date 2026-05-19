import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import Link from 'next/link'
import { FileText, BookOpen, Bell, CreditCard, FolderOpen, Calculator } from 'lucide-react'

const sections = [
  { href: '/portal/actas', label: 'Actas', desc: 'Actas de asambleas y reuniones de CD', icon: FileText, color: 'text-blue-600 bg-blue-50' },
  { href: '/portal/reglamentos', label: 'Reglamentos', desc: 'Reglamento de copropiedad y convivencia', icon: BookOpen, color: 'text-green-600 bg-green-50' },
  { href: '/portal/comunicados', label: 'Comunicados', desc: 'Avisos y comunicaciones de administración', icon: Bell, color: 'text-orange-600 bg-orange-50' },
  { href: '/portal/estados-cuenta', label: 'Estados de cuenta', desc: 'Rendiciones de cuentas periódicas', icon: CreditCard, color: 'text-purple-600 bg-purple-50' },
  { href: '/portal/documentos', label: 'Documentos', desc: 'Seguros, contratos y otros documentos', icon: FolderOpen, color: 'text-red-600 bg-red-50' },
  { href: '/portal/saldo', label: 'Consulta de saldo', desc: 'Verificá el saldo de expensas de tu unidad', icon: Calculator, color: 'text-ayala-mid bg-ayala-bg' },
]

export default async function PortalPage() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ayala-dark">
          Bienvenido/a, {session?.user?.name?.split(' ')[0]}
        </h1>
        <p className="text-gray-500 mt-1">
          {session?.user?.building} · {session?.user?.unit}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-ayala-light hover:shadow-sm transition-all group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
              <s.icon size={18} />
            </div>
            <h2 className="font-semibold text-ayala-dark group-hover:text-ayala-mid transition-colors mb-1">
              {s.label}
            </h2>
            <p className="text-sm text-gray-500">{s.desc}</p>
          </Link>
        ))}
      </div>

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
