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
- Column transformers enforce data invariants at the entity layer (e.g. `LowerCaseTransformer` on `email`, `SlugTransformer` on `slug`) — never rely on callers to normalize input before saving.
- `AuditSubscriber` must self-register via `this.dataSource.subscribers.push(this)` in the constructor — the `@EventSubscriber()` decorator alone does not register the subscriber under NestJS DI.
- Shared config (Joi schema, typed config mapper, queue name constants) lives in `libs/core/` — not inline in `apps/api/`. Use `libs/core` when the repo has or will have more than one NestJS app.
- Each NestJS app in the monorepo (`apps/api`, `apps/portal-api`) has its own `AppModule` and `main.ts`. They share `libs/core` (config) and `libs/contracts` (types) but do NOT share auth strategies — `AuthJwtStrategy` only exists in `apps/api`; `PortalJwtStrategy` only exists in `apps/portal-api`.
- Use `ACPermissionGuard` with `@UseACGuard('MODULE', ['slug'])` for all protected resolvers — not `RolesGuard`. Permission slugs are kebab-case (e.g. `create-todo`, `delete-user`), seeded into `PermissionEntity`, and assigned to roles via `RoleEntity`.
