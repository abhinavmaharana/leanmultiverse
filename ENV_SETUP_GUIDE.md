# Email Service (EmailJS)

### EMAILJS_SERVICE_ID
- Your EmailJS service ID (Dashboard → Email Services → Service ID)

### EMAILJS_TEMPLATE_ID
- The template you created for webinar confirmations (Dashboard → Email Templates)
- Make sure the template includes placeholders for:
  - `to_email`
  - `to_name`
  - `formatted_date`
  - `formatted_time`
  - `meet_link`
  - `raw_calendar` (base64 string of the .ics attachment)
  - `raw_date`
  - `raw_time`

### EMAILJS_PUBLIC_KEY
- Public key (Dashboard → Account → API Keys)
- Required even when using the private key

### EMAILJS_PRIVATE_KEY
- Private key (Dashboard → Account → API Keys)
- Enables secure server-to-server requests
- Used in the `Authorization: Bearer <PRIVATE_KEY>` header

---

## Example `.env.local`

```env
EMAILJS_SERVICE_ID=service_abc123
EMAILJS_TEMPLATE_ID=template_xyz789
EMAILJS_PUBLIC_KEY=abcdEFG123456
EMAILJS_PRIVATE_KEY=private_987654321
```

---

## Template Tips

1. Enable “Attachments (Base64)” in the EmailJS template so the calendar invite is delivered.
2. Use the variables in your HTML, e.g. `{{formatted_date}}`, `{{formatted_time}}`, `{{meet_link}}`.
3. You can embed the HTML provided earlier or your own design.

---

## Testing Checklist

1. Set all four EmailJS environment variables and restart the dev server.
2. Hit `/api/test-config` → all email values should show “✅ Configured”.
3. Send a POST to `/api/test-email` with `{ "to": "your-email@example.com" }`.
4. Run through the booking flow and confirm you receive the confirmation email with the `.ics` attachment.

---

## Need Help?

- EmailJS REST docs: https://www.emailjs.com/docs/rest-api/send-email/
- EmailJS dashboard: https://dashboard.emailjs.com
- If you get “API calls are disabled for non-browser applications”, double-check you’re sending the `Authorization: Bearer <PRIVATE_KEY>` header.

