import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// Mailchimp verifica el endpoint con un GET antes de activar el webhook
export async function GET() {
  return new NextResponse('OK', { status: 200 })
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const type = formData.get('type')

    if (type === 'campaign') {
      revalidatePath('/portal/comunicados')
    }
  } catch {
    // silencioso — no queremos que Mailchimp reintente por un error nuestro
  }

  return new NextResponse('OK', { status: 200 })
}
