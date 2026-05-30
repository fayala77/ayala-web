const BUILDING_TAGS: Record<string, string[]> = {
  'Chesterfield Tower': ['Chesterfield'],
  'Luna de Mar': ['Luna de Mar'],
  'Ocean Drive': ['Ocean Drive'],
  'Cadaqués': ['Cadaqués', 'Cadaques'],
}

export interface Campaign {
  id: string
  titulo: string
  fecha: string
  archiveUrl: string
}

function extractTags(segmentText: string): string[] {
  const matches = segmentText.matchAll(/Tags contact is tagged <strong>(.*?)<\/strong>/g)
  return Array.from(matches, (m) => m[1])
}

function formatDate(sendTime: string): string {
  const d = new Date(sendTime)
  return d.toLocaleDateString('es-UY', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export async function getCampaignsByBuilding(building: string): Promise<Campaign[]> {
  const apiKey = process.env.MAILCHIMP_API_KEY
  if (!apiKey) return []

  const server = apiKey.split('-')[1]
  const fields = 'campaigns.id,campaigns.settings.subject_line,campaigns.send_time,campaigns.archive_url,campaigns.recipients.segment_text'

  const res = await fetch(
    `https://${server}.api.mailchimp.com/3.0/campaigns?status=sent&count=100&fields=${fields}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      },
      next: { revalidate: 300 }, // cache 5 min como respaldo al webhook
    }
  )

  if (!res.ok) return []

  const data = await res.json()
  const campaigns: Campaign[] = []

  for (const c of data.campaigns ?? []) {
    const tags = extractTags(c.recipients?.segment_text ?? '')
    const expectedTags = BUILDING_TAGS[building] ?? [building]
    if (!tags.some((t) => expectedTags.includes(t))) continue

    campaigns.push({
      id: c.id,
      titulo: c.settings?.subject_line ?? 'Comunicado',
      fecha: formatDate(c.send_time),
      archiveUrl: c.archive_url,
    })
  }

  // más reciente primero
  return campaigns.sort((a, b) => b.fecha.localeCompare(a.fecha))
}
