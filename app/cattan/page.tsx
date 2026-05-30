import { readSheetRange } from '@/lib/sheets'
import { parseSheetData, computeKPIs } from '@/lib/cattan-data'
import type { CurrencyKPIs, Contrato } from '@/lib/cattan-data'
import { TrendingUp, Home, AlertTriangle, DollarSign, Building2 } from 'lucide-react'

const SHEET_ID = '1a7iDG3xK0kiXre5aOq418IHSONNbDW9mYakOy7FUsRg'
const SHEET_TAB = 'Control de Alquileres'

function fmtUSD(n: number) {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)
}
function fmtUYU(n: number) {
  return new Intl.NumberFormat('es-UY', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)
}

function VaciosGrid({ vacios }: { vacios: Contrato[] }) {
  if (vacios.length === 0) return null
  const byComplejo = vacios.reduce<Record<string, number>>((acc, c) => {
    acc[c.complejo] = (acc[c.complejo] ?? 0) + 1
    return acc
  }, {})
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(byComplejo).map(([complejo, count]) => (
        <span
          key={complejo}
          className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200"
        >
          {complejo} · <span className="font-semibold text-slate-800">{count}</span>
        </span>
      ))}
    </div>
  )
}

function BarChart({
  historico,
  currency,
}: {
  historico: CurrencyKPIs['historico']
  currency: 'USD' | 'UYU'
}) {
  const last12 = historico.slice(-12)
  if (last12.length === 0) return <p className="text-xs text-slate-400">Sin datos históricos</p>
  const max = Math.max(...last12.map((m) => m.total), 1)
  const fmt = currency === 'USD' ? fmtUSD : fmtUYU
  const barColor = currency === 'USD' ? 'bg-sky-500' : 'bg-violet-500'
  const labelColor = currency === 'USD' ? 'text-sky-600' : 'text-violet-600'

  return (
    <div className="flex items-end gap-1.5 h-28">
      {last12.map((m) => {
        const pct = max > 0 ? (m.total / max) * 100 : 0
        return (
          <div key={m.label} className="flex-1 flex flex-col items-center gap-1 group relative">
            {/* Tooltip */}
            <div className="absolute bottom-full mb-1 hidden group-hover:flex flex-col items-center z-10 pointer-events-none">
              <div className="bg-slate-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                {currency === 'USD' ? `U$S ${fmt(m.total)}` : `$ ${fmt(m.total)}`}
              </div>
              <div className="w-1.5 h-1.5 bg-slate-800 rotate-45 -mt-0.5" />
            </div>
            <div
              className={`w-full rounded-t-sm transition-all ${barColor} ${m.total === 0 ? 'opacity-20' : 'opacity-90'}`}
              style={{ height: `${Math.max(pct, m.total > 0 ? 4 : 1)}%` }}
            />
            <span className={`text-[9px] font-medium ${labelColor} rotate-0 truncate w-full text-center leading-none`}>
              {m.label.replace(/[-\s]\d{4}/, '').replace(/[-\s]\d{2}$/, '')}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function DeudoresTable({ deudores, currency }: { deudores: CurrencyKPIs['deudores']; currency: 'USD' | 'UYU' }) {
  if (deudores.length === 0)
    return (
      <p className="text-sm text-slate-400 italic py-2">
        Sin inquilinos con deuda pendiente
      </p>
    )
  const fmt = currency === 'USD' ? fmtUSD : fmtUYU
  const symbol = currency === 'USD' ? 'U$S' : '$'

  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-slate-400 uppercase tracking-wider border-b border-slate-100">
            <th className="pb-2 font-medium pr-4">Complejo</th>
            <th className="pb-2 font-medium pr-4">Local</th>
            <th className="pb-2 font-medium pr-4">Inquilino</th>
            <th className="pb-2 font-medium pr-4 text-right">Meses</th>
            <th className="pb-2 font-medium text-right">Estimado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {deudores
            .sort((a, b) => b.mesesDeuda - a.mesesDeuda)
            .map((d, i) => (
              <tr key={i} className="hover:bg-red-50/50 transition-colors">
                <td className="py-2 pr-4 font-medium text-slate-700 text-xs">{d.contrato.complejo}</td>
                <td className="py-2 pr-4 text-slate-500 text-xs">{d.contrato.local}</td>
                <td className="py-2 pr-4 text-slate-600 text-xs max-w-[180px] truncate">{d.contrato.inquilino}</td>
                <td className="py-2 pr-4 text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                      d.mesesDeuda >= 3
                        ? 'bg-red-100 text-red-700'
                        : d.mesesDeuda === 2
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {d.mesesDeuda} {d.mesesDeuda === 1 ? 'mes' : 'meses'}
                  </span>
                </td>
                <td className="py-2 text-right text-xs text-slate-500 font-mono">
                  {symbol} {fmt(d.contrato.montoMensual * d.mesesDeuda)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string
  value: string | number
  sub?: string
  icon: React.ElementType
  accent: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent}`}>
        <Icon size={16} />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800 leading-none">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-1 font-mono">{sub}</p>}
      </div>
      <p className="text-xs text-slate-500 font-medium">{label}</p>
    </div>
  )
}

function VaciosSection({ vacios }: { vacios: Contrato[] }) {
  if (vacios.length === 0) return null
  const byComplejo = vacios.reduce<Record<string, string[]>>((acc, c) => {
    if (!acc[c.complejo]) acc[c.complejo] = []
    acc[c.complejo].push(c.local)
    return acc
  }, {})
  return (
    <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-400" />
          <h2 className="font-semibold text-slate-600 text-base">Locales sin alquilar</h2>
        </div>
        <span className="text-xs text-slate-400 font-medium">{vacios.length} unidades</span>
      </div>
      <div className="p-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(byComplejo).sort((a, b) => a[0].localeCompare(b[0])).map(([complejo, locales]) => (
            <div key={complejo} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
              <div className="flex items-start gap-2">
                <Building2 size={14} className="text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-700 leading-tight">{complejo}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {locales.length === 1
                      ? `Local ${locales[0]}`
                      : `${locales.length} locales · ${locales.slice(0, 3).join(', ')}${locales.length > 3 ? '…' : ''}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CurrencySection({
  kpis,
  currency,
  now,
}: {
  kpis: CurrencyKPIs
  currency: 'USD' | 'UYU'
  now: Date
}) {
  const isUSD = currency === 'USD'
  const fmt = isUSD ? fmtUSD : fmtUYU
  const symbol = isUSD ? 'U$S' : '$'
  const sectionColor = isUSD ? 'sky' : 'violet'
  const monthName = new Intl.DateTimeFormat('es-UY', { month: 'long', year: 'numeric' }).format(now)

  const totalDeudaEstimada = kpis.deudores.reduce(
    (s, d) => s + d.contrato.montoMensual * d.mesesDeuda,
    0,
  )

  return (
    <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div
        className={`px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-${sectionColor}-50`}
      >
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full bg-${sectionColor}-500`} />
          <h2 className={`font-semibold text-${sectionColor}-700 text-base`}>
            {isUSD ? 'Dólares (USD)' : 'Pesos uruguayos (UYU)'}
          </h2>
        </div>
        <span className={`text-xs text-${sectionColor}-500 font-medium`}>
          {kpis.activos.length} contratos activos
        </span>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <KpiCard
            label="Contratos activos"
            value={kpis.activos.length}
            icon={TrendingUp}
            accent={`bg-${sectionColor}-50 text-${sectionColor}-600`}
          />
          <KpiCard
            label="Con deuda"
            value={kpis.deudores.length}
            sub={kpis.deudores.length > 0 ? `${symbol} ${fmt(totalDeudaEstimada)} estimado` : undefined}
            icon={AlertTriangle}
            accent={kpis.deudores.length > 0 ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-400'}
          />
          <KpiCard
            label={`Cobrado — ${monthName}`}
            value={`${symbol} ${fmt(kpis.cobradoEsteMes)}`}
            icon={DollarSign}
            accent="bg-emerald-50 text-emerald-600"
          />
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Histórico de cobros — últimos 12 meses
          </h3>
          <BarChart historico={kpis.historico} currency={currency} />
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Deudores
          </h3>
          <DeudoresTable deudores={kpis.deudores} currency={currency} />
        </div>
      </div>
    </section>
  )
}

export default async function CattanDashboard() {
  const now = new Date()

  let data
  try {
    const rows = await readSheetRange(SHEET_ID, `'${SHEET_TAB}'!A:BZ`)
    data = parseSheetData(rows)
  } catch (err) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
          <AlertTriangle size={20} className="text-red-500" />
        </div>
        <p className="text-slate-700 font-medium">No se pudo cargar el panel</p>
        <p className="text-xs text-slate-400 max-w-xs">
          Error al leer la planilla de alquileres. Verificá las credenciales de acceso.
        </p>
        <p className="text-xs text-red-400 font-mono mt-1">
          {err instanceof Error ? err.message : 'Error desconocido'}
        </p>
      </div>
    )
  }

  const { usd, uyu, vacios } = computeKPIs(data, now)
  const totalLocales = data.contratos.length
  const totalVacios = vacios.length
  const totalDeudores = usd.deudores.length + uyu.deudores.length

  const updatedAt = new Intl.DateTimeFormat('es-UY', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(data.fetchedAt))

  return (
    <div className="space-y-6">
      {/* Top summary bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Resumen de alquileres</h1>
          <p className="text-xs text-slate-400 mt-0.5">Actualizado: {updatedAt}</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-500">
            <span className="font-semibold text-slate-800">{totalLocales}</span> locales totales
          </span>
          <span className="text-slate-300">·</span>
          {totalVacios > 0 && (
            <>
              <span className="text-slate-500">
                <span className="font-semibold text-slate-600">{totalVacios}</span> vacíos
              </span>
              <span className="text-slate-300">·</span>
            </>
          )}
          {totalDeudores > 0 && (
            <span className="text-red-500 font-medium">
              {totalDeudores} {totalDeudores === 1 ? 'deudor' : 'deudores'}
            </span>
          )}
        </div>
      </div>

      {data.contratos.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800">
          <p className="font-medium">No se encontraron contratos en la planilla.</p>
          <p className="text-xs mt-1 text-amber-600">
            Verificá que la hoja "Control de Alquileres" tenga las columnas: Complejo, Local, Inquilino, Moneda.
          </p>
        </div>
      )}

      <VaciosSection vacios={vacios} />

      {usd.activos.length > 0 && (
        <CurrencySection kpis={usd} currency="USD" now={now} />
      )}
      {uyu.activos.length > 0 && (
        <CurrencySection kpis={uyu} currency="UYU" now={now} />
      )}

      {data.monthCols.length === 0 && data.contratos.length > 0 && (
        <div className="bg-slate-100 rounded-xl p-4 text-xs text-slate-500">
          No se detectaron columnas de meses en la planilla. El histórico y los deudores requieren columnas con formato de mes (ej: "ene-25", "feb-2026").
        </div>
      )}
    </div>
  )
}
