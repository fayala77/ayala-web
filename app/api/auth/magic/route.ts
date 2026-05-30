import { NextRequest, NextResponse } from 'next/server'
import { allowedUsers } from '@/lib/users'
import { getMailchimpUser } from '@/lib/mailchimp'
import { generateMagicToken, sendMagicLink } from '@/lib/magic-link'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const email = typeof body?.email === 'string' ? body.email.toLowerCase().trim() : null

  if (!email) {
    return NextResponse.json({ error: 'Email requerido' }, { status: 400 })
  }

  const isAllowed =
    allowedUsers.some((u) => u.email === email) ||
    (await getMailchimpUser(email)) !== null

  if (isAllowed) {
    const origin = new URL(req.url).origin
    const token = generateMagicToken(email)
    const magicUrl = `${origin}/login?token=${token}`
    try {
      await sendMagicLink(email, magicUrl)
    } catch (err) {
      console.error('[magic-link] Error al enviar email:', err)
      return NextResponse.json({ error: 'Error al enviar email' }, { status: 500 })
    }
  } else {
    console.log('[magic-link] Email no registrado:', email)
  }

  return NextResponse.json({ ok: true })
}
