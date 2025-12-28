import { google } from 'googleapis'

interface GoogleSheetsConfig {
  credentials: string
  spreadsheetId: string
  sheetName?: string
}

/**
 * Initialize Google Sheets client
 */
export function getGoogleSheetsClient(credentials: string) {
  const credentialsJson = JSON.parse(credentials)
  const auth = new google.auth.GoogleAuth({
    credentials: credentialsJson,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  return google.sheets({ version: 'v4', auth })
}

/**
 * Write data to Google Sheets
 */
export async function writeToGoogleSheet(
  data: (string | number)[][],
  config: GoogleSheetsConfig
): Promise<void> {
  const sheets = getGoogleSheetsClient(config.credentials)
  const sheetName = config.sheetName || 'Sheet1'

  await sheets.spreadsheets.values.append({
    spreadsheetId: config.spreadsheetId,
    range: `${sheetName}!A:Z`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: data,
    },
  })
}

/**
 * Read data from Google Sheets
 */
export async function readFromGoogleSheet(
  config: GoogleSheetsConfig,
  range?: string
): Promise<(string | number)[][]> {
  const sheets = getGoogleSheetsClient(config.credentials)
  const sheetName = config.sheetName || 'Sheet1'
  const rangeToRead = range || `${sheetName}!A:Z`

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: config.spreadsheetId,
    range: rangeToRead,
  })

  return response.data.values || []
}

/**
 * Get Google Sheets configuration from environment variables
 */
export function getTrackerConfig(): GoogleSheetsConfig {
  const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS
  const spreadsheetId = process.env.GOOGLE_SHEETS_TRACKER_ID || process.env.GOOGLE_SHEETS_ID
  const sheetName = process.env.GOOGLE_SHEETS_TRACKER_TAB || 'Tracker'

  if (!credentials || !spreadsheetId) {
    throw new Error('Google Sheets credentials not configured')
  }

  return {
    credentials,
    spreadsheetId,
    sheetName,
  }
}

