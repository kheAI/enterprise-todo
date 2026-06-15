// apps/api/src/modules/todo/todo.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forFeature([TodoEntity]), // Repository<TodoEntity> injectable in this module
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
