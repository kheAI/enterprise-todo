# CLAUDE.md

## Caveman Mode (Token Optimization)

Communicate efficiently. Omit pleasantries, filler words, and narrative summaries. Use terse, imperative directives.

## Rule Files

@.claude/rules/architecture.md
@.claude/rules/security.md
@.claude/rules/performance.md
@.claude/rules/migrations.md

## Project Overview

**What it is:** Enterprise-grade todo app — learning project migrating Meteor → NestJS + Next.js monorepo
**Stack:** Nx 22, NestJS 11, GraphQL (Apollo v5), TypeORM 1.x, PostgreSQL 15, Redis, Passport JWT RS256, Next.js 16 (App Router), Tailwind CSS, Node 20, Yarn 1.x
**Key packages:** `nestjs-typed-cqrs` (type-safe buses), `nestjs-dev-utilities` (AbstractEntity), `@ptc-org/nestjs-query-typeorm` (FilterQueryBuilder), `typeorm-naming-strategies` (snake_case), `@jorgebodega/typeorm-seeding`

## Structure

```
apps/api/         ← NestJS backend (GraphQL :3333)
  src/modules/    ← Feature modules (todo, user, health)
  src/migrations/ ← TypeORM migrations
  src/seeders/
apps/web/         ← Next.js frontend (:4200)
libs/contracts/   ← Shared TS types (api + web)
```

## Commands

```bash
yarn api:dev                          # Start NestJS watch mode
yarn api:build                        # Production build
yarn api:test                         # Unit tests
yarn api:e2e                          # End-to-end tests
yarn docker:dev                       # Start Postgres :5432, Redis :6379, Adminer :8080
yarn docker:stop                      # Stop containers
yarn api:migration:generate <path>    # Generate migration from entity diff
yarn api:migration:run                # Apply pending migrations
yarn api:migration:revert             # Revert last migration
yarn api:seed:run                     # Truncate + reseed
yarn lint                             # Lint all
yarn lint:fix                         # Lint + autofix
```

## Architecture

Nx monorepo. `apps/api` is the NestJS GraphQL API. `libs/contracts` has shared types.

**CQRS pattern (9 steps per feature module):**
Entity → Constants → DTOs → CQRS Inputs → CQRS Handlers → CQRS Index → Service → Resolver → Module

**Service layer flow:**
```
GraphQL Resolver
    │  dispatches via CommandBus / QueryBus
    ▼
Handler  (always one-liner — calls one service method, nothing else)
    ▼
Service  extends TypeOrmQueryService<Entity>
    ▼
PostgreSQL
```

**Rules:**
- Handlers are one-liners. All business logic in the service.
- `CqrsModule.forRoot()` only in `AppModule`. Feature modules do NOT import `CqrsModule` — buses are global.
- Service methods are entity-qualified (`findOneTodo`, `countTodo`) to avoid clashing with `TypeOrmQueryService` interface.
- `synchronize` is always `false`. Use migrations.
- Feature branches → squash merge to main. Conventional commits via `yarn cz`.

## Gotchas

**`reflect-metadata` must be `^0.2.2`** — `typeorm` and `nestjs-dev-utilities` bundle `^0.2.x`. If root dep is `^0.1.x`, two `WeakMap` instances coexist and DI metadata breaks. Symptom: `UnknownDependenciesException: Nest can't resolve dependencies of ConfigService`. Fix: set `"reflect-metadata": "^0.2.2"` in `package.json` and re-run `yarn install`.

**No glob entity patterns** — Project uses Webpack; at runtime everything is `main.js`, no separate `.entity.js` files. Globs like `**/*.entity{.ts,.js}` find nothing. Every entity must be explicitly imported and listed in `AppModule`'s `entities[]`.

**All related entities must be registered** — If `TodoEntity` has `@ManyToOne(() => UserEntity)`, then `UserEntity` must be in `AppModule`'s `entities[]` even if there's no `UserModule` yet. Omitting causes `EntityMetadataNotFoundError` at startup.
