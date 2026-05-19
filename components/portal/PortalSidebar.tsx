'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { FileText, BookOpen, Bell, CreditCard, FolderOpen, Calculator, LayoutDashboard, LogOut } from 'lucide-react'
import Image from 'next/image'
import clsx from 'clsx'

const navItems = [
  { href: '/portal', label: 'Inicio', icon: LayoutDashboard, exact: true },
  { href: '/portal/actas', label: 'Actas', icon: FileText },
  { href: '/portal/reglamentos', label: 'Reglamentos', icon: BookOpen },
  { href: '/portal/comunicados', label: 'Comunicados', icon: Bell },
  { href: '/portal/estados-cuenta', label: 'Estados de cuenta', icon: CreditCard },
  { href: '/portal/documentos', label: 'Documentos', icon: FolderOpen },
  { href: '/portal/saldo', label: 'Consulta de saldo', icon: Calculator },
]

export function PortalSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-ayala-dark rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <span className="font-semibold text-ayala-dark text-sm">Ayala G&A</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
          Portal
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    active
                      ? 'bg-ayala-bg text-ayala-mid'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-ayala-dark'
                  )}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-100">
        {session?.user && (
          <div className="flex items-center gap-3 mb-3">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name ?? ''}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{session.user.name}</p>
              <p className="text-xs text-gray-400 truncate">{session.user.building}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors w-full"
        >
          <LogOut size={14} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
