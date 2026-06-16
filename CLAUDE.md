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
**Stack:** Nx 22, NestJS 11, GraphQL (Apollo v5), TypeORM 1.x, PostgreSQL 15, Redis, Passport JWT RS256, Next.js 16 (App Router), Tailwind CSS v4, Shadcn UI (base-nova), Apollo Client v4, Node 20, Yarn 1.x
**Key packages:** `nestjs-typed-cqrs` (type-safe buses), `nestjs-dev-utilities` (AbstractEntity), `@ptc-org/nestjs-query-typeorm` (FilterQueryBuilder), `typeorm-naming-strategies` (snake_case), `@jorgebodega/typeorm-seeding`, `@apollo/client` v4 (frontend GraphQL), `@tailwindcss/postcss` (Tailwind v4 PostCSS plugin)

## Structure

```
apps/api/         ← NestJS backend (GraphQL :3333)
  src/modules/    ← Feature modules (todo, user, health)
  src/migrations/ ← TypeORM migrations
  src/seeders/
apps/web/         ← Next.js frontend (:3000)
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

**Git:** Feature branches → squash merge to main. Conventional commits via `yarn cz`.

## Gotchas

**`reflect-metadata` must be `^0.2.2`** — `typeorm` and `nestjs-dev-utilities` bundle `^0.2.x`. If root dep is `^0.1.x`, two `WeakMap` instances coexist and DI metadata breaks. Symptom: `UnknownDependenciesException: Nest can't resolve dependencies of ConfigService`. Fix: set `"reflect-metadata": "^0.2.2"` in `package.json` and re-run `yarn install`.

**No glob entity patterns** — Project uses Webpack; at runtime everything is `main.js`, no separate `.entity.js` files. Globs like `**/*.entity{.ts,.js}` find nothing. Every entity must be explicitly imported and listed in `AppModule`'s `entities[]`.

**All related entities must be registered** — If `TodoEntity` has `@ManyToOne(() => UserEntity)`, then `UserEntity` must be in `AppModule`'s `entities[]` even if there's no `UserModule` yet. Omitting causes `EntityMetadataNotFoundError` at startup.

**Tailwind CSS v4 — no `tailwind.config.js`, new PostCSS plugin** — shadcn v4 (`base-nova` style) requires Tailwind v4. Use `@import "tailwindcss"` in CSS (not `@tailwind base/components/utilities`). PostCSS uses `@tailwindcss/postcss` (not `tailwindcss`). No `tailwind.config.js` — v4 auto-detects content.

**Apollo Client v4 — all React APIs moved** — Turbopack resolves `@apollo/client` to its core package which has no React exports. Import all React APIs from `@apollo/client/react`: `ApolloProvider`, `useQuery`, `useMutation`, `useSubscription`. Core utilities (`ApolloClient`, `InMemoryCache`, `createHttpLink`, `from`, `gql`) stay in `@apollo/client`.

**`@nx/next` uses `dev` target, not `serve`** — `npx nx serve web` fails. Use `yarn web:dev` (`nx dev web`). The `@nx/next` plugin registers `devTargetName: "dev"` in `nx.json`.

## AI Tooling

Three tools are configured for token-efficient AI-assisted development on this project:

### RTK — Token Optimizer
Global proxy that compresses Claude Code tool output (60–90% token savings). Configured at `~/.claude/` — no project setup needed.
```bash
rtk gain             # show token savings analytics
rtk discover         # scan history for missed optimization opportunities
```

### GitNexus — Code Knowledge Graph
Indexes the codebase into a graph; exposed as MCP tools (`impact`, `query`, `context`, `detect_changes`, `rename`). Config: `.claude/mcp.json`.
```bash
node .gitnexus/run.cjs analyze     # reindex after major changes
node .gitnexus/run.cjs status      # check index freshness
```
First time / after `git clean`: `gitnexus analyze` (requires `gitnexus@1.6.8-rc.38+` on Intel Mac — earlier versions lack `darwin-x64` prebuilt).

### Graphify — Knowledge Graph Visualization
Builds a queryable graph of code + docs with community detection. Output lives in `graphify-out/` (gitignored).
```bash
graphify update .    # incremental reindex after code changes (no API cost)
graphify .           # full rebuild
graphify query "<question>"          # scoped subgraph answer
graphify path "<A>" "<B>"            # shortest path between two concepts
graphify explain "<concept>"         # focused explanation
```

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **enterprise-todo** (243 symbols, 280 relationships, 0 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "main"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/enterprise-todo/context` | Codebase overview, check index freshness |
| `gitnexus://repo/enterprise-todo/clusters` | All functional areas |
| `gitnexus://repo/enterprise-todo/processes` | All execution flows |
| `gitnexus://repo/enterprise-todo/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
