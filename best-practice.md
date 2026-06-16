# Best Practice

**Reference sources:**

- Battle-tested enterprise NestJS patterns
- Documented stack standards and best practices
- `.claude/rules/` — project-specific enforced rules

## 1. Tutorial Coverage Map

| Gap / Pattern                                                                   | Covered by              |
| ------------------------------------------------------------------------------- | ----------------------- |
| Auth (JWT RS256, guards, strategies, `@CurrentUser()`, bcrypt)                  | 6107                    |
| `userId` injected from JWT, not from client                                     | 6107                    |
| Delete ownership filter (`id` + `userId`)                                       | 6107                    |
| DataLoaders — N+1 prevention                                                    | 6109                    |
| Unit tests per module (3 spec files)                                            | 6108 partial, 6110 full |
| E2E tests with real test database                                               | 6110                    |
| Bull queues + processors + retry logic                                          | 6111                    |
| Redis PubSub + GraphQL subscriptions                                            | 6111                    |
| Multi-tenancy (`tenantId` on every entity)                                      | 6113                    |
| ACPermissionGuard (slug-based, DB-backed, replaces RolesGuard)                  | 6113 (updated)          |
| Dual-auth (PortalAuthJwtGuard, separate key pair)                               | 6113                    |
| Production Docker (multi-stage Dockerfile)                                      | 6112                    |
| GitHub Actions CI pipeline                                                      | 6112                    |
| Conventional commits + Husky + lint-staged                                      | 6112                    |
| AI tooling layer (`.claude/`, agents, MCP, 6-phase workflow)                    | 6114                    |
| Persistent memory system, graphify deep-dive, gitnexus deep-dive, team knowledge culture | 6116             |
| Joi env validation + typed config mapper (`AppConfig`)                          | 6118                    |
| Global `LoggingInterceptor`, Helmet, rate limiting, ExceptionFilter             | 6118                    |
| `docker-compose.dev.arm.yml`                                                    | 6118                    |
| Email service (nodemailer via Bull) + Mailpit local dev                         | 6119                    |
| Secured token (password reset, email verification)                              | 6119                    |
| Two-factor authentication (TOTP, bind/verify flow)                              | 6119                    |
| Column transformers (lowercase, slug normalization)                             | 6120                    |
| `createdBy` / `updatedBy` audit columns via TypeORM subscriber                  | 6120                    |
| Running number service with pessimistic lock                                    | 6120                    |
| `libs/core` extraction for multi-app config reuse                               | 6120                    |
| `apps/portal-api` dual-app Nx structure                                         | 6121                    |
| `RequestPlatformInterceptor` (platform claim in JWT)                            | 6121                    |
| `PortalJwtStrategy` + `PortalAuthModule` in portal-api                          | 6121                    |
| Media library (S3 presigned uploads, magic byte validation, CDN)                | 6122                    |
| Affiliate/referral tree (materialized path, downline queries)                   | 6123                    |
| Production deployment (ECS Fargate, RDS, ElastiCache, zero-downtime migrations) | 6124                    |

---

## 2. Implemented Patterns — Full Reference Table

| Area                                            | Status      | Covered by     |
| ----------------------------------------------- | ----------- | -------------- |
| Auth (JWT RS256, guards, strategies)            | 🟢          | 6107           |
| Env config validation (Joi)                     | 🟢          | 6118           |
| Typed config object (AppConfig)                 | 🟢          | 6118           |
| `libs/core` shared config                       | 🟢          | 6120           |
| Global `LoggingInterceptor`                     | 🟢          | 6118           |
| Global ExceptionFilter                          | 🟢          | 6118           |
| Rate limiting (`@nestjs/throttler`)             | 🟢          | 6118           |
| Helmet (security headers)                       | 🟢          | 6118           |
| RBAC (ACPermissionGuard, slug-based)            | 🟢          | 6113 (updated) |
| Multi-tenancy (`tenantId` + TenantGuard)        | 🟢          | 6113           |
| Bull queues + processors                        | 🟢          | 6111           |
| Redis PubSub (subscriptions)                    | 🟢          | 6111           |
| Two-factor auth (TOTP)                          | 🟢          | 6119           |
| Secured token pattern                           | 🟢          | 6119           |
| Email service via Bull queue                    | 🟢          | 6119           |
| Request platform interceptor                    | 🟢          | 6121           |
| Unit tests per module (3 spec files)            | 🟢          | 6110           |
| E2E test with real DB                           | 🟢          | 6110           |
| Structured logging (LoggingInterceptor)         | 🟢          | 6118           |
| Soft-delete on audit entities                   | 🟢          | 6113           |
| Docker ARM64 compose                            | 🟢          | 6118           |
| Column transformers (lowercase, slug)           | 🟢          | 6120           |
| `createdBy` / `updatedBy` audit columns         | 🟢          | 6120           |
| Running number service                          | 🟢          | 6120           |
| Media library (S3 + CDN)                        | 🟢          | 6122           |
| Affiliate/referral tree                         | 🟢          | 6123           |
| Production deployment (ECS + RDS + ElastiCache) | 🟢          | 6124           |
| Relay cursor pagination                         | ⭐ Ahead    | 6105/6108      |
| GraphQL codegen (`generated.ts` + hooks)        | ⭐ Ahead    | 6106           |
| Full Next.js frontend                           | ⭐ Ahead    | 6106           |
| Tailwind v4 + Shadcn UI                         | ⭐ Ahead    | 6106           |
| 24-part tutorial series                         | ⭐ Ahead    | 6101–6124      |
| AI dev tooling (GitNexus + Graphify + RTK)      | ⭐ Ahead    | 6114, 6116     |
| `@IsUndefined()` partial updates                | 🟢 In rules | —              |
| `CqrsModule` only in AppModule                  | 🟢 Correct  | —              |
| RS256 JWT                                       | 🟢          | 6107           |
| SnakeNamingStrategy                             | 🟢          | 6104           |
| Seeders with reset seeder                       | 🟢          | 6102           |
| Entity-qualified service methods                | 🟢          | 6105           |

---

## 3. Implementation Priority Roadmap

All items complete.

### P0 — Before any production use

1. ✅ Joi env validation schema — 6118
2. ✅ Typed config object mapper — 6118
3. ✅ Auth module: JWT RS256, guards, strategies, `@CurrentUser()` — 6107
4. ✅ Remove `userId` from `@Field()` on all inputs — inject from JWT — 6107

### P1 — Production readiness

5. ✅ `LoggingInterceptor` global — 6118
6. ✅ Rate limiting via `@nestjs/throttler` — 6118
7. ✅ RBAC: RoleModule + PermissionModule + ACPermissionGuard — 6113
8. ✅ Multi-tenancy: `tenantId` on entities + tenant context injection — 6113
9. ✅ Per-module unit tests: 3 spec files per module — 6110
10. ✅ E2E test with real test DB — 6110

### P2 — Scalability & completeness

11. ✅ Bull queue module with Redis — 6111
12. ✅ Secured token module (password reset, email verification) — 6119
13. ✅ Platform interceptor for dual-auth (`portal-api` + `RequestPlatformInterceptor`) — 6121
14. ✅ Soft-delete enforcement on permission/audit entities — 6113
15. ✅ `docker-compose.dev.arm.yml` — 6118

### P3 — Enterprise/advanced

16. ✅ Two-factor authentication (TOTP) — 6119
17. ✅ Running number service (sequence generation) — 6120
18. ✅ Media library (S3 presigned uploads, CDN) — 6122
19. ✅ Affiliate/referral tree (materialized path) — 6123
20. ✅ `libs/core` extraction for multi-app monorepo reuse — 6120
21. ✅ Production deployment (ECS Fargate, RDS, ElastiCache) — 6124

---

## 4. Reusability Checklist for New Projects

When starting a new NestJS/CQRS project from this stack, copy and adapt:

**AI & developer tooling**

- [ ] `.claude/rules/` — architecture, security, performance, migration rules
- [ ] `.claude/agents/` — backend-specialist, frontend-specialist (update port/URLs)
- [ ] `CLAUDE.md` — gotchas section + rule file references

**Bootstrap layer**

- [ ] `apps/api/src/main.ts` — ValidationPipe, CORS, LoggingInterceptor, Helmet, `createPlatformInterceptor('user')`, ThrottlerGuard, AllExceptionsFilter
- [ ] `apps/portal-api/src/main.ts` — same bootstrap + `createPlatformInterceptor('portal')`
- [ ] `apps/api/src/app/app.module.ts` — TypeORM, GraphQL, `CqrsModule.forRoot()`, ThrottlerModule
- [ ] `apps/api/ormconfig.ts` — TypeORM CLI datasource

**Config layer**

- [ ] `libs/core/src/config/config.mapper.ts` — typed `AppConfig` factory
- [ ] `libs/core/src/config/config.validation.ts` — Joi validation schema
- [ ] `libs/core/src/config/config.module.ts` — `CoreConfigModule` wrapper
- [ ] `libs/core/src/constants/` — queue names, token issuers, shared enums
- [ ] `libs/core/src/interceptors/request-platform.interceptor.ts` — `createPlatformInterceptor` factory
- [ ] `tsconfig.base.json` path alias for `@<project>/core`

**Data layer**

- [ ] `apps/api/src/helpers/transformer.ts` — `LowerCaseTransformer`, `SlugTransformer`, `UpperCaseTransformer`
- [ ] `apps/api/src/interceptors/user-context.ts` — request-scoped `UserContext`
- [ ] `apps/api/src/subscribers/audit.subscriber.ts` — `createdBy`/`updatedBy`
- [ ] `apps/api/src/modules/running-number/` — pessimistic-lock sequence service
- [ ] Seeder pattern (0-reset + sequential seeders)
- [ ] CQRS pattern files (`.cqrs.input.ts`, `.cqrs.handler.ts`, `cqrs/index.ts`)

**Auth layer**

- [ ] `apps/api/src/modules/auth/` — JWT RS256, `AuthJwtStrategy`, `AuthJwtGuard`, `@CurrentUser()`, platform claim `'user'`
- [ ] `apps/portal-api/src/modules/portal-auth/` — `PortalJwtStrategy` (named `'portal-jwt'`), `PortalAuthJwtGuard`, platform claim `'portal'`
- [ ] `apps/api/src/modules/secured-token/` — single-use token entity + service
- [ ] `apps/api/src/modules/email/` — nodemailer service + Bull queue processor
- [ ] `apps/api/src/shared/guards/ac-permission.guard.ts` — `ACPermissionGuard`, `@UseACGuard()`, `@AllowGuest()`
- [ ] `apps/api/src/modules/permission/permission.entity.ts` — slug-based permission entity
- [ ] `apps/api/src/modules/role/role.entity.ts` — role entity with ManyToMany permissions

**Media & async**

- [ ] `apps/api/src/modules/media/` — S3Service, MediaService, MediaProcessor, MediaResolver
- [ ] `apps/api/src/modules/email/` — EmailService (nodemailer) + Bull processor
- [ ] `BullModule.forRootAsync()` — configured with TLS for production ElastiCache

**Optional domain modules** (add when needed)

- [ ] `apps/api/src/modules/referral/` — ReferralService (materialized path tree)
- [ ] `apps/api/src/modules/running-number/` — sequence generation per entity type

**Infrastructure**

- [ ] `docker-compose.dev.yml` + `docker-compose.dev.arm.yml`
- [ ] `apps/api/Dockerfile` + `apps/portal-api/Dockerfile` (multi-stage)
- [ ] `apps/api/Dockerfile.migrator` — one-off migration runner
- [ ] `apps/api/src/migration-runner.ts` — standalone migration entry point
- [ ] `.github/workflows/deploy.yml` — ECR build + ECS deploy + migration task
- [ ] `.env.example` — all env vars documented with comments
