import { Resolver } from '@nestjs/graphql';
import { TodoEntity } from './todo.entity';

// Stub — will be implemented in Part 06 (DTOs & Resolvers)
@Resolver(() => TodoEntity)
export class TodoResolver {}
