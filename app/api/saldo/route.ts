import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

interface SaldoEntry {
  saldo: number
  moneda: 'UYU' | 'USD'
  vencimiento: string
  detalle: string
}

// Datos de prueba — reemplazar con integración a Google Sheets o base de datos
const mockData: Record<string, Record<string, SaldoEntry>> = {
  'chesterfield tower': {
    '101': { saldo: 8500, moneda: 'UYU', vencimiento: '10/06/2026', detalle: 'Expensas Junio 2026' },
    '102': { saldo: 0, moneda: 'UYU', vencimiento: '-', detalle: 'Al día' },
    '103': { saldo: 17000, moneda: 'UYU', vencimiento: '10/05/2026', detalle: 'Expensas Mayo + Junio 2026' },
    '201': { saldo: 8500, moneda: 'UYU', vencimiento: '10/06/2026', detalle: 'Expensas Junio 2026' },
    '202': { saldo: 0, moneda: 'UYU', vencimiento: '-', detalle: 'Al día' },
    '301': { saldo: 0, moneda: 'UYU', vencimiento: '-', detalle: 'Al día' },
  },
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const building = (body.building as string)?.toLowerCase().trim()
  const unit = (body.unit as string)?.toLowerCase().trim()

  if (!building || !unit) {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
  }

  const buildingData = mockData[building]
  if (!buildingData) {
    return NextResponse.json({ error: 'Complejo no encontrado' }, { status: 404 })
  }

  const unitData = buildingData[unit]
  if (!unitData) {
    return NextResponse.json({ error: 'Unidad no encontrada' }, { status: 404 })
  }

  return NextResponse.json(unitData)
}
