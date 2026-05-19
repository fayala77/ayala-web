import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-ayala-dark text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <span className="font-semibold text-white text-lg">Ayala G&A</span>
            </div>
            <p className="text-ayala-bg text-sm leading-relaxed opacity-80">
              Administración profesional de copropiedades en Uruguay.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2">
              {['Inicio', 'Quiénes somos', 'Noticias', 'Contacto'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace('é', 'e').replace(' ', '-')}`}
                    className="text-ayala-bg text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm text-ayala-bg opacity-80">
              <li>📞 +598 94 665 954</li>
              <li>💬 +598 93 700 520 (WhatsApp)</li>
              <li>✉️ federico@ayalaestudio.com.uy</li>
            </ul>
            <div className="mt-4">
              <Link
                href="/login"
                className="inline-block bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Acceso propietarios →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Ayala Gerencia & Administración · Uruguay
        </div>
      </div>
    </footer>
  )
}
