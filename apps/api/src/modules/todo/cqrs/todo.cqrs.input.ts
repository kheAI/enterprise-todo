import { Query } from '@ptc-org/nestjs-query-core';
import {
  AbstractCqrsCommandInput,
  AbstractCqrsQueryInput,
  RecordMutateOptions,
  RecordQueryWithJoinOptions,
} from 'nestjs-typed-cqrs';

import { CreateTodoInput, UpdateTodoInput } from '../dto/todo.input';
import { TodoEntity } from '../todo.entity';

/**
 * QUERIES (read operations)
 */

// Find a single todo by filter (e.g., by id)
export class FindOneTodoQuery extends AbstractCqrsQueryInput<
  TodoEntity,
  undefined,
  RecordQueryWithJoinOptions,
  TodoEntity // ← returns one entity (or null)
> {}

// Find many todos by filter (e.g., all todos for a user)
export class FindManyTodoQuery extends AbstractCqrsQueryInput<
  TodoEntity,
  undefined,
  RecordQueryWithJoinOptions,
  TodoEntity[] // ← returns an array
> {}

// Count todos matching a filter
export class CountTodoQuery extends AbstractCqrsQueryInput<
  TodoEntity,
  Query<TodoEntity>['filter'],
  undefined,
  number // ← returns a count
> {}

/**
 * COMMANDS (write operations)
 */

// Create one todo
export class CreateOneTodoCommand extends AbstractCqrsCommandInput<
  TodoEntity,
  CreateTodoInput & { userId: number } // ← input type (userId added server-side)
> {}

// Update one todo
export class UpdateOneTodoCommand extends AbstractCqrsCommandInput<
  TodoEntity,
  UpdateTodoInput,
  true, // ← isUpdateOne = true
  RecordMutateOptions,
  { before: TodoEntity; updated: TodoEntity } // ← returns before and after
> {}

// Delete one todo
export class DeleteOneTodoCommand extends AbstractCqrsCommandInput<
  TodoEntity,
  number // ← input is just the id
> {}
