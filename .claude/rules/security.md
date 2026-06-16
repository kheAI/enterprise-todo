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
