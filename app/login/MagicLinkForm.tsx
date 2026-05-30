'use client'
import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'

export function MagicLinkForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'verifying' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) return

    setStatus('verifying')
    signIn('credentials', { token, redirect: false }).then((result) => {
      if (result?.ok) {
        router.push('/portal')
      } else {
        setStatus('error')
        setErrorMsg('El link expiró o no es válido. Solicitá uno nuevo.')
      }
    })
  }, [searchParams, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/auth/magic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? `HTTP ${res.status}`)
      }
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Hubo un problema al enviar el email.')
    }
  }

  if (status === 'verifying') {
    return <p className="text-sm text-gray-500">Verificando acceso...</p>
  }

  if (status === 'sent') {
    return (
      <div className="text-center">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm font-medium text-ayala-dark mb-1">Revisá tu email</p>
        <p className="text-xs text-gray-500">
          Si tu dirección está registrada, recibirás un link de acceso en los próximos minutos.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-xs text-gray-400 mt-4 underline"
        >
          Volver
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        required
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ayala-dark/20 focus:border-ayala-dark"
      />
      {status === 'error' && (
        <p className="text-xs text-red-500">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-ayala-dark text-white rounded-lg py-3 text-sm font-medium hover:bg-ayala-dark/90 transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Enviando...' : 'Recibir link de acceso'}
      </button>
    </form>
  )
}
