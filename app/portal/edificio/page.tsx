import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { getBuildingInfo, getBuildingNames } from '@/lib/buildings'
import { MapPin, Phone, Mail, User, Building2, CreditCard, Shield, Clock } from 'lucide-react'

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex justify-between items-start gap-4 py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 shrink-0">{label}</span>
      <span className="text-sm text-gray-900 text-right">{value}</span>
    </div>
  )
}

function Card({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={16} className="text-ayala-mid" />
        <h3 className="font-semibold text-ayala-dark text-sm">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default async function EdificioPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const isAdmin = session.user.role === 'admin'
  const buildingNames = isAdmin
    ? getBuildingNames()
    : [session.user.building!]

  return (
    <div>
      <h1 className="text-2xl font-bold text-ayala-dark mb-2">Mi edificio</h1>
      <p className="text-gray-500 mb-8">Información y datos del complejo</p>

      <div className="space-y-12">
        {buildingNames.map((name) => {
          const b = getBuildingInfo(name)
          if (!b) return null

          const cdMembers = [
            b.comisionDirectiva.presidente ? `Presidente: ${b.comisionDirectiva.presidente}` : null,
            b.comisionDirectiva.secretario ? `Secretario: ${b.comisionDirectiva.secretario}` : null,
            b.comisionDirectiva.tesorero ? `Tesorero: ${b.comisionDirectiva.tesorero}` : null,
            ...(b.comisionDirectiva.vocales?.map((v) => `Vocal: ${v}`) ?? []),
          ].filter(Boolean) as string[]

          return (
            <div key={name}>
              {isAdmin && (
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  {name}
                </h2>
              )}

              {/* Header */}
              <div className="bg-ayala-dark rounded-2xl p-6 text-white mb-6">
                <h2 className="text-xl font-bold mb-1">{b.nombre}</h2>
                {b.direccion && (
                  <p className="text-white/70 text-sm flex items-center gap-1.5">
                    <MapPin size={13} />
                    {b.direccion}
                  </p>
                )}
                {b.totalUnidades && (
                  <p className="text-white/60 text-xs mt-2">{b.totalUnidades} unidades</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Administración */}
                <Card title="Administración" icon={User}>
                  <InfoRow label="Administrador" value={b.administrador.nombre} />
                  <InfoRow label="Empresa" value={b.administrador.empresa} />
                  <div className="flex justify-between items-start gap-4 py-2.5 border-b border-gray-100">
                    <span className="text-sm text-gray-500 shrink-0">Email</span>
                    <a href={`mailto:${b.administrador.email}`} className="text-sm text-ayala-mid hover:underline text-right">
                      {b.administrador.email}
                    </a>
                  </div>
                  <div className="flex justify-between items-start gap-4 py-2.5 border-b border-gray-100">
                    <span className="text-sm text-gray-500 shrink-0">Ejecutiva</span>
                    <a href={`mailto:${b.ejecutiva.email}`} className="text-sm text-ayala-mid hover:underline text-right">
                      {b.ejecutiva.nombre}
                    </a>
                  </div>
                  {b.whatsapp && (
                    <div className="flex justify-between items-start gap-4 py-2.5">
                      <span className="text-sm text-gray-500 shrink-0">WhatsApp</span>
                      <a
                        href={`https://wa.me/${b.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-ayala-mid hover:underline text-right"
                      >
                        {b.whatsapp}
                      </a>
                    </div>
                  )}
                </Card>

                {/* Encargado */}
                {b.encargado && (
                  <Card title="Encargado" icon={Clock}>
                    <InfoRow label="Nombre" value={b.encargado.nombre} />
                    <InfoRow label="Horario" value={b.encargado.horario} />
                  </Card>
                )}

                {/* Comisión Directiva */}
                {cdMembers.length > 0 && (
                  <Card title="Comisión Directiva" icon={Building2}>
                    {cdMembers.map((m) => {
                      const [role, ...rest] = m.split(': ')
                      return <InfoRow key={m} label={role} value={rest.join(': ')} />
                    })}
                  </Card>
                )}

                {/* Datos bancarios */}
                {b.banco.nombre && (
                  <Card title="Datos bancarios" icon={CreditCard}>
                    <InfoRow label="Banco" value={b.banco.nombre} />
                    {b.banco.sucursal && <InfoRow label="Sucursal" value={b.banco.sucursal} />}
                    <InfoRow label="Cuenta $ (UYU)" value={b.banco.cuentaPesos} />
                    <InfoRow label="Cuenta USD" value={b.banco.cuentaUSD} />
                    <InfoRow label="SWIFT" value={b.banco.swift} />
                    {b.abitab && <InfoRow label="Abitab — referencia" value={b.abitab} />}
                  </Card>
                )}

                {/* Seguros */}
                {(b.seguros.incendio || b.seguros.bse) && (
                  <Card title="Seguros" icon={Shield}>
                    {b.seguros.incendio && (
                      <>
                        <InfoRow label="Seguro incendio" value={b.seguros.incendio.asegurador} />
                        <InfoRow label="Póliza" value={b.seguros.incendio.poliza} />
                        <InfoRow label="Suma asegurada" value={b.seguros.incendio.sumaAsegurada} />
                        <InfoRow label="Vencimiento" value={b.seguros.incendio.vencimiento} />
                      </>
                    )}
                    {b.seguros.bse && (
                      <InfoRow label="Póliza BSE" value={b.seguros.bse.poliza} />
                    )}
                  </Card>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
