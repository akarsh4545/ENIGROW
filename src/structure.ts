/**
 * Enigrow source layout
 *
 * src/app/(marketing)  → public website routes
 * src/app/(auth)       → login / register
 * src/app/(customer)   → customer dashboard
 * src/app/(admin)      → admin console
 * src/app/api          → HTTP APIs + health + auth + webhooks
 *
 * src/components/ui         → Shadcn primitives
 * src/components/layout     → header, footer, sidebars
 * src/components/marketing  → landing / content sections
 * src/components/dashboard  → customer UI
 * src/components/admin      → admin UI
 *
 * src/features/*   → domain modules (UI + hooks colocated by feature)
 * src/lib/*        → shared infra (db, auth, email, payments, cloudinary)
 * src/models/*     → Mongoose models
 * src/validations/*→ Zod schemas
 * src/services/*   → server-side business logic
 * src/emails/*     → email templates
 * src/config/*     → app configuration
 * src/constants/*  → routes, enums, static maps
 */

export {};
