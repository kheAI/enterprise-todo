import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TodoStatus } from '../todo.constant';

@InputType()
export class CreateTodoInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  text: string;
}

@InputType()
export class UpdateTodoInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  text?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isChecked?: boolean;

  @Field(() => TodoStatus, { nullable: true })
  @IsOptional()
  status?: TodoStatus;
}
