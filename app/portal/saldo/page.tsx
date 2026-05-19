'use client'
import { useState } from 'react'
import { Search, AlertCircle, CheckCircle, Clock } from 'lucide-react'

interface SaldoResult {
  saldo: number
  moneda: 'UYU' | 'USD'
  vencimiento: string
  detalle: string
}

const edificios = ['Chesterfield Tower']

export default function SaldoPage() {
  const [building, setBuilding] = useState('')
  const [unit, setUnit] = useState('')
  const [result, setResult] = useState<SaldoResult | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleConsulta = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/saldo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ building, unit }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Error al consultar')
      } else {
        setResult(data)
      }
    } catch {
      setError('Error de conexión. Intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const formatSaldo = (saldo: number, moneda: 'UYU' | 'USD') => {
    if (moneda === 'UYU') {
      return `$ ${saldo.toLocaleString('es-UY')}`
    }
    return `USD ${saldo.toFixed(2)}`
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ayala-dark mb-2">Consulta de saldo</h1>
      <p className="text-gray-500 mb-8">
        Ingresá el nombre de tu complejo y número de unidad para ver el saldo de expensas.
      </p>

      <div className="max-w-lg">
        <form onSubmit={handleConsulta} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Complejo</label>
            <select
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ayala-light bg-white"
            >
              <option value="">Seleccionar complejo…</option>
              {edificios.map((e) => (
                <option key={e} value={e.toLowerCase()}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de unidad
            </label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
              placeholder="Ej: 101, 202…"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ayala-light"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-ayala-dark text-white font-semibold py-3 rounded-lg hover:bg-ayala-mid transition-colors disabled:opacity-60"
          >
            <Search size={16} />
            {loading ? 'Consultando…' : 'Consultar saldo'}
          </button>
        </form>

        {error && (
          <div className="mt-4 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            <AlertCircle size={16} className="shrink-0" />
            {error}
          </div>
        )}

        {result && (
          <div
            className={`mt-4 rounded-2xl border p-6 ${
              result.saldo === 0
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-ayala-light'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              {result.saldo === 0 ? (
                <CheckCircle size={18} className="text-green-600" />
              ) : (
                <Clock size={18} className="text-ayala-mid" />
              )}
              <p className="font-semibold text-ayala-dark">
                {building.charAt(0).toUpperCase() + building.slice(1)} · Unidad {unit.toUpperCase()}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-sm text-gray-600">Saldo a pagar</span>
                <span
                  className={`text-xl font-bold ${
                    result.saldo === 0 ? 'text-green-600' : 'text-ayala-dark'
                  }`}
                >
                  {formatSaldo(result.saldo, result.moneda)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Vencimiento</span>
                <span className="text-sm font-medium text-gray-900">{result.vencimiento}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Detalle</span>
                <span className="text-sm text-gray-700">{result.detalle}</span>
              </div>
            </div>

            {result.saldo > 0 && (
              <p className="text-xs text-gray-400 mt-4">
                Para realizar el pago utilizá los datos bancarios disponibles en la sección Documentos.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
