// apps/api/src/modules/todo/dto/todo.query.ts
import { ArgsType } from '@nestjs/graphql';
import { SortDirection } from '@ptc-org/nestjs-query-core';
import { PagingStrategies, QueryArgsType } from '@ptc-org/nestjs-query-graphql';
import { TodoDto } from './todo.dto';

@ArgsType()
export class TodosQuery extends QueryArgsType(TodoDto, {
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.CURSOR,
  enableTotalCount: true,
}) {}

export const TodoQueryConnection = TodosQuery.ConnectionType;
