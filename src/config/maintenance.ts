// Site-wide maintenance switch.
// true  -> every page request is answered with the /maintenance page (HTTP 503).
// false -> site behaves normally.
// API routes (payment webhooks, health checks) and static assets are never blocked.
export const MAINTENANCE_MODE = false
