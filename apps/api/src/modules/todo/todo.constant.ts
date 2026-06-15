// apps/api/src/modules/todo/todo.constant.ts
import { registerEnumType } from '@nestjs/graphql';

export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

// Tell GraphQL about this enum so it appears in the schema
registerEnumType(TodoStatus, { name: 'TodoStatus' });
