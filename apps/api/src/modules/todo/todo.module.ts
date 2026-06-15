// apps/api/src/modules/todo/todo.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';

import { TodoEntity } from './todo.entity';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import {
  TodoCommandHandlers,
  TodoEventHandlers,
  TodoQueryHandlers,
} from './cqrs';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TodoEntity]), // Repository<TodoEntity> injectable in this module
    NestjsQueryTypeOrmModule.forFeature([TodoEntity]), // QueryService<TodoEntity> injectable in this module
  ],
  providers: [
    TodoResolver,
    TodoService,
    ...TodoQueryHandlers, // spreads all query handlers
    ...TodoCommandHandlers, // spreads all command handlers
    ...TodoEventHandlers, // spreads all event handlers (empty for now)
  ],
  exports: [TodoService], // export if other modules need to call TodoService
})
export class TodoModule {}
