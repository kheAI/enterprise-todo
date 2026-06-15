# Architecture Rules

- Every module MUST follow the 9-step pattern: Entity → DTO → CQRS Input → Handler → Service → Resolver → Module → Register → Migrate.
- Handlers are thin. No business logic in handlers — it belongs in services.
- Resolvers do not touch repositories directly. Always go through CQRS bus.
- Never import across app boundaries (`apps/backend` cannot import from `apps/avatar-service`).
- Shared code goes in `libs/core` (constants/enums) or `libs/ai-providers` (AI abstractions).
- Every domain entity in doc-backend.md scope MUST carry `tenantId` FK and filter by it in every CQRS handler.
- Use `TypedQuery<T>` and `TypedCommand<T>` from `nestjs-typed-cqrs` — no untyped buses.
- Use `AbstractEntity` and `AbstractDto` from `nestjs-dev-utilities` as base classes.
- All paginated lists use Relay cursor pagination (`Connection` types) — never raw arrays.
- Use `@IsUndefined()` (not `@IsOptional()`) for partial update input fields.
