import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { getAllBuildingKeys } from '@/lib/portal-content'
import SaldoForm from './SaldoForm'

export default async function SaldoPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const isAdmin = session.user.role === 'admin'
  const buildings = isAdmin ? getAllBuildingKeys() : [session.user.building!]

  return (
    <div>
      <h1 className="text-2xl font-bold text-ayala-dark mb-2">Consulta de saldo</h1>
      <p className="text-gray-500 mb-8">
        Ingresá el número de unidad para ver el saldo de expensas.
      </p>

      <SaldoForm
        isAdmin={isAdmin}
        buildings={buildings}
        defaultBuilding={session.user.building ?? ''}
        defaultUnit={isAdmin ? '' : (session.user.unit ?? '')}
      />
    </div>
  )
}
