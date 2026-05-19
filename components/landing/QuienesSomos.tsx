import { CheckCircle } from 'lucide-react'

const servicios = [
  'Rendición de cuentas mensual detallada',
  'Gestión de expensas y cobro',
  'Seguimiento de morosidad',
  'Gestión de seguros y coberturas',
  'Asesoramiento a la Comisión Directiva',
  'Representación en asambleas',
  'Portal digital para propietarios',
  'Coordinación de proveedores y obras',
]

const equipo = [
  {
    nombre: 'Lic. Federico Ayala',
    rol: 'Director — Administrador',
    email: 'federico@ayalaestudio.com.uy',
    tel: '+598 94 665 954',
  },
  {
    nombre: 'Rocío Ayala',
    rol: 'Ejecutiva de Cuentas',
    email: 'info@ayalaestudio.com.uy',
    tel: '+598 93 700 520',
  },
]

export function QuienesSomos() {
  return (
    <section id="quienes-somos" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-ayala-mid text-sm font-semibold uppercase tracking-wider">
              Quiénes somos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-ayala-dark mt-2 mb-6">
              Experiencia y dedicación en cada gestión
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Ayala Gerencia & Administración es una empresa especializada en la administración de
              copropiedades bajo el régimen de propiedad horizontal en Uruguay. Ofrecemos una
              gestión integral que combina experiencia profesional con herramientas tecnológicas
              modernas.
            </p>
            <p className="text-gray-600 leading-relaxed mb-10">
              Nuestra filosofía es simple: transparencia total, comunicación fluida con la Comisión
              Directiva y los copropietarios, y rendición de cuentas clara en cada período.
            </p>

            <h3 className="font-semibold text-ayala-dark mb-4">Nuestros servicios</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {servicios.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle size={16} className="text-ayala-mid mt-0.5 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-ayala-dark text-lg">Nuestro equipo</h3>
            {equipo.map((p) => (
              <div
                key={p.nombre}
                className="bg-ayala-bg-light border border-gray-200 rounded-2xl p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-ayala-bg rounded-full flex items-center justify-center shrink-0">
                    <span className="text-ayala-mid font-bold text-lg">
                      {p.nombre.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-ayala-dark">{p.nombre}</p>
                    <p className="text-sm text-gray-500">{p.rol}</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>📧 {p.email}</p>
                  <p>📞 {p.tel}</p>
                </div>
              </div>
            ))}

            <div className="bg-ayala-dark rounded-2xl p-6 text-white">
              <p className="text-ayala-bg text-sm font-semibold uppercase tracking-wider mb-2">
                WhatsApp
              </p>
              <p className="text-2xl font-bold mb-1">+598 93 700 520</p>
              <p className="text-ayala-bg text-sm opacity-80">
                Atención directa a propietarios y CD
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
