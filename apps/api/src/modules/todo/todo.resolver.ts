// apps/api/src/modules/todo/todo.resolver.ts
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { TodoDto } from './dto/todo.dto';
import { CreateTodoInput, UpdateTodoInput } from './dto/todo.input';
import { TodosQuery, TodoQueryConnection } from './dto/todo.query';
import {
  CountTodoQuery,
  CreateOneTodoCommand,
  DeleteOneTodoCommand,
  FindManyTodoQuery,
  FindOneTodoQuery,
  UpdateOneTodoCommand,
} from './cqrs';

// Part 07: @UseGuards(AuthJwtGuard) and @CurrentUser() are added here after auth module is built

@Resolver(() => TodoDto)
export class TodoResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  // ── Queries (reads) ─────────────────────────────────────────────

  @Query(() => TodoDto, { nullable: true })
  async todo(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<TodoDto | null> {
    const { data } = await this.queryBus.execute(
      new FindOneTodoQuery({ query: { filter: { id: { eq: id } } } }),
    );
    return data as TodoDto;
  }

  @Query(() => TodoQueryConnection)
  async getTodos(@Args() query: TodosQuery) {
    return TodoQueryConnection.createFromPromise(
      async (q) => {
        const { data } = await this.queryBus.execute(
          new FindManyTodoQuery({ query: q }),
        );
        return data as TodoDto[];
      },
      query,
      async (filter) => {
        const { data: count } = await this.queryBus.execute(
          new CountTodoQuery({ query: filter }),
        );
        return count as number;
      },
    );
  }

  // ── Mutations (writes) ──────────────────────────────────────────

  @Mutation(() => TodoDto)
  async createTodo(
    @Args('input') input: CreateTodoInput,
  ): Promise<TodoDto> {
    const { data } = await this.commandBus.execute(
      new CreateOneTodoCommand({ input }),
    );
    return data as TodoDto;
  }

  @Mutation(() => TodoDto)
  async updateTodo(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateTodoInput,
  ): Promise<TodoDto> {
    const { data } = await this.commandBus.execute(
      new UpdateOneTodoCommand({
        query: { filter: { id: { eq: id } } },
        input,
      }),
    );
    return data.updated as TodoDto;
  }

  @Mutation(() => Boolean)
  async deleteTodo(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.commandBus.execute(
      new DeleteOneTodoCommand({ input: id }),
    );
    return true;
  }
}
