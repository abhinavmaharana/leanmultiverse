# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration to store contact form submissions.

## Prerequisites

- A Google account
- Access to Google Cloud Console
- A Google Sheet where you want to store the data

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

## Step 2: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `leanmultiverse-contact-form`
   - Description: `Service account for contact form submissions`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 3: Generate Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Select "JSON" format
5. Click "Create" - this will download a JSON file

## Step 4: Share Google Sheet with Service Account

1. Open or create a Google Sheet where you want to store the data
2. Click the "Share" button
3. Add the service account email (found in the downloaded JSON file, field: `client_email`)
4. Give it "Editor" permissions
5. Click "Send"

## Step 5: Set Up Sheet Headers

Your Google Sheet should have the following headers in the first row (Sheet1):

| Timestamp | Name | Email | Country Code | Country | Phone Number | Full Phone | Source |
|-----------|------|-------|--------------|---------|--------------|------------|--------|

## Step 6: Configure Environment Variables

1. Open the downloaded JSON file from Step 3
2. Copy the entire contents of the JSON file
3. Add the following environment variables to your `.env.local` file:

```env
GOOGLE_SHEETS_CREDENTIALS='{"type":"service_account","project_id":"your-project-id",...}'
GOOGLE_SHEETS_ID='your-spreadsheet-id'
```

**Important Notes:**
- The `GOOGLE_SHEETS_CREDENTIALS` should be the entire JSON content as a single-line string
- The `GOOGLE_SHEETS_ID` can be found in your Google Sheet URL:
  - Example URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
  - Copy the `SPREADSHEET_ID` part

## Step 7: Test the Integration

1. Start your development server: `npm run dev`
2. Click on any "Talk to Expert", "WhatsApp", or "Phone" button
3. Fill out the contact form
4. Submit the form
5. Check your Google Sheet - you should see a new row with the submitted data

## Troubleshooting

### Error: "Server configuration error"
- Make sure `GOOGLE_SHEETS_CREDENTIALS` and `GOOGLE_SHEETS_ID` are set in your environment variables
- Restart your development server after adding environment variables

### Error: "Permission denied"
- Make sure you've shared the Google Sheet with the service account email
- Verify the service account has "Editor" permissions

### Data not appearing in sheet
- Check the sheet name is "Sheet1" (default) or update the range in `src/app/api/contact/submit/route.ts`
- Verify the API route is working by checking the browser console and server logs

## Security Notes

- Never commit the service account JSON file to version control
- Keep your `.env.local` file in `.gitignore`
- The service account should only have access to the specific Google Sheet it needs

## Production Deployment

When deploying to production (Vercel, etc.):

1. Add the environment variables in your hosting platform's dashboard
2. Make sure `GOOGLE_SHEETS_CREDENTIALS` is set as a single-line JSON string
3. Ensure the Google Sheet is shared with the service account email

