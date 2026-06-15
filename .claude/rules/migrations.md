# Migration Rules

- Every entity change MUST have a corresponding migration. Never use `synchronize: true` in production.
- Always use `migration:generate` (auto-diff from entity) for entity changes — not `migration:create` (manual).
- Always review generated SQL before running. The auto-generator can produce incorrect DROP/ALTER statements.
- Migration filenames are auto-timestamped — never rename them.
- Always test `migration:run` AND `migration:revert` locally before pushing.
- `AbstractEntity` provides `created_at` / `updated_at` as snake_case — hardcoded, independent of `SnakeNamingStrategy`.
- Seeders run after migrations. Always run `0-reset.seeder.ts` first to avoid duplicate key conflicts on re-seeding.
- Production migrations run as a one-off ECS task before traffic is routed to the new container.
