# Performance Rules

- Use `DataLoader` (with `Scope.REQUEST`) for ALL N+1 relation queries in GraphQL resolvers.
- DataLoaders MUST be `Scope.REQUEST` — a singleton loader leaks data across requests.
- Enable `enableLookAhead` in `NestjsQueryTypeOrmModule` for automatic join optimisation.
- Use Bull queues for any operation that can be async (email, notifications, AI evaluation, heavy computation).
- Add `@Index` to every column used in a `WHERE` clause.
- Always use cursor-based (Relay) pagination — `offset` paging is available but slower on large tables.
- Use `graphql-depth-limit` (max 7) and query complexity guard (max 50) in production.
- Redis-backed `RedisPubSub` for subscriptions — never in-process PubSub (breaks multi-instance).
- Abstract external service calls (S3, TTS, LLM) behind interfaces — never embed SDK calls in business logic.
