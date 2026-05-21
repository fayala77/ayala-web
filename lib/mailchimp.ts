export interface MailchimpUser {
  name: string
  building: string
  unit: string
  role: 'propietario'
}

export async function getMailchimpUser(email: string): Promise<MailchimpUser | null> {
  const apiKey = process.env.MAILCHIMP_API_KEY
  if (!apiKey) return null

  const server = apiKey.split('-')[1]

  const res = await fetch(
    `https://${server}.api.mailchimp.com/3.0/search-members?query=${encodeURIComponent(email)}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      },
      cache: 'no-store',
    }
  )

  if (!res.ok) return null

  const data = await res.json()
  const member = data.exact_matches?.members?.[0]
  if (!member) return null

  const building = (member.tags as { id: number; name: string }[])?.find(
    (t) => t.name
  )?.name ?? null

  const unit = member.merge_fields?.UNIDAD ?? null
  const name = [member.merge_fields?.FNAME, member.merge_fields?.LNAME]
    .filter(Boolean)
    .join(' ')

  if (!building || !unit) return null

  return { name, building, unit, role: 'propietario' }
}
