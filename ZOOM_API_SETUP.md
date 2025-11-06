# Zoom API Setup Guide

This guide will help you set up Zoom API to automatically create meetings for each webinar booking.

## Step 1: Create a Zoom Account

1. Go to https://zoom.us
2. Sign up for a free account (or use existing account)
3. Complete email verification

## Step 2: Create a JWT App in Zoom Marketplace

1. Go to **Zoom Marketplace**: https://marketplace.zoom.us/develop/create
2. Sign in with your Zoom account
3. Click **"Create"** button (top right)
4. Select **"JWT"** (Server-to-Server OAuth) - NOT OAuth
5. Click **"Create"**

## Step 3: Fill in App Information

Fill in the required information:

- **App Name**: `Lean Multiverse Webinar`
- **Company Name**: `Lean Multiverse` (or your company name)
- **Developer Email**: Your email address
- **App Description**: `Automated webinar meeting creation for Lean Multiverse`
- **Company Name**: Your company name
- **Developer Contact Information**: Your contact details

Click **"Continue"**

## Step 4: Configure App Settings

1. **App Credentials** tab:
   - You'll see your **API Key** and **API Secret**
   - ⚠️ **COPY THESE IMMEDIATELY** - You'll need them for `.env.local`
   - API Key looks like: `xxxxxxxxxxxxx`
   - API Secret looks like: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

2. **Activate your app**:
   - Toggle the switch to **"Activated"** (if not already activated)
   - This enables your app to create meetings

3. **Scopes** (if asked):
   - Make sure `meeting:write` scope is enabled
   - This allows your app to create meetings

## Step 5: Add Credentials to `.env.local`

Open your `.env.local` file and add:

```env
ZOOM_API_KEY=your_api_key_here
ZOOM_API_SECRET=your_api_secret_here
```

**Example:**
```env
ZOOM_API_KEY=abc123xyz789
ZOOM_API_SECRET=def456uvw012ghi789jkl345mno678pqr
```

## Step 6: Test the Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Test a booking:
   - Go to `/book-webinar`
   - Complete a test booking
   - After payment, check if a Zoom meeting was created

## Important Notes

### Security
- ⚠️ **Never commit `.env.local` to Git** - It's already in `.gitignore`
- ⚠️ **Keep your API Secret secure** - Don't share it publicly
- ⚠️ **Use different credentials for development and production**

### JWT vs OAuth
- We're using **JWT** (Server-to-Server OAuth) - This is simpler and doesn't require user authorization
- **OAuth** requires users to authorize the app, which we don't need for automated meeting creation

### API Limits
- Free Zoom accounts have some API rate limits
- Paid Zoom accounts have higher limits
- For production, consider a paid Zoom account if you expect high volume

### Meeting Settings
The meetings created will have these default settings:
- Host video: ON
- Participant video: ON
- Join before host: OFF
- Mute upon entry: ON
- Waiting room: OFF
- Auto recording: OFF

You can modify these in `src/lib/meet-link.ts` if needed.

## Troubleshooting

### "Invalid API credentials"
- Double-check your API Key and Secret in `.env.local`
- Make sure there are no extra spaces
- Restart your dev server after adding credentials

### "Meeting creation failed"
- Check if your app is activated in Zoom Marketplace
- Verify you have `meeting:write` scope enabled
- Check server logs for detailed error messages

### "JWT token expired"
- The code automatically generates new tokens (valid for 1 hour)
- If you see this error, it might be a time sync issue
- Check your server's system time

## Next Steps

After setting up:
1. ✅ Add credentials to `.env.local`
2. ✅ Restart your dev server
3. ✅ Test a booking
4. ✅ Verify Zoom meeting is created
5. ✅ Check email for meeting link

## Support

- Zoom API Docs: https://marketplace.zoom.us/docs/api-reference/zoom-api
- Zoom Support: https://support.zoom.us

