# Architecture Rules

- Every module MUST follow the 9-step pattern: Entity → Constants → DTOs → CQRS Inputs → CQRS Handlers → CQRS Index → Service → Resolver → Module → Register → Migrate.
- Handlers are thin one-liners. No business logic in handlers — it belongs in services.
- Resolvers do not touch repositories directly. Always go through CQRS bus.
- `CqrsModule.forRoot()` is called only in `AppModule`. Feature modules do NOT import `CqrsModule` — buses are global.
- Service methods must be entity-qualified (`findOneTodo`, `countTodo`) to avoid clashing with `TypeOrmQueryService`'s interface.
- Never import across app boundaries (`apps/api` cannot import from other apps).
- Shared types live in `libs/contracts/`. Future: `libs/core` (constants/enums), `libs/ai-providers` (AI abstractions).
- Every domain entity MUST carry `tenantId` FK and filter by it in every CQRS handler.
- Use `TypedQuery<T>` and `TypedCommand<T>` from `nestjs-typed-cqrs` — no untyped buses.
- Use `AbstractEntity` and `AbstractDto` from `nestjs-dev-utilities` as base classes.
- All paginated lists use Relay cursor pagination (`Connection` types) — never raw arrays.
- Use `@IsUndefined()` (not `@IsOptional()`) for partial update input fields.
- `@ResolveField` parent parameter must use the **DTO type**, not the entity (`@Parent() todo: TodoDto`, not `TodoEntity`) — the resolver receives the already-mapped DTO, not the raw ORM object.
