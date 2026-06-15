// apps/api/src/modules/todo/dto/todo.dto.ts
import { ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { AbstractDto } from 'nestjs-dev-utilities';
import { TodoStatus } from '../todo.constant';

@ObjectType('Todo')
export class TodoDto extends AbstractDto {
  // AbstractDto provides: id (Int!), createdAt (DateTime!), updatedAt (DateTime!)

  @FilterableField()
  text: string;

  @FilterableField()
  isChecked: boolean;

  @FilterableField(() => TodoStatus)
  status: TodoStatus;

  // userId is NOT exposed — clients should not filter by arbitrary userId
}
