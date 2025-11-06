# Production Email Setup Guide

This guide covers production-ready email services for sending webinar booking confirmation emails.

## Recommended Services (in order)

1. **SendGrid** - Easiest to set up, free tier available, excellent deliverability
2. **Mailgun** - Great for developers, free tier available, good analytics
3. **AWS SES** - Most cost-effective at scale, requires AWS account

---

## Option 1: SendGrid (Recommended)

### Why SendGrid?
- ✅ Free tier: 100 emails/day forever
- ✅ Easy setup
- ✅ Excellent deliverability
- ✅ Good analytics dashboard
- ✅ No credit card required for free tier

### Setup Steps

1. **Create Account**
   - Go to https://sendgrid.com
   - Sign up for free account
   - Verify your email

2. **Create API Key**
   - Go to **Settings** → **API Keys**
   - Click **Create API Key**
   - Name it "Lean Multiverse"
   - Select **Full Access** or **Restricted Access** (with Mail Send permission)
   - Copy the API key (starts with `SG.`)

3. **Verify Sender Identity** (Optional but recommended)
   - Go to **Settings** → **Sender Authentication**
   - Verify a Single Sender or Domain
   - This improves deliverability

4. **Add to Environment Variables**
   ```env
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   SMTP_FROM_EMAIL=Your Name <your-email@yourdomain.com>
   ```

### Pricing
- **Free**: 100 emails/day
- **Essentials**: $19.95/month for 50,000 emails
- **Pro**: $89.95/month for 100,000 emails

---

## Option 2: Mailgun

### Why Mailgun?
- ✅ Free tier: 5,000 emails/month for 3 months, then 1,000/month
- ✅ Developer-friendly
- ✅ Great analytics
- ✅ Easy API

### Setup Steps

1. **Create Account**
   - Go to https://www.mailgun.com
   - Sign up for free account
   - Verify your email

2. **Add Domain**
   - Go to **Sending** → **Domains**
   - Add your domain (e.g., `leanmultiverse.com`)
   - Follow DNS setup instructions
   - Verify domain

3. **Get API Key**
   - Go to **Settings** → **API Keys**
   - Copy your **Private API Key**

4. **Get SMTP Credentials**
   - Go to **Sending** → **Domain Settings**
   - Find **SMTP credentials**
   - Note your SMTP username (usually `postmaster@yourdomain.com`)

5. **Add to Environment Variables**
   ```env
   MAILGUN_API_KEY=your-private-api-key
   MAILGUN_DOMAIN=yourdomain.com
   MAILGUN_SMTP_USER=postmaster@yourdomain.com
   SMTP_FROM_EMAIL=Your Name <your-email@yourdomain.com>
   ```

### Pricing
- **Free**: 1,000 emails/month (after 3-month trial)
- **Foundation**: $35/month for 50,000 emails
- **Growth**: $80/month for 100,000 emails

---

## Option 3: AWS SES

### Why AWS SES?
- ✅ Most cost-effective at scale ($0.10 per 1,000 emails)
- ✅ Highly reliable
- ✅ Integrates with other AWS services
- ⚠️ Requires AWS account setup
- ⚠️ More complex initial setup

### Setup Steps

1. **Create AWS Account**
   - Go to https://aws.amazon.com
   - Create account (if you don't have one)

2. **Verify Email Address**
   - Go to **AWS SES Console** → **Verified identities**
   - Click **Create identity**
   - Select **Email address**
   - Enter your email and verify

3. **Request Production Access** (if needed)
   - By default, SES is in "Sandbox" mode
   - Request production access to send to any email
   - Usually approved within 24 hours

4. **Create IAM User**
   - Go to **IAM Console** → **Users**
   - Create user with programmatic access
   - Attach policy: `AmazonSESFullAccess` or create custom policy
   - Save Access Key ID and Secret Access Key

5. **Add to Environment Variables**
   ```env
   AWS_SES_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   SMTP_FROM_EMAIL=Your Name <your-verified-email@example.com>
   ```

### Pricing
- **Free**: 62,000 emails/month (if using EC2)
- **Paid**: $0.10 per 1,000 emails
- **Very cost-effective** for high volume

---

## Quick Comparison

| Service | Free Tier | Setup Difficulty | Best For |
|---------|-----------|-----------------|----------|
| **SendGrid** | 100/day | ⭐ Easy | Most users |
| **Mailgun** | 1,000/month | ⭐⭐ Medium | Developers |
| **AWS SES** | 62,000/month* | ⭐⭐⭐ Complex | High volume |

*If using EC2

---

## Recommendation

**For most users: Use SendGrid**
- Easiest setup
- Free tier is generous (100/day = 3,000/month)
- Excellent deliverability
- Good support

**For developers: Use Mailgun**
- Better API
- More control
- Good analytics

**For high volume: Use AWS SES**
- Most cost-effective
- Scales well
- Enterprise-grade reliability

---

## Testing

After setting up, test your configuration:

```bash
curl -X POST https://www.leanmultiverse.com/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'
```

Check configuration status:
- Visit: `https://www.leanmultiverse.com/api/test-config`

---

## Next Steps

1. Choose a service (SendGrid recommended)
2. Set up account and get API key
3. Add credentials to `.env.local`
4. Test using `/api/test-email` endpoint
5. Make a test booking to verify emails are sent

---

## Support

- **SendGrid**: https://support.sendgrid.com
- **Mailgun**: https://documentation.mailgun.com
- **AWS SES**: https://docs.aws.amazon.com/ses

