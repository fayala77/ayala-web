import jwt from 'jsonwebtoken'
import { Resend } from 'resend'

const SECRET = process.env.NEXTAUTH_SECRET!

export function generateMagicToken(email: string): string {
  return jwt.sign({ email }, SECRET, { expiresIn: 15 * 60 })
}

export function verifyMagicToken(token: string): { email: string } | null {
  try {
    return jwt.verify(token, SECRET) as { email: string }
  } catch {
    return null
  }
}

export async function sendMagicLink(email: string, url: string): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'Ayala Gerencia & Administración <info@ayalaestudio.com.uy>',
    to: email,
    subject: 'Tu acceso al portal de propietarios',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="color: #1a1a2e; margin-bottom: 8px;">Portal de propietarios</h2>
        <p style="color: #555; margin-bottom: 24px;">
          Hacé click en el botón para ingresar. El link es válido por 15 minutos.
        </p>
        <a href="${url}"
          style="display: inline-block; background: #1a1a2e; color: white; padding: 12px 28px;
                 border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
          Ingresar al portal
        </a>
        <p style="color: #999; font-size: 12px; margin-top: 32px;">
          Si no solicitaste este acceso, ignorá este email.<br/>
          Ayala Gerencia &amp; Administración
        </p>
      </div>
    `,
  })
}
