export const portalContent = {
  'Chesterfield Tower': {
    actas: [
      { titulo: 'Asamblea Ordinaria 2026', fecha: '15/03/2026', tipo: 'Asamblea', archivo: '#' },
      { titulo: 'Reunión CD — Febrero 2026', fecha: '10/02/2026', tipo: 'CD', archivo: '#' },
      { titulo: 'Asamblea Extraordinaria — Obras', fecha: '20/11/2025', tipo: 'Asamblea', archivo: '#' },
      { titulo: 'Asamblea Ordinaria 2025', fecha: '18/03/2025', tipo: 'Asamblea', archivo: '#' },
    ],
    reglamentos: [
      {
        titulo: 'Reglamento de Copropiedad',
        descripcion: 'Documento fundacional del régimen de propiedad horizontal.',
        vigente: true,
        archivo: '#',
      },
      {
        titulo: 'Reglamento de Convivencia',
        descripcion: 'Normas de convivencia y uso de espacios comunes.',
        vigente: true,
        archivo: '#',
      },
      {
        titulo: 'Reglamento de Uso de Amenities',
        descripcion: 'Normas para el uso de piscina, gimnasio y salón de usos múltiples.',
        vigente: true,
        archivo: '#',
      },
    ],
    comunicados: [
      {
        titulo: 'Corte de agua — Mantenimiento de cisternas',
        fecha: '12/05/2026',
        cuerpo: 'Se informa que el día jueves 15 de mayo se realizará el mantenimiento anual de cisternas. El corte de agua será de 9:00 a 14:00 hs aproximadamente. Disculpen las molestias.',
        importante: true,
      },
      {
        titulo: 'Recordatorio: pago de expensas junio',
        fecha: '01/06/2026',
        cuerpo: 'Les recordamos que el vencimiento para el pago de expensas del mes de junio es el 10 de junio. Pasada dicha fecha se aplicará el recargo correspondiente según el reglamento.',
        importante: false,
      },
      {
        titulo: 'Nuevo acceso al portal digital',
        fecha: '20/04/2026',
        cuerpo: 'Ya está disponible el portal digital para propietarios. Pueden consultar actas, reglamentos, estados de cuenta y el saldo de expensas. Para solicitar acceso envíen un email a info@ayalaestudio.com.uy indicando su unidad.',
        importante: false,
      },
    ],
    estadosCuenta: [
      { periodo: 'Enero – Marzo 2026', fecha: '15/04/2026', moneda: 'UYU', archivo: '#' },
      { periodo: 'Octubre – Diciembre 2025', fecha: '15/01/2026', moneda: 'UYU', archivo: '#' },
      { periodo: 'Julio – Septiembre 2025', fecha: '10/10/2025', moneda: 'UYU', archivo: '#' },
      { periodo: 'Abril – Junio 2025', fecha: '10/07/2025', moneda: 'UYU', archivo: '#' },
      { periodo: 'Enero – Marzo 2025', fecha: '12/04/2025', moneda: 'UYU', archivo: '#' },
    ],
    documentos: [
      {
        categoria: 'Seguros',
        items: [
          { titulo: 'Póliza Seguro Incendio — SURA B444886', archivo: '#', info: 'Vence 31/03/2031' },
          { titulo: 'Póliza BSE N° 5120709', archivo: '#', info: 'Vigente' },
        ],
      },
      {
        categoria: 'Datos bancarios',
        items: [
          { titulo: 'Cuentas bancarias del consorcio', archivo: '#', info: 'Banco Santander — Sucursal Centro' },
        ],
      },
      {
        categoria: 'Contratos y habilitaciones',
        items: [
          { titulo: 'Contrato de administración vigente', archivo: '#', info: '' },
          { titulo: 'Habilitación municipal', archivo: '#', info: '' },
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
        ],
      },
    ],
  },
} as const

export type BuildingKey = keyof typeof portalContent

export function getBuildingContent(building: string) {
  return portalContent[building as BuildingKey] ?? null
}

export function getAllBuildingKeys(): BuildingKey[] {
  return Object.keys(portalContent) as BuildingKey[]
}

export function getAccessibleBuildings(role: string, building: string): BuildingKey[] {
  if (role === 'admin') return getAllBuildingKeys()
  const key = building as BuildingKey
  return key in portalContent ? [key] : []
}
