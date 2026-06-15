// apps/api/src/modules/todo/cqrs/todo.cqrs.handler.ts
import {
  CommandHandler,
  IInferredCommandHandler,
  IInferredQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';
import { CommandResult, QueryResult } from '@nestjs-architects/typed-cqrs';
import { TodoService } from '../todo.service';
import {
  CountTodoQuery,
  CreateOneTodoCommand,
  DeleteOneTodoCommand,
  FindManyTodoQuery,
  FindOneTodoQuery,
  UpdateOneTodoCommand,
} from './todo.cqrs.input';

// ── Query Handlers ──────────────────────────────────────────

@QueryHandler(FindOneTodoQuery)
export class FindOneTodoQueryHandler
  implements IInferredQueryHandler<FindOneTodoQuery>
{
  constructor(readonly service: TodoService) {}
  async execute(
    query: FindOneTodoQuery,
  ): Promise<QueryResult<FindOneTodoQuery>> {
    return this.service.findOne(query.args); // one line — delegate to service
  }
}

@QueryHandler(FindManyTodoQuery)
export class FindManyTodoQueryHandler
  implements IInferredQueryHandler<FindManyTodoQuery>
{
  constructor(readonly service: TodoService) {}
  async execute(
    query: FindManyTodoQuery,
  ): Promise<QueryResult<FindManyTodoQuery>> {
    return this.service.findMany(query.args);
  }
}

@QueryHandler(CountTodoQuery)
export class CountTodoQueryHandler
  implements IInferredQueryHandler<CountTodoQuery>
{
  constructor(readonly service: TodoService) {}
  async execute(query: CountTodoQuery): Promise<QueryResult<CountTodoQuery>> {
    return this.service.count(query.args);
  }
}

// ── Command Handlers ────────────────────────────────────────

@CommandHandler(CreateOneTodoCommand)
export class CreateOneTodoCommandHandler
  implements IInferredCommandHandler<CreateOneTodoCommand>
{
  constructor(readonly service: TodoService) {}
  async execute(
    command: CreateOneTodoCommand,
  ): Promise<CommandResult<CreateOneTodoCommand>> {
    return this.service.createOne(command.args);
  }
}

@CommandHandler(UpdateOneTodoCommand)
export class UpdateOneTodoCommandHandler
  implements IInferredCommandHandler<UpdateOneTodoCommand>
{
  constructor(readonly service: TodoService) {}
  async execute(
    command: UpdateOneTodoCommand,
  ): Promise<CommandResult<UpdateOneTodoCommand>> {
    return this.service.updateOne(command.args);
  }
}

@CommandHandler(DeleteOneTodoCommand)
export class DeleteOneTodoCommandHandler
  implements IInferredCommandHandler<DeleteOneTodoCommand>
{
  constructor(readonly service: TodoService) {}
  async execute(
    command: DeleteOneTodoCommand,
  ): Promise<CommandResult<DeleteOneTodoCommand>> {
    return this.service.deleteOne(command.args);
  }
}
