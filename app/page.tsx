import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { QuienesSomos } from '@/components/landing/QuienesSomos'
import { Noticias } from '@/components/landing/Noticias'
import { Contacto } from '@/components/landing/Contacto'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <QuienesSomos />
        <Noticias />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}
