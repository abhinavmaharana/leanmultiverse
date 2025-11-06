# Email Setup Guide - Nodemailer

This guide will help you set up email sending using Nodemailer with Gmail SMTP (easiest option) or other email providers.

## Option 1: Gmail SMTP (Recommended - Easiest)

### Step 1: Enable 2-Step Verification
1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)

### Step 2: Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select **Mail** as the app
3. Select **Other (Custom name)** as the device
4. Enter "Lean Multiverse" as the name
5. Click **Generate**
6. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

### Step 3: Add to Environment Variables
Add these to your `.env.local` file:

```env
# Gmail SMTP Configuration
EMAIL_SERVICE=gmail
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
SMTP_FROM_EMAIL=Your Name <your-email@gmail.com>
```

**OR** use these alternative variable names:

```env
SMTP_HOST=gmail
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=abcdefghijklmnop
SMTP_FROM_EMAIL=Your Name <your-email@gmail.com>
```

---

## Option 2: Custom SMTP (Any Email Provider)

### For Email Providers like:
- Outlook/Office 365
- Yahoo
- Custom SMTP servers
- Your own email server

### Add to Environment Variables:

```env
# Custom SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
SMTP_FROM_EMAIL=Your Name <your-email@example.com>
```

### Common SMTP Settings:

**Gmail:**
- Host: `smtp.gmail.com`
- Port: `587` (TLS) or `465` (SSL)
- Secure: `false` for 587, `true` for 465

**Outlook/Office 365:**
- Host: `smtp.office365.com`
- Port: `587`
- Secure: `false`

**Yahoo:**
- Host: `smtp.mail.yahoo.com`
- Port: `587`
- Secure: `false`

---

## Option 3: SendGrid (Recommended for Production)

### Step 1: Create SendGrid Account
1. Go to https://sendgrid.com
2. Sign up for a free account
3. Verify your email

### Step 2: Create API Key
1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Give it a name (e.g., "Lean Multiverse")
4. Select **Full Access** or **Restricted Access** (with Mail Send permission)
5. Copy the API key

### Step 3: Add to Environment Variables

```env
# SendGrid Configuration
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SMTP_FROM_EMAIL=Your Name <your-email@example.com>
```

---

## Testing Your Email Configuration

### Test via API Endpoint

```bash
curl -X POST https://www.leanmultiverse.com/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'
```

### Check Configuration

Visit: `https://www.leanmultiverse.com/api/test-config`

This will show which email variables are configured.

---

## Troubleshooting

### Gmail Issues

**Error: "Invalid login"**
- Make sure you're using an **App Password**, not your regular Gmail password
- App passwords are 16 characters (no spaces)

**Error: "Less secure app access"**
- Gmail no longer supports "Less secure app access"
- You **must** use App Passwords with 2-Step Verification enabled

**Error: "Authentication failed"**
- Double-check your email and app password
- Make sure 2-Step Verification is enabled

### Custom SMTP Issues

**Error: "Connection timeout"**
- Check if the SMTP host and port are correct
- Check if your firewall is blocking the connection
- Try port 465 with `SMTP_SECURE=true`

**Error: "Authentication failed"**
- Verify your username and password
- Some providers require the full email as username

### SendGrid Issues

**Error: "API key invalid"**
- Make sure you copied the full API key
- Check if the API key has "Mail Send" permission

---

## Environment Variables Summary

### For Gmail:
```env
EMAIL_SERVICE=gmail
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=Your Name <your-email@gmail.com>
```

### For Custom SMTP:
```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
SMTP_FROM_EMAIL=Your Name <your-email@example.com>
```

### For SendGrid:
```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SMTP_FROM_EMAIL=Your Name <your-email@example.com>
```

---

## Next Steps

1. Choose an email provider (Gmail is easiest for testing)
2. Set up the credentials
3. Add them to your `.env.local` file
4. Test using the `/api/test-email` endpoint
5. Make a test booking to verify emails are sent automatically

---

## Security Notes

⚠️ **Never commit `.env.local` to Git** - It's already in `.gitignore`

⚠️ **Keep your App Passwords and API Keys secure** - Don't share them publicly

⚠️ **Use App Passwords for Gmail** - Don't use your regular Gmail password

