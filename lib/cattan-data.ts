const MESES = [
  { abbrev: 'ene', full: 'enero', num: 1 },
  { abbrev: 'feb', full: 'febrero', num: 2 },
  { abbrev: 'mar', full: 'marzo', num: 3 },
  { abbrev: 'abr', full: 'abril', num: 4 },
  { abbrev: 'may', full: 'mayo', num: 5 },
  { abbrev: 'jun', full: 'junio', num: 6 },
  { abbrev: 'jul', full: 'julio', num: 7 },
  { abbrev: 'ago', full: 'agosto', num: 8 },
  { abbrev: 'sep', full: 'septiembre', num: 9 },
  { abbrev: 'oct', full: 'octubre', num: 10 },
  { abbrev: 'nov', full: 'noviembre', num: 11 },
  { abbrev: 'dic', full: 'diciembre', num: 12 },
]

export interface MonthCol {
  index: number
  label: string
  month: number
  year: number
  sortKey: number
}

export interface Contrato {
  complejo: string
  local: string
  inquilino: string
  moneda: 'USD' | 'UYU' | string
  montoMensual: number
  vencContrato: string
  pagos: Record<string, number>
}

export interface DashboardData {
  contratos: Contrato[]
  monthCols: MonthCol[]
  fetchedAt: string
}

export interface DeudorEntry {
  contrato: Contrato
  mesesDeuda: number
}

export interface CurrencyKPIs {
  moneda: string
  activos: Contrato[]
  vacios: Contrato[]
  deudores: DeudorEntry[]
  cobradoEsteMes: number
  historico: { label: string; month: number; year: number; total: number }[]
}

function parseMonthHeader(cell: string): Omit<MonthCol, 'index'> | null {
  const s = cell.toLowerCase().trim()
  if (!s) return null
  for (const mes of MESES) {
    if (s.startsWith(mes.abbrev) || s.startsWith(mes.full)) {
      const m = s.match(/(\d{2,4})/)
      if (!m) continue
      let year = parseInt(m[1])
      if (year < 100) year += 2000
      return { label: cell.trim(), month: mes.num, year, sortKey: year * 12 + mes.num }
    }
  }
  const num = s.match(/^(\d{1,2})[-/](\d{2,4})$/)
  if (num) {
    const month = parseInt(num[1])
    let year = parseInt(num[2])
    if (year < 100) year += 2000
    if (month >= 1 && month <= 12) {
      return { label: cell.trim(), month, year, sortKey: year * 12 + month }
    }
  }
  return null
}

function parseAmount(cell: string | undefined): number {
  if (!cell?.trim()) return 0
  const n = parseFloat(cell.trim().replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, ''))
  return isNaN(n) ? 0 : Math.abs(n)
}

function normalizeCurrency(cell: string | undefined): 'USD' | 'UYU' | string {
  const s = (cell ?? '').toLowerCase().trim()
  if (s.includes('dólar') || s.includes('dolar') || s.includes('usd') || s === 'us$' || s === 'u$s') return 'USD'
  if (s.includes('peso') || s === '$u' || s === '$') return 'UYU'
  return (cell ?? '').trim()
}

function findCol(header: string[], keywords: string[]): number {
  for (let i = 0; i < header.length; i++) {
    const c = (header[i] ?? '').toLowerCase().trim()
    if (keywords.some((kw) => c.includes(kw))) return i
  }
  return -1
}

export function parseSheetData(rows: string[][]): DashboardData {
  let bestHeaderIdx = -1
  let monthCols: MonthCol[] = []

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const hasComplejo = row.some((c) => (c ?? '').toLowerCase().includes('complejo'))
    const hasInquilino = row.some((c) => (c ?? '').toLowerCase().includes('inquilino'))
    if (!hasComplejo || !hasInquilino) continue

    const months: MonthCol[] = []
    for (let ci = 0; ci < row.length; ci++) {
      const parsed = parseMonthHeader(row[ci] ?? '')
      if (parsed) months.push({ index: ci, ...parsed })
    }
    if (months.length > 0) {
      bestHeaderIdx = i
      monthCols = months.sort((a, b) => a.sortKey - b.sortKey)
      break
    }
  }

  if (bestHeaderIdx === -1) {
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      if (
        row.some((c) => (c ?? '').toLowerCase().includes('complejo')) &&
        row.some((c) => (c ?? '').toLowerCase().includes('inquilino'))
      ) {
        bestHeaderIdx = i
        break
      }
    }
  }

  if (bestHeaderIdx === -1) return { contratos: [], monthCols: [], fetchedAt: new Date().toISOString() }

  const header = rows[bestHeaderIdx]
  const colComplejo = findCol(header, ['complejo'])
  const colLocal = findCol(header, ['local'])
  const colInquilino = findCol(header, ['inquilino'])
  const colMoneda = findCol(header, ['moneda'])
  const colMonto = (() => {
    for (let i = 0; i < header.length; i++) {
      const c = (header[i] ?? '').toLowerCase().trim()
      if (c.includes('monto') && c.includes('mensual')) return i
    }
    return findCol(header, ['monto'])
  })()
  const colVenc = findCol(header, ['venc'])

  const contratos: Contrato[] = []
  const seen = new Set<string>()

  let start = bestHeaderIdx + 1
  if (rows[start]?.every((c) => !c || c.includes(':-:') || c.trim() === '')) start++

  for (let ri = start; ri < rows.length; ri++) {
    const row = rows[ri]
    if (!row?.length) continue
    const complejo = (row[colComplejo] ?? '').trim()
    if (!complejo || complejo.toLowerCase() === 'complejo') continue

    const local = (row[colLocal] ?? '').trim()
    const inquilino = (row[colInquilino] ?? '').trim()
    const moneda = normalizeCurrency(row[colMoneda])
    const montoMensual = parseAmount(row[colMonto])
    const vencContrato = (row[colVenc] ?? '').trim()

    const key = `${complejo}|${local}`
    if (seen.has(key)) continue
    seen.add(key)

    const pagos: Record<string, number> = {}
    for (const mc of monthCols) {
      const amt = parseAmount(row[mc.index])
      if (amt > 0) pagos[mc.label] = amt
    }

    contratos.push({ complejo, local, inquilino, moneda, montoMensual, vencContrato, pagos })
  }

  return { contratos, monthCols, fetchedAt: new Date().toISOString() }
}

export function computeKPIs(
  data: DashboardData,
  now: Date = new Date(),
): { usd: CurrencyKPIs; uyu: CurrencyKPIs; vacios: Contrato[] } {
  const currentKey = now.getFullYear() * 12 + (now.getMonth() + 1)

  // Global vacíos: all rows where inquilino is empty or "libre", regardless of currency
  const vacios = data.contratos.filter((c) => {
    const inq = (c.inquilino ?? '').toLowerCase().trim()
    return !inq || inq === 'libre'
  })

  function kpisFor(moneda: 'USD' | 'UYU'): CurrencyKPIs {
    const activos = data.contratos.filter((c) => {
      if (c.moneda !== moneda) return false
      const inq = (c.inquilino ?? '').toLowerCase().trim()
      return inq && inq !== 'libre'
    })

    const currentCol = data.monthCols.find((m) => m.sortKey === currentKey)

    const cobradoEsteMes = currentCol
      ? activos.reduce((s, c) => s + (c.pagos[currentCol.label] ?? 0), 0)
      : 0

    const deudores: DeudorEntry[] = activos
      .map((c) => {
        const paidCols = data.monthCols.filter(
          (m) => m.sortKey <= currentKey && c.pagos[m.label] > 0,
        )
        if (paidCols.length === 0) {
          if (data.monthCols.length === 0) return null
          return { contrato: c, mesesDeuda: 2 }
        }
        const lastPaidKey = Math.max(...paidCols.map((m) => m.sortKey))
        const mesesDeuda = currentKey - lastPaidKey
        return mesesDeuda >= 1 ? { contrato: c, mesesDeuda } : null
      })
      .filter(Boolean) as DeudorEntry[]

    const historico = data.monthCols.map((m) => ({
      label: m.label,
      month: m.month,
      year: m.year,
      total: activos.reduce((s, c) => s + (c.pagos[m.label] ?? 0), 0),
    }))

    return { moneda, activos, vacios: [], deudores, cobradoEsteMes, historico }
  }

  return { usd: kpisFor('USD'), uyu: kpisFor('UYU'), vacios }
}
