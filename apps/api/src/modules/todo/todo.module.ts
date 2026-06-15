// In apps/api/src/modules/todo/todo.module.ts:
[
  TodoResolver,
  TodoService,
  ...TodoQueryHandlers, // spreads all query handlers
  ...TodoCommandHandlers, // spreads all command handlers
];
