# enterprise-todo

An enterprise-grade todo application built as a learning project — demonstrating how to migrate from Meteor to a modern NestJS + Next.js monorepo stack.

## Stack

| Layer     | Technology                                      |
| --------- | ----------------------------------------------- |
| Monorepo  | Nx 22                                           |
| Backend   | NestJS 11, GraphQL (Apollo v5), TypeORM, CQRS   |
| Frontend  | Next.js 16 (App Router), Tailwind CSS           |
| Database  | PostgreSQL 15                                   |
| Cache     | Redis                                           |
| Auth      | Passport JWT (RS256)                            |
| Runtime   | Node 20, Yarn 1.x                               |
| Infra     | Docker Compose (local dev)                      |

## Project Structure

```
enterprise-todo/
├── apps/
│   ├── api/          ← NestJS backend (GraphQL at :3333)
│   ├── api-e2e/      ← API end-to-end tests
│   ├── web/          ← Next.js frontend (:4200)
│   └── web-e2e/      ← Frontend end-to-end tests
├── libs/
│   └── contracts/    ← Shared TypeScript types (used by api + web)
├── docker-compose.dev.yml
└── .env              ← Local environment variables (never commit)
```

## Prerequisites

- Node 20 (via nvm)
- Yarn 1.x (`npm install -g yarn`)
- Docker Desktop

## Getting Started

**1. Install dependencies**

```bash
yarn install
```

**2. Start Docker infrastructure**

```bash
yarn docker:dev
# Starts: PostgreSQL :5432 · Redis :6379 · Adminer :8080
```

**3. Create `.env`** at the workspace root — copy the template from the tutorial or see `apps/api/src/app/app.module.ts` for the required variable names.

**4. Start the API dev server**

```bash
yarn api:dev
# API:      http://localhost:3333
# GraphQL:  http://localhost:3333/graphql
```

## Scripts

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `yarn api:dev`    | Start NestJS in watch mode                |
| `yarn api:build`  | Production build of the API               |
| `yarn api:test`   | Run API unit tests                        |
| `yarn api:e2e`    | Run API end-to-end tests                  |
| `yarn docker:dev` | Start Postgres, Redis, Adminer containers |
| `yarn docker:stop`| Stop all containers                       |
| `yarn lint`       | Lint all projects                         |
| `yarn lint:fix`   | Lint and auto-fix all projects            |
| `yarn dep`        | Open Nx project dependency graph          |

## Database

Adminer (web UI) is available at `http://localhost:8080` once Docker is running.

| Field    | Value              |
| -------- | ------------------ |
| System   | PostgreSQL         |
| Server   | `postgres`         |
| Username | `postgres`         |
| Password | `postgres`         |
| Database | `enterprise_todo`  |

Migrations are managed with TypeORM — `synchronize` is always `false`.
