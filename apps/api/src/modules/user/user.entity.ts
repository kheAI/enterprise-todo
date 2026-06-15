import { Column, Entity, Index } from 'typeorm';
import { AbstractEntity } from 'nestjs-dev-utilities';
import { UserStatus } from './user.constant';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity {
  @Column()
  fullname: string;

  @Index()
  @Column({ unique: true })
  username: string;

  @Index()
  @Column({ unique: true })
  email: string;

  // NEVER expose this field in any DTO — it is never sent to clients
  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ nullable: true })
  twoFactorSecret: string | null;
}
