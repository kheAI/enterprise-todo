// apps/api/src/modules/todo/dto/todo.input.ts
import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TodoStatus } from '../todo.constant';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Todo text cannot be empty' })
  @MaxLength(500, { message: 'Todo text cannot exceed 500 characters' })
  text: string;

  // Part 07: userId removed from @Field and injected from JWT instead
  @Field(() => Int)
  @IsInt()
  userId: number;
}

@InputType()
export class UpdateTodoInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  text?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isChecked?: boolean;

  @Field(() => TodoStatus, { nullable: true })
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;
}
