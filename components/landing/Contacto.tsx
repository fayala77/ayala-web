'use client'
import { useState } from 'react'
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react'

export function Contacto() {
  const [enviado, setEnviado] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailto = `mailto:federico@ayalaestudio.com.uy?subject=Consulta desde el sitio web&body=Nombre: ${form.nombre}%0AEmail: ${form.email}%0ATeléfono: ${form.telefono}%0A%0AMensaje:%0A${form.mensaje}`
    window.location.href = mailto
    setEnviado(true)
  }

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-ayala-mid text-sm font-semibold uppercase tracking-wider">
            Contacto
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-ayala-dark mt-2">
            Hablemos de su copropiedad
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Estamos disponibles para responder sus consultas, evaluar la gestión de su edificio
              o asistir a la Comisión Directiva. Contáctenos por el medio que prefiera.
            </p>

            <div className="space-y-5">
              <a
                href="tel:+59894665954"
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-ayala-light transition-colors group"
              >
                <div className="bg-ayala-bg p-3 rounded-xl shrink-0">
                  <Phone size={18} className="text-ayala-mid" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Teléfono</p>
                  <p className="font-semibold text-ayala-dark group-hover:text-ayala-mid transition-colors">
                    +598 94 665 954
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/59893700520"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-ayala-light transition-colors group"
              >
                <div className="bg-ayala-bg p-3 rounded-xl shrink-0">
                  <MessageCircle size={18} className="text-ayala-mid" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">WhatsApp</p>
                  <p className="font-semibold text-ayala-dark group-hover:text-ayala-mid transition-colors">
                    +598 93 700 520
                  </p>
                </div>
              </a>

              <a
                href="mailto:federico@ayalaestudio.com.uy"
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-ayala-light transition-colors group"
              >
                <div className="bg-ayala-bg p-3 rounded-xl shrink-0">
                  <Mail size={18} className="text-ayala-mid" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Email</p>
                  <p className="font-semibold text-ayala-dark group-hover:text-ayala-mid transition-colors">
                    federico@ayalaestudio.com.uy
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200">
                <div className="bg-ayala-bg p-3 rounded-xl shrink-0">
                  <MapPin size={18} className="text-ayala-mid" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Ubicación</p>
                  <p className="font-semibold text-ayala-dark">Uruguay</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-ayala-bg-light rounded-2xl p-8 border border-gray-200">
            {enviado ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">✉️</div>
                <h3 className="font-semibold text-ayala-dark text-lg mb-2">¡Gracias por contactarnos!</h3>
                <p className="text-gray-600 text-sm">Le responderemos a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-semibold text-ayala-dark text-lg mb-6">Envíenos un mensaje</h3>
                {[
                  { id: 'nombre', label: 'Nombre completo', type: 'text', required: true },
                  { id: 'email', label: 'Email', type: 'email', required: true },
                  { id: 'telefono', label: 'Teléfono (opcional)', type: 'tel', required: false },
                ].map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required={field.required}
                      value={form[field.id as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ayala-light bg-white"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.mensaje}
                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ayala-light bg-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-ayala-dark text-white font-semibold py-3 rounded-lg hover:bg-ayala-mid transition-colors"
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
