# enterprise-todo

An enterprise-grade todo application built as a learning project — demonstrating how to migrate from Meteor to a modern NestJS + Next.js monorepo stack.

## Stack

| Layer     | Technology                                                        |
| --------- | ----------------------------------------------------------------- |
| Monorepo  | Nx 22                                                             |
| Backend   | NestJS 11, Express 5, GraphQL (Apollo v5), TypeORM 1.x, CQRS     |
| Frontend  | Next.js 16 (App Router), Tailwind CSS v4, Apollo Client v4, Shadcn UI |
| Database  | PostgreSQL 15                                                     |
| Cache     | Redis (Alpine)                                                    |
| Auth      | Passport JWT (RS256)                                              |
| Runtime   | Node 20, Yarn 1.x                                                 |
| Infra     | Docker Compose (local dev)                                        |

**Key ecosystem packages:**

| Package                         | Purpose                                              |
| ------------------------------- | ---------------------------------------------------- |
| `nestjs-typed-cqrs`             | Type-safe `CommandBus` / `QueryBus` — no more `any` |
| `nestjs-dev-utilities`          | `AbstractEntity` base class (id, timestamps, soft-delete) |
| `@ptc-org/nestjs-query-core`    | `Query<T>` filter/sort/paging types                 |
| `@ptc-org/nestjs-query-graphql` | `@FilterableField`, `QueryArgsType`, `ConnectionType` (cursor pagination) |
| `@ptc-org/nestjs-query-typeorm` | `TypeOrmQueryService` + `FilterQueryBuilder`        |
| `typeorm-naming-strategies`     | Snake-case column names automatically               |
| `@jorgebodega/typeorm-seeding`  | Database seeders                                     |
| `@as-integrations/express5`     | Apollo Server v5 → Express 5 adapter (required — the Express 4 adapter is incompatible) |

---

## Project Structure

```
enterprise-todo/
├── apps/
│   ├── api/                    ← NestJS backend (GraphQL at :3333)
│   │   └── src/
│   │       ├── app/            ← Root module, bootstrap
│   │       ├── modules/
│   │       │   ├── health/     ← Health-check resolver
│   │       │   ├── todo/       ← Todo feature (CQRS)
│   │       │   └── user/       ← User entity (auth in Part 07)
│   │       ├── migrations/     ← TypeORM migration files
│   │       └── seeders/        ← Sample data seeders
│   ├── api-e2e/                ← API end-to-end tests
│   ├── web/                    ← Next.js frontend (:3000)
│   └── web-e2e/                ← Frontend end-to-end tests
├── libs/
│   └── contracts/              ← Shared TypeScript types (api + web)
├── scripts/                    ← Build utility scripts
├── docker-compose.dev.yml
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
```

---

## Scripts

| Command                              | What it does                                    |
| ------------------------------------ | ----------------------------------------------- |
| `yarn api:dev`                       | Start NestJS in watch mode                      |
| `yarn api:build`                     | Production build of the API                     |
| `yarn api:test`                      | Run API unit tests                              |
| `yarn api:e2e`                       | Run API end-to-end tests                        |
| `yarn web:dev`                       | Start Next.js frontend in watch mode            |
| `yarn codegen`                       | Generate TypeScript types from GraphQL schema   |
| `yarn format`                        | Run Prettier across all files                   |
| `yarn docker:dev`                    | Start Postgres, Redis, Adminer (Intel/Linux)    |
| `yarn docker:dev:arm`                | Start Postgres, Redis, Adminer (Apple Silicon)  |
| `yarn docker:stop`                   | Stop all containers                             |
| `yarn api:migration:generate <path>` | Generate a new migration from entity diff       |
| `yarn api:migration:run`             | Apply all pending migrations                    |
| `yarn api:migration:revert`          | Revert the last applied migration               |
| `yarn api:seed:run`                  | Truncate tables and re-seed with sample data    |
| `yarn lint`                          | Lint all projects                               |
| `yarn lint:fix`                      | Lint and auto-fix all projects                  |
| `yarn dep`                           | Open Nx project dependency graph                |
| `yarn cz`                            | Commit using Commitizen (conventional commits)  |

---

## Database

Adminer (web UI) is available at `http://localhost:8080` once Docker is running.

| Field    | Value              |
| -------- | ------------------ |
| System   | PostgreSQL         |
| Server   | `postgres`         |
| Username | `postgres`         |
| Password | `postgres`         |
| Database | `enterprise_todo`  |

Migrations are managed with TypeORM — `synchronize` is always `false` in all environments.

---

## Architecture

Every feature module follows the **9-step CQRS pattern**:

```
Entity → Constants → DTOs → CQRS Inputs → CQRS Handlers →
CQRS Index → Service → Resolver → Module
```

The service layer:

```
GraphQL Resolver
    │  dispatches via CommandBus / QueryBus
    ▼
Handler  (one line: calls service method)
    │
    ▼
Service  extends TypeOrmQueryService<Entity>
    │  uses this.filterQueryBuilder / this.repo
    ▼
PostgreSQL
```

- **Handlers are always one-liners.** All business logic lives in the service.
- **`CqrsModule.forRoot()`** is called only in `AppModule`. Feature modules do not import `CqrsModule` — the buses are global.
- **Service methods are entity-qualified** (`findOneTodo`, `countTodo`, etc.) to avoid clashing with `TypeOrmQueryService`'s own interface (`count`, `createOne`, etc.).

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
