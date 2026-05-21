export interface BuildingInfo {
  nombre: string
  direccion: string
  totalUnidades?: number
  whatsapp: string
  administrador: { nombre: string; empresa: string; email: string; telefono: string }
  ejecutiva: { nombre: string; email: string; telefono: string }
  encargado?: { nombre: string; horario: string }
  comisionDirectiva: {
    presidente?: string
    secretario?: string
    tesorero?: string
    vocales?: string[]
  }
  banco: {
    nombre: string
    sucursal?: string
    cuentaPesos?: string
    cuentaUSD?: string
    swift?: string
  }
  seguros: {
    incendio?: { poliza: string; asegurador: string; sumaAsegurada: string; vencimiento: string }
    bse?: { poliza: string }
  }
  abitab?: string
}

export const buildings: Record<string, BuildingInfo> = {
  'Chesterfield Tower': {
    nombre: 'Chesterfield Tower',
    direccion: 'Av. Italia y Orinoco, Punta del Este, Uruguay',
    totalUnidades: 40,
    whatsapp: '+59893700520',
    administrador: {
      nombre: 'Lic. Federico Ayala',
      empresa: 'Ayala Administración y Gerencia',
      email: 'federico@ayalaestudio.com.uy',
      telefono: '+59894665954',
    },
    ejecutiva: {
      nombre: 'Rocío Ayala',
      email: 'info@ayalaestudio.com.uy',
      telefono: '+59893700520',
    },
    encargado: {
      nombre: 'Sr. Alejandro Alvarez',
      horario: '14:00 a 22:00 (miércoles libre)',
    },
    comisionDirectiva: {
      presidente: 'Luis Ipar',
      secretario: 'Sr. Yhonny Ferreira',
      vocales: ['Sra. María Burone', 'Sra. Adriana Podestá', 'Sr. Gerardo Arambillete'],
    },
    banco: {
      nombre: 'Banco Santander S.A.',
      sucursal: 'Centro',
      cuentaPesos: '0079-0009952764',
      cuentaUSD: '0079-0009952764',
      swift: 'SHUYMM',
    },
    seguros: {
      incendio: {
        poliza: 'B444886 / 6',
        asegurador: 'SEGUROS SURA S.A.',
        sumaAsegurada: 'USD 10.253.000',
        vencimiento: '31/03/2031',
      },
      bse: { poliza: '5120709' },
    },
  },

  'Luna de Mar': {
    nombre: 'Luna de Mar',
    direccion: 'Av. Italia y Patagonia, Punta del Este, Uruguay',
    whatsapp: '+59893700520',
    administrador: {
      nombre: 'Lic. Federico Ayala',
      empresa: 'Ayala Administración y Gerencia',
      email: 'federico@ayalaestudio.com.uy',
      telefono: '+59894665954',
    },
    ejecutiva: {
      nombre: 'Rocío Ayala',
      email: 'info@ayalaestudio.com.uy',
      telefono: '+59893700520',
    },
    encargado: {
      nombre: 'Sr. Daniel Calvo',
      horario: '06:00 a 14:00 (martes libre)',
    },
    comisionDirectiva: {
      presidente: 'Gabriel Dambrauskas',
      secretario: 'Sra. Beatriz Martínez',
      tesorero: 'Sra. Loreley Tirone',
      vocales: ['Sr. Eduardo Flores', 'Sra. Carolina Furtado'],
    },
    banco: {
      nombre: 'Banco Santander S.A.',
      cuentaPesos: '0079-0005382645',
      cuentaUSD: '0079-0005382645',
      swift: 'SHUYMM',
    },
    seguros: {
      incendio: {
        poliza: 'B444869 / 2',
        asegurador: 'SEGUROS SURA S.A.',
        sumaAsegurada: 'USD 12.253.000',
        vencimiento: '31/03/2031',
      },
      bse: { poliza: '5461424' },
    },
    abitab: 'Número de unidad + nombre del propietario',
  },

  'Cadaqués': {
    nombre: 'Cadaqués',
    direccion: 'El Mesana y El Corral, Punta del Este',
    whatsapp: '+59893700520',
    administrador: {
      nombre: 'Lic. Federico Ayala',
      empresa: 'Ayala Administración y Gerencia',
      email: 'federico@ayalaestudio.com.uy',
      telefono: '+59894665954',
    },
    ejecutiva: {
      nombre: 'Rocío Ayala',
      email: 'info@ayalaestudio.com.uy',
      telefono: '+59893700520',
    },
    encargado: {
      nombre: 'Sr. José Lavandera',
      horario: '08:00 a 12:00 y 14:00 a 20:00 (lunes libre, martes medio día)',
    },
    comisionDirectiva: {
      presidente: 'Ana María Dorelo',
      secretario: 'Sr. Gonzalo Bastos',
    },
    banco: {
      nombre: 'Banco República',
      cuentaPesos: '110742601-00001',
      cuentaUSD: '110742601-00002',
      swift: 'BROUUYMM',
    },
    seguros: {
      incendio: {
        poliza: 'B408756 / 4',
        asegurador: 'SEGUROS SURA S.A.',
        sumaAsegurada: 'USD 8.251.000',
        vencimiento: '28/02/2027',
      },
      bse: { poliza: '5192937' },
    },
  },

  'Ocean Drive': {
    nombre: 'Ocean Drive',
    direccion: '',
    whatsapp: '',
    administrador: {
      nombre: 'Lic. Federico Ayala',
      empresa: 'Ayala Administración y Gerencia',
      email: 'federico@ayalaestudio.com.uy',
      telefono: '+59894665954',
    },
    ejecutiva: {
      nombre: 'Rocío Ayala',
      email: 'info@ayalaestudio.com.uy',
      telefono: '+59893700520',
    },
    comisionDirectiva: {},
    banco: { nombre: '' },
    seguros: {},
  },
}

export function getBuildingInfo(building: string): BuildingInfo | null {
  return buildings[building] ?? null
}
