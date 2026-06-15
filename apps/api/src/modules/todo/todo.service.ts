// apps/api/src/modules/todo/todo.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueryService, QueryService } from '@ptc-org/nestjs-query-core';
import { FilterQueryBuilder } from '@ptc-org/nestjs-query-typeorm/src/query';
import { CqrsCommandFunc, CqrsQueryFunc } from 'nestjs-typed-cqrs';
import { Repository } from 'typeorm';

import {
  CountTodoQuery,
  CreateOneTodoCommand,
  DeleteOneTodoCommand,
  FindManyTodoQuery,
  FindOneTodoQuery,
  UpdateOneTodoCommand,
} from './cqrs/todo.cqrs.input';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TodoService {
  private readonly filterQueryBuilder: FilterQueryBuilder<TodoEntity>;

  constructor(
    @InjectRepository(TodoEntity)
    private readonly repo: Repository<TodoEntity>,
    @InjectQueryService(TodoEntity)
    private readonly queryService: QueryService<TodoEntity>,
  ) {
    this.filterQueryBuilder = new FilterQueryBuilder<TodoEntity>(this.repo);
  }

  // Find one record
  findOne: CqrsQueryFunc<FindOneTodoQuery, FindOneTodoQuery['args']> = async ({
    query,
    options,
  }) => {
    const nullable = options?.nullable ?? true;

    try {
      const builder = this.filterQueryBuilder.select(query);
      const result = await builder.getOne();

      if (!nullable && !result) {
        throw new Error('Todo not found');
      }

      return { success: true, data: result ?? undefined };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  };

  // Find many records (for paginated list queries)
  findMany: CqrsQueryFunc<FindManyTodoQuery, FindManyTodoQuery['args']> =
    async ({ query, options }) => {
      try {
        const builder = this.filterQueryBuilder.select(query);
        const results = await builder.getMany();
        return { success: true, data: results };
      } catch (e) {
        throw new BadRequestException(e.message);
      }
    };

  // Count records (needed for cursor pagination's totalCount)
  count: CqrsQueryFunc<CountTodoQuery, CountTodoQuery['args']> = async ({
    query,
  }) => {
    try {
      const count = await this.filterQueryBuilder
        .select({ filter: query })
        .getCount();
      return { success: true, data: count };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  };

  // Create one record
  createOne: CqrsCommandFunc<
    CreateOneTodoCommand,
    CreateOneTodoCommand['args']
  > = async ({ input }) => {
    try {
      // Business rule: no duplicate text per user
      const existing = await this.repo.findOne({
        where: { text: input.text, userId: input.userId },
      });
      if (existing) {
        throw new Error('You already have a todo with that text');
      }

      const todo = this.repo.create(input);
      const data = await this.repo.save(todo);
      return { success: true, data };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  };

  // Update one record
  updateOne: CqrsCommandFunc<
    UpdateOneTodoCommand,
    UpdateOneTodoCommand['args']
  > = async ({ query, input, options }) => {
    try {
      const builder = this.filterQueryBuilder.select(query);
      const before = await builder.getOne();
      if (!before) throw new NotFoundException('Todo not found');

      const updated = await this.repo.save({ ...before, ...input });
      return { success: true, data: { before, updated } };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  };

  // Delete one record (soft or hard depending on entity)
  deleteOne: CqrsCommandFunc<
    DeleteOneTodoCommand,
    DeleteOneTodoCommand['args']
  > = async ({ input: id }) => {
    try {
      const todo = await this.repo.findOne({ where: { id } });
      if (!todo) throw new NotFoundException('Todo not found');
      await this.repo.remove(todo);
      return { success: true, data: todo };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  };
}
