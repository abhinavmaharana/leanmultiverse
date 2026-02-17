# Operations and monitoring

## Health endpoint

**`GET /api/health`** is the recommended liveness/readiness endpoint for load balancers and uptime checks.

- Returns `200` with `{ status: "ok" }` when the app is running.
- Optionally checks Supabase (minimal query). If Supabase is unreachable, response is still `200` with `{ status: "degraded", dependency: "supabase", error: "..." }` so the instance is not taken out of rotation.
- **`GET /api/health?check=env`** (production): Validates required environment variables (Supabase URL/key, Razorpay keys). Returns `503` with `{ status: "error", missing: ["..."] }` if any are missing. Use this in deployment or monitoring to verify configuration.

## Error reporting (Sentry)

API routes should report server-side errors to Sentry so production issues are visible.

- In catch blocks of API route handlers, call **`Sentry.captureException(error)`** before returning a generic error response to the client.
- Do not expose stack traces or internal error messages to the client; return a safe message (e.g. “We’re experiencing high demand; please try again in a few minutes” for external service failures).
- Critical write paths (contact, quotation, enrollment, payment create-order, newsletter) already use this pattern; new API routes should follow it.
