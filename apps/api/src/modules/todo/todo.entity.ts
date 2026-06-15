// apps/api/src/modules/todo/todo.entity.ts
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { AbstractEntity } from 'nestjs-dev-utilities';
import { UserEntity } from '../user/user.entity';
import { TodoStatus } from './todo.constant';

@Entity({ name: 'todo' })
export class TodoEntity extends AbstractEntity {
  // The todo text
  @Column()
  text: string;

  // Completion state
  @Column({ default: false })
  isChecked: boolean;

  // Status enum
  @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.ACTIVE })
  status: TodoStatus;

  // FK to the user who owns this todo
  // @Index because we always query "WHERE user_id = ?"
  @Index()
  @Column()
  @RelationId((todo: TodoEntity) => todo.user)
  userId: number;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;
}
