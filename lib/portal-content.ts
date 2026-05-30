interface Acta { titulo: string; fecha: string; tipo: string; archivo: string }
interface Reglamento { titulo: string; descripcion: string; vigente: boolean; archivo: string }
interface Comunicado { titulo: string; fecha: string; cuerpo: string; importante: boolean }
interface EstadoCuenta { periodo: string; fecha: string; moneda: string; archivo: string }
interface DocumentoItem { titulo: string; archivo: string; info: string }
interface DocumentoCategoria { categoria: string; items: DocumentoItem[] }

interface BuildingContent {
  actas: Acta[]
  reglamentos: Reglamento[]
  comunicados: Comunicado[]
  estadosCuenta: EstadoCuenta[]
  documentos: DocumentoCategoria[]
}

export const portalContent: Record<string, BuildingContent> = {
  'Chesterfield Tower': {
    actas: [
      {
        titulo: 'Convocatoria Asamblea Ordinaria 2024',
        fecha: '15/01/2024',
        tipo: 'Asamblea',
        archivo: 'https://drive.google.com/file/d/1DaquHxftSzWxAC4l0OuwrFZDGJgItBUD/view?usp=sharing',
      },
      {
        titulo: 'Moción Asamblea Extraordinaria — Abril 2023',
        fecha: '22/04/2023',
        tipo: 'Asamblea',
        archivo: 'https://drive.google.com/file/d/1nIVTB8Btkxw6fyaTu2oIu3Jw5C00p6vV/view?usp=sharing',
      },
      {
        titulo: 'Acta Asamblea Ordinaria 2023',
        fecha: '20/01/2023',
        tipo: 'Asamblea',
        archivo: 'https://drive.google.com/file/d/1650rlxdNLNvFB12BnBQ1cNuGw2PfpJLT/view?usp=sharing',
      },
    ],
    reglamentos: [
      {
        titulo: 'Reglamento de Copropiedad',
        descripcion: 'Documento fundacional del régimen de propiedad horizontal. Año 2000.',
        vigente: true,
        archivo: 'https://drive.google.com/file/d/1iPYtXlNcBwG3Y3c9jQzraDBGRv1a292a/view?usp=sharing',
      },
      {
        titulo: 'Modificación Reglamento de Copropiedad',
        descripcion: 'Modificaciones aprobadas en Asamblea Extraordinaria. Marzo 2003.',
        vigente: true,
        archivo: 'https://drive.google.com/file/d/1QVLC55fzlzdM4VaFgmvjcjOAxu4ad_RZ/view?usp=sharing',
      },
      {
        titulo: 'Disposiciones para Espacios Comunes',
        descripcion: 'Normas de uso de piscina, parrilleros y parque. Compartido con Luna de Mar.',
        vigente: true,
        archivo: 'https://drive.google.com/file/d/1sWOpIkQHW96htj3WxBAD1m4LLyNKiG6u/view?usp=sharing',
      },
    ],
    comunicados: [
      {
        titulo: 'Nuevo acceso al portal digital',
        fecha: '30/05/2026',
        cuerpo: 'Ya está disponible el portal digital para propietarios. Pueden consultar actas, reglamentos, estados de cuenta y documentos del edificio. Para cualquier consulta escribí a info@ayalaestudio.com.uy.',
        importante: false,
      },
    ],
    estadosCuenta: [],
    documentos: [
      {
        categoria: 'Póliza de Incendios',
        items: [
          {
            titulo: 'Póliza General 2026 — SURA B444886/6',
            archivo: 'https://drive.google.com/file/d/1WjSJmoeS9j40Vib9Pv-cYBP7iq7L6pk8/view?usp=sharing',
            info: 'Vigente hasta 31/03/2031 · Suma asegurada U$S 10.253.000',
          },
        ],
      },
    ],
  },
  'Luna de Mar': {
    actas: [],
    reglamentos: [],
    comunicados: [],
    estadosCuenta: [],
    documentos: [
      {
        categoria: 'Seguros',
        items: [
          { titulo: 'Póliza Seguro Incendio — SURA B444869/2', archivo: '#', info: 'Vence 31/03/2031' },
          { titulo: 'Póliza BSE N° 5461424', archivo: '#', info: 'Vigente' },
        ],
      },
    ],
  },

  'Cadaqués': {
    actas: [],
    reglamentos: [],
    comunicados: [],
    estadosCuenta: [],
    documentos: [
      {
        categoria: 'Seguros',
        items: [
          { titulo: 'Póliza Seguro Incendio — SURA B408756/4', archivo: '#', info: 'Vence 28/02/2027' },
          { titulo: 'Póliza BSE N° 5192937', archivo: '#', info: 'Vigente' },
        ],
      },
    ],
  },

  'Ocean Drive': {
    actas: [],
    reglamentos: [],
    comunicados: [],
    estadosCuenta: [],
    documentos: [
      {
        categoria: 'Documentos de interés',
        items: [
          {
            titulo: 'Reglamento Interno — Edificio Ocean Drive',
            archivo: '/informes/Reglamento_Interno_OceanDrive.html',
            info: 'Versión vigente: 07/10/2023',
          },
          {
            titulo: 'Informe Gerencial — Abril 2026',
            archivo: '/informes/Informe_OceanDrive_Abril_2026.html',
            info: 'Cierre: Abril 2026',
          },
        ],
      },
    ],
  },
}

export type BuildingKey = keyof typeof portalContent

export function getBuildingContent(building: string): BuildingContent | null {
  return portalContent[building] ?? null
}

export function getAllBuildingKeys(): BuildingKey[] {
  return Object.keys(portalContent) as BuildingKey[]
}

export function getAccessibleBuildings(role: string, building: string): BuildingKey[] {
  if (role === 'admin') return getAllBuildingKeys()
  const key = building as BuildingKey
  return key in portalContent ? [key] : []
}
