import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { PortalSidebar } from '@/components/portal/PortalSidebar'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="flex min-h-screen bg-ayala-bg-light">
      <PortalSidebar />
      <main className="flex-1 overflow-y-auto p-8 pt-[calc(3.5rem+2rem)] md:pt-8">{children}</main>
    </div>
  )
}
