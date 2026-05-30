import { google } from 'googleapis'

function buildAuth() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_SHEETS_CLIENT_ID!,
    process.env.GOOGLE_SHEETS_CLIENT_SECRET!,
  )
  auth.setCredentials({ refresh_token: process.env.GOOGLE_SHEETS_REFRESH_TOKEN! })
  return auth
}

export async function readSheetRange(spreadsheetId: string, range: string): Promise<string[][]> {
  const auth = buildAuth()
  const sheets = google.sheets({ version: 'v4', auth })
  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range })
  return (res.data.values ?? []) as string[][]
}
