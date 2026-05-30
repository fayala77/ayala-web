import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { redirect } from 'next/navigation'
import { MagicLinkForm } from './MagicLinkForm'
import { LoginButton } from './LoginButton'
import { Suspense } from 'react'

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect('/portal')

  return (
    <div className="min-h-screen bg-ayala-bg-light flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 w-full max-w-sm text-center">
        <div className="w-12 h-12 bg-ayala-dark rounded-xl flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-xl font-bold">A</span>
        </div>
        <h1 className="text-xl font-bold text-ayala-dark mb-1">Portal de propietarios</h1>
        <p className="text-sm text-gray-500 mb-8">
          Ayala Gerencia & Administración
        </p>
        <Suspense fallback={<div className="h-20" />}>
          <LoginButton />
        </Suspense>
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">o</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <Suspense fallback={<div className="h-20" />}>
          <MagicLinkForm />
        </Suspense>
        <p className="text-xs text-gray-400 mt-6">
          El acceso está restringido a propietarios y CD registrados.
          <br />
          Consultas: info@ayalaestudio.com.uy
        </p>
      </div>
    </div>
  )
}
