# enterprise-todo

An enterprise-grade todo application built as a learning project — demonstrating how to migrate from Meteor to a modern NestJS + Next.js monorepo stack.

This repo is also a **production-ready fullstack scaffold** covering every pattern needed for an enterprise-grade NestJS project — with a Next.js frontend, AI-assisted dev workflow, and a 24-part tutorial series to build it from scratch.

---

## Tutorial Series

This codebase is built step-by-step across 24 tutorials. Each part introduces one layer of the stack with working code and Meteor migration context.

| Part | Title                               | Key concepts                                                          |
| ---- | ----------------------------------- | --------------------------------------------------------------------- |
| 6101 | Meteor → NestJS: The Migration Case | Monorepo setup, Nx 22, project structure                              |
| 6102 | Environment & Docker Setup          | Docker Compose, `.env`, Adminer                                       |
| 6103 | TypeScript & NestJS DI              | Modules, providers, DI fundamentals                                   |
| 6104 | TypeORM Entities & Migrations       | Entities, `AbstractEntity`, migrations                                |
| 6105 | CQRS Pattern                        | Commands, queries, handlers, typed buses                              |
| 6106 | GraphQL API + Next.js Frontend      | Apollo Server v5, resolvers, Apollo Client v4                         |
| 6107 | Authentication — Guards & Security  | JWT RS256, `AuthJwtGuard`, `@CurrentUser()`, bcrypt                   |
| 6108 | Case Study 1: Tag Module            | Full 9-step build walkthrough                                         |
| 6109 | Case Study 2: Todo Module           | FK relations, auth, DataLoader, N+1 prevention                        |
| 6110 | Testing — Unit & E2E                | Jest, real test DB, 3-spec-file pattern                               |
| 6111 | Queues & Real-Time                  | Bull, Redis PubSub, GraphQL subscriptions                             |
| 6112 | Git Commit Standards & CI/CD Pipeline | Selective staging, Commitizen, Husky, branch protection, GitHub Actions, Docker, ECS |
| 6113 | Multi-Tenancy & RBAC                | `tenantId`, `TenantGuard`, `ACPermissionGuard`, dual-auth             |
| 6114 | Claude Code AI Development Layer    | `.claude/`, GitNexus, Graphify, RTK                                   |
| 6115 | MCP Setup: GitHub, ClickUp & Lark  | GitHub MCP, ClickUp (primary PM), Lark (team comms / alternative)    |
| 6116 | Memory, Knowledge Graphs & Code Intelligence | Persistent memory system, graphify full reference, gitnexus full reference, team knowledge culture |
| 6117 | Tech Lead SDLC & Daily Workflow     | Ticket-to-production case study, code review, ADRs, onboarding       |
| 6118 | Production Hardening                | Joi env validation, typed config, Helmet, throttling, ExceptionFilter |
| 6119 | Extended Auth                       | Email service, secured tokens, password reset, 2FA TOTP               |
| 6120 | Advanced Data Patterns              | Column transformers, audit columns, running numbers, `libs/core`      |
| 6121 | Dual-App Monorepo                   | `portal-api`, `RequestPlatformInterceptor`, platform JWT claim        |
| 6122 | Media Library                       | S3 presigned uploads, magic bytes, Bull processor, CloudFront CDN     |
| 6123 | Affiliate & Referral Tree           | Materialized path, downline queries, referral stats                   |
| 6124 | Production Deployment               | ECS Fargate, RDS, ElastiCache, Secrets Manager, zero-downtime CD      |

---

## Stack

| Layer    | Technology                                                            |
| -------- | --------------------------------------------------------------------- |
| Monorepo | Nx 22                                                                 |
| Backend  | NestJS 11, Express 5, GraphQL (Apollo v5), TypeORM 1.x, CQRS          |
| Frontend | Next.js 16 (App Router), Tailwind CSS v4, Apollo Client v4, Shadcn UI |
| Database | PostgreSQL 15                                                         |
| Cache    | Redis (Alpine)                                                        |
| Auth     | Passport JWT (RS256)                                                  |
| Runtime  | Node 20, Yarn 1.x                                                     |
| Infra    | Docker Compose (local dev)                                            |

**Key ecosystem packages:**

| Package                         | Purpose                                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| `nestjs-typed-cqrs`             | Type-safe `CommandBus` / `QueryBus` — no more `any`                                     |
| `nestjs-dev-utilities`          | `AbstractEntity` base class (id, timestamps, soft-delete)                               |
| `@ptc-org/nestjs-query-core`    | `Query<T>` filter/sort/paging types                                                     |
| `@ptc-org/nestjs-query-graphql` | `@FilterableField`, `QueryArgsType`, `ConnectionType` (cursor pagination)               |
| `@ptc-org/nestjs-query-typeorm` | `TypeOrmQueryService` + `FilterQueryBuilder`                                            |
| `typeorm-naming-strategies`     | Snake-case column names automatically                                                   |
| `@jorgebodega/typeorm-seeding`  | Database seeders                                                                        |
| `@as-integrations/express5`     | Apollo Server v5 → Express 5 adapter (required — the Express 4 adapter is incompatible) |

---

## Project Structure

```
enterprise-todo/
├── apps/
│   ├── api/                    ← NestJS user API (GraphQL at :3333)
│   │   └── src/
│   │       ├── app/            ← Root module, bootstrap
│   │       ├── config/         ← Joi validation schema, typed AppConfig
│   │       ├── filters/        ← Global AllExceptionsFilter
│   │       ├── interceptors/   ← AuditInterceptor, UserContext
│   │       ├── subscribers/    ← AuditSubscriber (createdBy/updatedBy)
│   │       ├── helpers/        ← Column transformers (LowerCase, Slug, UpperCase)
│   │       ├── modules/
│   │       │   ├── auth/       ← JWT RS256, AuthJwtGuard, @CurrentUser()
│   │       │   ├── email/      ← Nodemailer service + Bull queue processor
│   │       │   ├── health/     ← Health-check resolver
│   │       │   ├── permission/ ← PermissionEntity (slug-based ACL)
│   │       │   ├── role/       ← RoleEntity (ManyToMany permissions)
│   │       │   ├── running-number/ ← Pessimistic-lock sequence service
│   │       │   ├── secured-token/  ← Single-use tokens (password reset, email verify)
│   │       │   ├── tag/        ← Tag feature (CQRS)
│   │       │   ├── todo/       ← Todo feature (CQRS, DataLoader)
│   │       │   └── user/       ← User entity, 2FA, profile
│   │       ├── shared/
│   │       │   └── guards/     ← ACPermissionGuard, @UseACGuard(), @AllowGuest()
│   │       ├── migrations/     ← TypeORM migration files
│   │       └── seeders/        ← Sample data seeders
│   ├── api-e2e/                ← API end-to-end tests
│   ├── portal-api/             ← NestJS admin portal (GraphQL at :3334)
│   │   └── src/
│   │       ├── app/            ← Portal root module, bootstrap
│   │       └── modules/
│   │           ├── portal-auth/ ← PortalJwtStrategy, PortalAuthJwtGuard
│   │           └── portal-health/
│   ├── web/                    ← Next.js frontend (:3000)
│   └── web-e2e/                ← Frontend end-to-end tests
├── libs/
│   ├── contracts/              ← Shared TypeScript types (api + portal-api + web)
│   └── core/                   ← Shared config: Joi schema, AppConfig, constants,
│                                  RequestPlatformInterceptor, CoreConfigModule
├── scripts/                    ← Build utility scripts
├── docker-compose.dev.yml
├── docker-compose.dev.arm.yml  ← Apple Silicon (linux/arm64 images)
└── .env                        ← Local environment variables (never commit)
```

---

## Prerequisites

- Node 20 (via nvm: `nvm use 20`)
- Yarn 1.x (`npm install -g yarn`)
- Docker Desktop

---

## Getting Started

**1. Install dependencies**

```bash
yarn install
```

**2. Create Docker volumes** (first time only — the compose file uses external volumes)

```bash
docker volume create db_volume
docker volume create redis_volume
```

**3. Start Docker infrastructure**

```bash
yarn docker:dev
# Starts: PostgreSQL :5432 · Redis :6379 · Adminer :8080
```

**4. Create `.env`** at the workspace root:

```bash
cp .env.example .env   # if available, otherwise use the template below
```

**5. Run database migrations**

```bash
yarn api:migration:run
```

**6. (Optional) Seed with sample data**

```bash
yarn api:seed:run
```

**7. Start the API dev server**

```bash
yarn api:dev
# API:      http://localhost:3333
# GraphQL:  http://localhost:3333/graphql
```

**8. Start the frontend dev server**

```bash
yarn web:dev
# Web: http://localhost:3000
```

**9. (Optional) Start the admin portal API**

```bash
yarn portal:dev
# Portal API:      http://localhost:3334
# Portal GraphQL:  http://localhost:3334/graphql
```

---

## Environment Variables

Create `.env` in the workspace root. All variables are required unless marked optional.

```bash
# ── App ───────────────────────────────────────────────────────
NODE_ENV=development
PROJECT_PORT=3333
PROJECT_GRAPHQL_PLAYGROUND=true
PROJECT_GRAPHQL_SUBSCRIPTIONS=false

# ── Database ──────────────────────────────────────────────────
PROJECT_DB_CONNECTION=postgres
PROJECT_DB_HOST=localhost
PROJECT_DB_PORT=5432
PROJECT_DB_USERNAME=postgres
PROJECT_DB_PASSWORD=postgres
PROJECT_DB_DATABASE=enterprise_todo
PROJECT_DB_DEBUG=false

# ── Database (Test) ───────────────────────────────────────────
PROJECT_DB_DATABASE_TEST=enterprise_todo_test

# ── Redis ─────────────────────────────────────────────────────
REDIS_BULL_HOST=localhost
REDIS_BULL_PORT=6379

# ── JWT (RS256) ───────────────────────────────────────────────
# Generate with: openssl genrsa 2048 | openssl pkcs8 -topk8 -nocrypt
# See Part 07 of the tutorial series for full key generation steps
JWT_EXPIRATION_TIME=1d
JWT_REFRESH_EXPIRATION_TIME=7d
JWT_PRIVATE_KEY=
JWT_PUBLIC_KEY=
JWT_REFRESH_PRIVATE_KEY=
JWT_REFRESH_PUBLIC_KEY=

# ── Email (SMTP) ──────────────────────────────────────────────
# Local dev: use Mailpit (docker-compose adds it on :1025 / UI :8025)
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USER=
SMTP_PASS=

# ── Frontend ──────────────────────────────────────────────────
WEB_URL=http://localhost:3000

# ── Two-Factor Auth ───────────────────────────────────────────
# Dev/test bypass only — NEVER set in staging or production
TWOFA_BYPASS_PASSWORD=

# ── Media Library (S3 + CloudFront) ──────────────────────────
# Local dev: use LocalStack or point directly at S3
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
S3_BUCKET=enterprise-todo-media-dev
CDN_BASE_URL=https://d1abc.cloudfront.net

# ── Portal API ────────────────────────────────────────────────
PROJECT_PORTAL_PORT=3334

# ── Admin JWT (RS256) — portal-api only, separate key pair ────
# Generate: openssl genrsa 4096 | openssl pkcs8 -topk8 -nocrypt
# NEVER share with the user API key pair
ADMIN_JWT_PRIVATE_KEY=
ADMIN_JWT_PUBLIC_KEY=
ADMIN_JWT_EXPIRATION_TIME=8h
```

---

## Scripts

| Command                              | What it does                                   |
| ------------------------------------ | ---------------------------------------------- |
| `yarn api:dev`                       | Start user API in watch mode (:3333)           |
| `yarn api:build`                     | Production build of the user API               |
| `yarn api:test`                      | Run user API unit tests                        |
| `yarn api:e2e`                       | Run user API end-to-end tests                  |
| `yarn portal:dev`                    | Start admin portal API in watch mode (:3334)   |
| `yarn portal:build`                  | Production build of the portal API             |
| `yarn portal:test`                   | Run portal API unit tests                      |
| `yarn web:dev`                       | Start Next.js frontend in watch mode (:3000)   |
| `yarn codegen`                       | Generate TypeScript types from GraphQL schema  |
| `yarn format`                        | Run Prettier across all files                  |
| `yarn docker:dev`                    | Start Postgres, Redis, Adminer (Intel/Linux)   |
| `yarn docker:dev:arm`                | Start Postgres, Redis, Adminer (Apple Silicon) |
| `yarn docker:stop`                   | Stop all containers                            |
| `yarn api:migration:generate <path>` | Generate a migration from entity diff          |
| `yarn api:migration:run`             | Apply all pending migrations                   |
| `yarn api:migration:revert`          | Revert the last applied migration              |
| `yarn api:seed:run`                  | Truncate tables and re-seed with sample data   |
| `yarn lint`                          | Lint all projects                              |
| `yarn lint:fix`                      | Lint and auto-fix all projects                 |
| `yarn dep`                           | Open Nx project dependency graph               |
| `yarn cz`                            | Commit using Commitizen (conventional commits) |

---

## Database

Adminer (web UI) is available at `http://localhost:8080` once Docker is running.

| Field    | Value             |
| -------- | ----------------- |
| System   | PostgreSQL        |
| Server   | `postgres`        |
| Username | `postgres`        |
| Password | `postgres`        |
| Database | `enterprise_todo` |

Migrations are managed with TypeORM — `synchronize` is always `false` in all environments.

---

## Architecture

### Dual-App Monorepo

```
Internet
   ├─ :3333  apps/api         User-facing API  (AuthJwtStrategy — user RS256 key pair)
   ├─ :3334  apps/portal-api  Admin portal API (PortalJwtStrategy — admin RS256 key pair)
   └─ :3000  apps/web         Next.js frontend

libs/core       → Joi schema, typed AppConfig, constants, RequestPlatformInterceptor
libs/contracts  → Shared TypeScript types across all apps
```

`RequestPlatformInterceptor` enforces that a user JWT cannot be used on the portal API and vice versa — structural enforcement at the interceptor layer, not just guard logic.

### 9-Step CQRS Pattern

Every feature module follows:

```
Entity → Constants → DTOs → CQRS Inputs → CQRS Handlers →
CQRS Index → Service → Resolver → Module
```

### Request Lifecycle (user API)

```
GraphQL Request
    │
    ▼
AuthJwtGuard              verifies RS256 JWT signature, rejects expired/invalid
    │
    ▼
RequestPlatformInterceptor  rejects portal tokens (platform: 'portal') with 403
    │
    ▼
TenantGuard               extracts tenantId from JWT → TenantContext (REQUEST scope)
    │
    ▼
ACPermissionGuard         validates user.status === ACTIVE + checks permission slugs
    │
    ▼
Resolver method           @CurrentUser() injects user, CommandBus dispatches
    │
    ▼
Handler  (one line: calls service method)
    │
    ▼
Service  extends TypeOrmQueryService<Entity>
    │
    ▼
@Authorize decorator      nestjs-query merges tenantId filter at query builder level
    │
    ▼
PostgreSQL                WHERE tenant_id = $1 AND ... (tenant isolation guaranteed)
```

### Key Rules

- **Handlers are always one-liners.** All business logic lives in the service.
- **`CqrsModule.forRoot()`** is called only in `AppModule`. Feature modules do not import `CqrsModule`.
- **Service methods are entity-qualified** (`findOneTodo`, `countTodo`) to avoid clashing with `TypeOrmQueryService`'s interface.
- **`ACPermissionGuard` + `@UseACGuard('MODULE', ['slug'])`** on all protected resolvers — not `RolesGuard`. Permission slugs are seeded into `PermissionEntity`.
- **`PortalJwtStrategy`** lives only in `apps/portal-api` — never register it in `apps/api`.

---

## Notable Gotchas

**`reflect-metadata` must be `^0.2.2`**

`typeorm` and `nestjs-dev-utilities` bundle their own `reflect-metadata ^0.2.x`. If the root dependency is `^0.1.x`, two versions coexist — each with its own `WeakMap` — and NestJS's DI metadata becomes invisible after TypeORM loads. Symptom: `UnknownDependenciesException: Nest can't resolve dependencies of the ConfigService`.

Fix: ensure `package.json` has `"reflect-metadata": "^0.2.2"` and run `yarn install` to force deduplication.

**TypeORM entities must be explicitly listed — no globs**

This project uses Webpack. At runtime everything is compiled into `main.js` — there are no separate `.entity.js` files. Glob patterns like `__dirname + '/**/*.entity{.ts,.js}'` find nothing. Every entity must be imported and listed explicitly in `AppModule`'s `entities[]`.

**All related entities must be registered, even without a feature module**

`TodoEntity` has `@ManyToOne(() => UserEntity)`. Even if there is no `UserModule` yet, `UserEntity` must appear in `AppModule`'s `entities[]`. Omitting it causes `EntityMetadataNotFoundError` at startup.

**Apollo Sandbox: name mutations that return `Boolean`**

Anonymous mutations returning a scalar (e.g. `mutation { deleteTodo(id: 1) }`) trigger a spurious "syntax error: invalid number" in Apollo Studio Sandbox. The API itself is correct — confirm with curl. Fix: name the operation: `mutation DeleteTodo { deleteTodo(id: 1) }`.

**Apollo Client v4: all React APIs moved to `@apollo/client/react`**

Turbopack resolves `@apollo/client` to its core package which exports no React APIs. Import all React APIs from `@apollo/client/react`: `ApolloProvider`, `useQuery`, `useMutation`, `useSubscription`. Core utilities (`ApolloClient`, `InMemoryCache`, `createHttpLink`, `from`, `gql`) stay in `@apollo/client`.

**Tailwind CSS v4: no `tailwind.config.js`, new PostCSS plugin**

This project uses Tailwind v4 (required by shadcn v4 `base-nova` style). Key differences from v3: use `@import "tailwindcss"` in CSS (not `@tailwind base/components/utilities`), use `@tailwindcss/postcss` in `postcss.config.js` (not `tailwindcss`), and no `tailwind.config.js` (v4 auto-detects content).

**`@nx/next` uses `dev` target, not `serve`**

Running `npx nx serve web` fails — the `@nx/next` plugin registers the target as `dev`. Use `yarn web:dev` or `npx nx dev web`.

**Helmet blocks GraphQL sandbox in dev**

`app.use(helmet())` blocks Apollo Sandbox's inline scripts via CSP. Fix: disable CSP in non-production environments:

```ts
app.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false }));
```

**`@SkipThrottle()` on health and internal resolvers**

`ThrottlerGuard` applied globally will rate-limit load balancer health checks in production. Add `@SkipThrottle()` to `HealthResolver` and any other internal-only resolver that runs on every heartbeat.
