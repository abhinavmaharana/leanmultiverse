# Environment Variables Setup Guide

This guide explains how to get each environment variable for your `.env.local` file.

## Step 1: Create `.env.local` File

Create a file named `.env.local` in the root directory of your project (same level as `package.json`).

## Step 2: Add Environment Variables

Copy the template from `.env.local.example` and fill in the values below.

---

## Database (Supabase)

### NEXT_PUBLIC_SUPABASE_URL
1. Go to https://supabase.com
2. Create a new project or select existing one
3. Go to **Settings** → **API**
4. Copy the **Project URL** (e.g., `https://xxxxx.supabase.co`)

### NEXT_PUBLIC_SUPABASE_ANON_KEY
1. In the same **Settings** → **API** page
2. Copy the **anon/public** key
3. This is safe to expose in client-side code

### SUPABASE_SERVICE_ROLE_KEY
1. In the same **Settings** → **API** page
2. Copy the **service_role** key
3. ⚠️ **KEEP THIS SECRET** - Never expose this in client-side code
4. This key has admin access to your database

---

## Razorpay Payment Gateway

### RAZORPAY_KEY_ID
1. Go to https://dashboard.razorpay.com
2. Sign in or create an account
3. Go to **Settings** → **API Keys**
4. Click **Generate Test Key** (for development) or use **Live Key** (for production)
5. Copy the **Key ID** (starts with `rzp_test_` or `rzp_live_`)

### RAZORPAY_KEY_SECRET
1. In the same **API Keys** section
2. Copy the **Key Secret**
3. ⚠️ **KEEP THIS SECRET** - Never expose this

### NEXT_PUBLIC_RAZORPAY_KEY_ID
- Same as `RAZORPAY_KEY_ID` above
- This is used in the frontend for Razorpay checkout

### RAZORPAY_WEBHOOK_SECRET
1. In Razorpay dashboard, go to **Settings** → **Webhooks**
2. Click **Add New Webhook**
3. Set webhook URL: `https://yourdomain.com/api/razorpay/webhook`
4. Select events: `payment.captured`, `payment.failed`
5. Copy the **Webhook Secret** shown after creation
6. ⚠️ **KEEP THIS SECRET**

---

## Email Service (Outlook/Office365 SMTP - Free)

### SMTP_USER
- Your Outlook/Office365 email address (e.g., `your-email@outlook.com` or `your-email@office365.com`)
- This will be used to authenticate with Outlook SMTP server

### SMTP_PASS
- Your Outlook/Office365 **password** (your regular account password)
- For Outlook.com accounts: Use your regular password
- For Office365/Work accounts: Use your regular work password
- ⚠️ **KEEP THIS SECRET** - Never expose this in client-side code
- Note: If you have 2-factor authentication enabled, you may need to use an App Password (see below)

### SMTP_HOST (Optional)
- Default: `smtp-mail.outlook.com` (for Outlook.com accounts)
- Alternative: `smtp.office365.com` (for Office365/Work accounts)
- Only change if using a different SMTP server

### SMTP_PORT (Optional)
- Default: `587` (TLS)
- Alternative: `465` (SSL) - requires `SMTP_SECURE=true`

### SMTP_SECURE (Optional)
- Default: `false` (for port 587 with TLS)
- Set to `true` for port 465 (SSL)

### FROM_EMAIL (Optional)
- Your email address with name (e.g., `Your Name <your-email@outlook.com>`)
- If not set, will use `SMTP_USER` as the sender

### App Password (If 2FA is enabled)
If you have 2-factor authentication enabled on your Outlook account:
1. Go to https://account.microsoft.com/security
2. Click **Security** → **Advanced security options**
3. Under **App passwords**, click **Create a new app password**
4. Enter a name (e.g., "Lean Multiverse")
5. Copy the generated password
6. Use this App Password as `SMTP_PASS` instead of your regular password

---

## Webinar Configuration

### WEBINAR_ORGANIZER_EMAIL
- Use the same email as `SENDGRID_FROM_EMAIL` or your business email
- This appears in calendar invites as the organizer
- Example: `webinar@yourdomain.com`

### ZOOM Configuration (Choose one option)

**Option 1: Use Zoom API (Server-to-Server OAuth - Recommended for production)**
- `ZOOM_ACCOUNT_ID` - Your Zoom Account ID
- `ZOOM_CLIENT_ID` - Your Zoom Client ID
- `ZOOM_CLIENT_SECRET` - Your Zoom Client Secret
- Get these from: https://marketplace.zoom.us/develop/create (create a Server-to-Server OAuth app)

**Option 2: Use a pre-configured Zoom meeting**
- `ZOOM_MEETING_URL` - Your Zoom meeting URL (e.g., `https://zoom.us/j/123456789`)
- Use this if you want to use the same Zoom meeting for all webinars

---

## Application

### NEXT_PUBLIC_BASE_URL
- **Development**: `http://localhost:3000`
- **Production**: `https://yourdomain.com`
- This is used for generating absolute URLs in emails and calendar invites

---

## Example `.env.local` File

```env
# Database
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Razorpay
RAZORPAY_KEY_ID=rzp_test_1234567890
RAZORPAY_KEY_SECRET=abcdefghijklmnopqrstuvwxyz123456
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_1234567890
RAZORPAY_WEBHOOK_SECRET=webhook_secret_123456

# Email (Outlook/Office365 SMTP - Free)
SMTP_USER=your-email@outlook.com
SMTP_PASS=your_outlook_password
FROM_EMAIL=Your Name <your-email@outlook.com>
# Optional: Only if using a different SMTP server
# For Outlook.com: smtp-mail.outlook.com
# For Office365/Work: smtp.office365.com
# SMTP_HOST=smtp-mail.outlook.com
# SMTP_PORT=587
# SMTP_SECURE=false

# Webinar
WEBINAR_ORGANIZER_EMAIL=webinar@yourdomain.com

# Zoom (Choose one option)
# Option 1: Use Zoom API (Server-to-Server OAuth) to create meetings automatically
ZOOM_ACCOUNT_ID=your_zoom_account_id
ZOOM_CLIENT_ID=your_zoom_client_id
ZOOM_CLIENT_SECRET=your_zoom_client_secret

# Option 2: Use a pre-configured Zoom meeting URL
# ZOOM_MEETING_URL=https://zoom.us/j/YOUR_MEETING_ID

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Important Notes

1. **Never commit `.env.local` to Git** - It's already in `.gitignore`
2. **Use test keys for development** - Razorpay test keys start with `rzp_test_`
3. **Use your regular Outlook password** - No App Password needed unless 2FA is enabled
4. **Set up webhook in Razorpay** - Required for production payment verification
5. **Restart your dev server** after adding/changing environment variables

---

## Testing

After setting up all variables:

1. Restart your development server: `npm run dev`
2. Navigate to `/book-webinar`
3. Try booking a webinar
4. Use Razorpay test card: `4111 1111 1111 1111` (any CVV, any future expiry)

---

## Need Help?

- Supabase: https://supabase.com/docs
- Razorpay: https://razorpay.com/docs
- Outlook SMTP Settings: https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-8361e398-8af4-4e97-b147-6c6c4ac95353

