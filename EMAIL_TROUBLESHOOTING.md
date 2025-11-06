# Email Troubleshooting Guide

If emails are not being sent, follow these steps to diagnose and fix the issue.

## Step 1: Check Environment Variables

First, verify that your environment variables are set correctly.

### Check Configuration Status

Visit this URL in your browser (replace with your domain):
- **Local**: `http://localhost:3000/api/test-config`
- **Production**: `https://yourdomain.com/api/test-config`

This will show you which environment variables are configured and which are missing.

### Required Environment Variables

Make sure these are set in your `.env.local` file:

```env
SMTP_USER=your-email@outlook.com
SMTP_PASS=your_outlook_password
FROM_EMAIL=Your Name <your-email@outlook.com>
```

## Step 2: Test Email Sending

### Option A: Use the Test Email Endpoint

Send a POST request to `/api/test-email`:

**Using curl:**
```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'
```

**Using JavaScript (in browser console):**
```javascript
fetch('/api/test-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ to: 'your-email@example.com' })
})
.then(r => r.json())
.then(console.log)
```

### Option B: Check Server Logs

When a payment is verified, check your server logs for:
- `Attempting to send email to: [email]`
- `Email sent successfully` or error messages
- Check both console logs and your hosting platform's logs

## Step 3: Common Issues and Solutions

### Issue 1: SMTP Credentials Not Set

**Symptoms:**
- Error: "SMTP credentials are not configured"
- `/api/test-config` shows ❌ Missing for smtpUser or smtpPass

**Solution:**
1. Add to your `.env.local` file:
   ```env
   SMTP_USER=your-email@outlook.com
   SMTP_PASS=your_outlook_password
   FROM_EMAIL=Your Name <your-email@outlook.com>
   ```
2. **Restart your development server** (if running locally)

### Issue 2: Invalid Password

**Symptoms:**
- Error: "Invalid login" or "Authentication failed"
- Email sending fails with authentication error

**Solution:**
1. Make sure you're using your **regular Outlook password** (not an App Password unless 2FA is enabled)
2. Verify the password is correct (no extra spaces)
3. If you have 2-factor authentication enabled, you need to use an App Password (see Issue 3)
4. Try resetting your password if needed

### Issue 3: 2-Factor Authentication (2FA) Enabled

**Symptoms:**
- Error: "Authentication failed" even with correct password
- 2FA is enabled on your Outlook account

**Solution:**
If you have 2-factor authentication enabled, you need to use an App Password:
1. Go to https://account.microsoft.com/security
2. Click **Security** → **Advanced security options**
3. Under **App passwords**, click **Create a new app password**
4. Enter a name (e.g., "Lean Multiverse")
5. Copy the generated password
6. Use this App Password as `SMTP_PASS` in your `.env.local` file:
   ```env
   SMTP_PASS=your_app_password_here
   ```

### Issue 4: Emails Going to Spam

**Symptoms:**
- Emails are sent successfully but not received
- No error in logs

**Solution:**
1. Check spam/junk folder
2. Use a professional email address (not a personal Outlook for production)
3. Add SPF and DKIM records if using a custom domain
4. Check Outlook Activity Log: https://account.microsoft.com/security

### Issue 5: Rate Limiting

**Symptoms:**
- Error: "Too many requests" or rate limit exceeded
- Emails stop working after sending many emails

**Solution:**
1. Outlook.com free tier: 300 emails/day (personal accounts)
2. Office365/Work accounts: Higher limits (varies by plan)
3. Wait for the limit to reset (24 hours)
4. Consider using a different email service for higher volume

### Issue 6: Environment Variables Not Loading

**Symptoms:**
- Variables show as missing even though they're in `.env.local`
- Configuration check shows ❌ Missing

**Solution:**
1. Make sure `.env.local` is in the **root directory** (same level as `package.json`)
2. **Restart your development server** after adding/changing environment variables
3. For production (Vercel/Netlify), add variables in the platform dashboard:
   - **Vercel**: Project Settings → Environment Variables
   - **Netlify**: Site Settings → Environment Variables
4. Make sure variable names match exactly (case-sensitive)

### Issue 7: Port/Connection Issues

**Symptoms:**
- Error: "Connection timeout" or "ECONNREFUSED"
- Cannot connect to Outlook SMTP

**Solution:**
1. Check your firewall/network settings
2. Verify SMTP settings:
   - Host: `smtp-mail.outlook.com` (for Outlook.com) or `smtp.office365.com` (for Office365)
   - Port: `587` (TLS) or `465` (SSL)
   - Secure: `false` for port 587, `true` for port 465
3. If port 587 is blocked, try port 465 with `SMTP_SECURE=true`
4. Check if your hosting provider blocks SMTP ports

### Issue 8: Wrong SMTP Host

**Symptoms:**
- Error: "Host not found" or connection errors
- Using wrong SMTP server

**Solution:**
1. For **Outlook.com** accounts: Use `smtp-mail.outlook.com`
2. For **Office365/Work** accounts: Use `smtp.office365.com`
3. Add to your `.env.local`:
   ```env
   SMTP_HOST=smtp-mail.outlook.com
   # or
   SMTP_HOST=smtp.office365.com
   ```

## Step 4: Verify Outlook Setup

1. **Check Outlook Activity:**
   - Go to https://account.microsoft.com/security
   - Check **Recent activity** for login attempts
   - Verify your account is active

2. **Check App Password (if 2FA enabled):**
   - Go to **Security** → **Advanced security options** → **App passwords**
   - Make sure your App Password is listed and active
   - Generate a new one if needed

3. **Check 2-Step Verification:**
   - Go to **Security** → **Two-step verification**
   - If enabled, you must use an App Password (not your regular password)

## Step 5: Debug in Code

Add more detailed logging to see what's happening:

1. Check server console logs when payment is verified
2. Look for these log messages:
   - `Attempting to send email to: [email]`
   - `Email sent successfully: {...}`
   - `Error sending email: {...}`

3. Check the error details in logs for specific error messages

## Step 6: Test Email Endpoint

Use the test email endpoint to verify your configuration:

```bash
# Replace with your email
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'
```

Expected response if working:
```json
{
  "success": true,
  "message": "Test email sent successfully",
  "messageId": "...",
  "to": "your-email@example.com",
  "from": "Your Name <your-email@outlook.com>",
  "response": "250 OK"
}
```

## Step 7: Production Deployment

If emails work locally but not in production:

1. **Add environment variables in your hosting platform:**
   - **Vercel**: Project Settings → Environment Variables
   - **Netlify**: Site Settings → Environment Variables
   - **Other platforms**: Check their documentation

2. **Redeploy** after adding environment variables

3. **Check production logs** for errors

4. **Verify SMTP settings** match your local configuration

## Quick Checklist

- [ ] `SMTP_USER` is set in `.env.local` (your Outlook email address)
- [ ] `SMTP_PASS` is set in `.env.local` (your Outlook password or App Password if 2FA enabled)
- [ ] `FROM_EMAIL` is set in `.env.local` (optional, defaults to SMTP_USER)
- [ ] `SMTP_HOST` is set correctly (`smtp-mail.outlook.com` or `smtp.office365.com`)
- [ ] Development server was restarted after adding variables
- [ ] Test email endpoint works (`/api/test-email`)
- [ ] Check spam folder if emails are sent but not received
- [ ] Production environment variables are set (if deployed)

## Still Not Working?

1. **Check Outlook Activity:**
   - Go to https://account.microsoft.com/security
   - See if there are any security alerts or blocked login attempts

2. **Verify Password:**
   - Make sure you're using the correct password
   - If 2FA is enabled, use an App Password instead

3. **Check Network/Firewall:**
   - Some networks block SMTP ports (587, 465)
   - Try from a different network or use a VPN

4. **Alternative: Use a different SMTP server:**
   - Consider using a different email provider (Gmail, Yahoo, etc.)
   - Or use a service like Mailgun, AWS SES, or other providers
   - Update `src/lib/email.ts` with new SMTP configuration

## Testing Checklist

1. ✅ Configuration check: `/api/test-config`
2. ✅ Test email: `/api/test-email`
3. ✅ Real booking: Complete a test payment
4. ✅ Check logs: Server console
5. ✅ Check inbox: Including spam folder

## Outlook SMTP Setup (Step-by-Step)

1. **Get Your Outlook Credentials:**
   - Your Outlook email address (e.g., `your-email@outlook.com`)
   - Your Outlook password (regular password, unless 2FA is enabled)

2. **If 2FA is Enabled:**
   - Go to https://account.microsoft.com/security
   - Click **Security** → **Advanced security options**
   - Under **App passwords**, click **Create a new app password**
   - Enter "Lean Multiverse" as the name
   - Copy the generated password
   - Use this as `SMTP_PASS` instead of your regular password

3. **Add to `.env.local`:**
   ```env
   SMTP_USER=your-email@outlook.com
   SMTP_PASS=your_outlook_password_or_app_password
   FROM_EMAIL=Your Name <your-email@outlook.com>
   # For Outlook.com accounts:
   SMTP_HOST=smtp-mail.outlook.com
   # For Office365/Work accounts:
   # SMTP_HOST=smtp.office365.com
   SMTP_PORT=587
   SMTP_SECURE=false
   ```

4. **Restart your development server**

5. **Test it:**
   ```bash
   curl -X POST http://localhost:3000/api/test-email \
     -H "Content-Type: application/json" \
     -d '{"to": "your-email@example.com"}'
   ```

## Outlook vs Office365

- **Outlook.com** (Personal): Use `smtp-mail.outlook.com`
- **Office365** (Work/Business): Use `smtp.office365.com`

Both use the same port (587) and settings, just different hosts.
