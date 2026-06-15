// apps/api/src/modules/todo/cqrs/index.ts
import {
  CountTodoQueryHandler,
  CreateOneTodoCommandHandler,
  DeleteOneTodoCommandHandler,
  FindManyTodoQueryHandler,
  FindOneTodoQueryHandler,
  UpdateOneTodoCommandHandler,
} from './todo.cqrs.handler';

// Arrays spread into module providers
export const TodoQueryHandlers = [
  FindOneTodoQueryHandler,
  FindManyTodoQueryHandler,
  CountTodoQueryHandler,
];

export const TodoCommandHandlers = [
  CreateOneTodoCommandHandler,
  UpdateOneTodoCommandHandler,
  DeleteOneTodoCommandHandler,
];

export const TodoEventHandlers = [];

// Re-export inputs so other files can import from './cqrs' (one import path)
export * from './todo.cqrs.input';
