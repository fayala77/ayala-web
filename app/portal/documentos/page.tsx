import { Download, FileText } from 'lucide-react'

const categorias = [
  {
    nombre: 'Seguros',
    docs: [
      { titulo: 'Póliza Seguro Incendio — SURA B444886', archivo: '#', info: 'Vence 31/03/2031' },
      { titulo: 'Póliza BSE N° 5120709', archivo: '#', info: 'Vigente' },
    ],
  },
  {
    nombre: 'Datos bancarios',
    docs: [
      {
        titulo: 'Cuentas bancarias del consorcio',
        archivo: '#',
        info: 'Banco Santander — Sucursal Centro',
      },
    ],
  },
  {
    nombre: 'Contratos y habilitaciones',
    docs: [
      { titulo: 'Contrato de administración vigente', archivo: '#', info: '' },
      { titulo: 'Habilitación municipal', archivo: '#', info: '' },
    ],
  },
]

export default function DocumentosPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ayala-dark mb-2">Documentos</h1>
      <p className="text-gray-500 mb-8">Seguros, contratos y documentación del complejo</p>

      <div className="space-y-8">
        {categorias.map((cat) => (
          <div key={cat.nombre}>
            <h2 className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-3">
              {cat.nombre}
            </h2>
            <div className="space-y-3">
              {cat.docs.map((doc) => (
                <div
                  key={doc.titulo}
                  className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-ayala-bg rounded-lg p-2 shrink-0">
                      <FileText size={16} className="text-ayala-mid" />
                    </div>
                    <div>
                      <p className="font-medium text-ayala-dark text-sm">{doc.titulo}</p>
                      {doc.info && <p className="text-xs text-gray-400">{doc.info}</p>}
                    </div>
                  </div>
                  <a
                    href={doc.archivo}
                    className="flex items-center gap-1 text-ayala-mid hover:text-ayala-dark text-xs font-medium shrink-0"
                  >
                    <Download size={13} />
                    Descargar
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
