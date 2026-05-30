import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'

export default async function CattanLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const role = session.user?.role
  if (role !== 'admin' && role !== 'cattan') redirect('/acceso-denegado')

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-ayala-dark border-b border-ayala-dark/80 px-6 py-3.5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-400 rounded-md flex items-center justify-center shrink-0">
            <span className="text-ayala-dark text-xs font-bold tracking-tight">DC</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-none">Inversiones Cattan</p>
            <p className="text-ayala-bg/60 text-xs mt-0.5">Panel de alquileres</p>
          </div>
        </div>
        <p className="text-ayala-bg/40 text-xs hidden sm:block">Ayala Administración &amp; Gerencia</p>
      </header>
      <main className="p-4 sm:p-8 max-w-7xl mx-auto">{children}</main>
    </div>
  )
}
