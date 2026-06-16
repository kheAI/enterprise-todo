# Security Rules

- Never store secrets in code. Use `.env` locally, AWS Secrets Manager / Tencent SSM in production.
- All JWT uses RS256 (RSA asymmetric). Never use HS256.
- Rotate RSA key pairs per environment — dev, staging, production must each have unique keys.
- Every mutation and sensitive query MUST have `@UseGuards(AuthJwtGuard)` or `PortalAuthJwtGuard`.
- Admin portal operations use `PortalAuthJwtGuard`, not the regular `AuthJwtGuard`.
- `ValidationPipe` with `forbidNonWhitelisted: true` is global in `main.ts` — never disable it.
- Soft-delete sensitive records (permissions, audit-relevant data) — never hard-delete.
- CORS: local dev can use `*`; staging and production must use an explicit origin allowlist.
- API keys are stored as SHA-256 hashes only — the raw key is never persisted.
- Rate-limit all public endpoints with `@nestjs/throttler`.
- Delete mutations must filter by BOTH the record's `id` AND the JWT-extracted `userId` — never by `id` alone or any authenticated user can delete any record.
- `requestPasswordReset` must always return `true` regardless of whether the email exists — returning an error reveals registered emails (user enumeration).
- Single-use tokens (`SecuredTokenEntity`) must be set to `CLAIMED` immediately after validation — never validate the same token twice or reuse it across requests.
- Transactional email must always be dispatched via Bull queue — never `await emailService.send()` inline in a mutation (blocks the HTTP response and fails silently on SMTP errors).
- `TWOFA_BYPASS_PASSWORD` is for development and testing only — never set this variable in staging or production environments.
- Every NestJS app in the monorepo MUST mount `RequestPlatformInterceptor` with its own platform value (`'user'` for `apps/api`, `'portal'` for `apps/portal-api`) — this prevents a valid user JWT from being used on the portal API and vice versa.
- JWT payloads MUST include a `platform` claim (`'user'` | `'portal'`) signed by the issuing app's private key — never accept a token without validating its platform matches the receiving app.
