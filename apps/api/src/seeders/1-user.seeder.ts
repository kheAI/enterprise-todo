import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../modules/user/user.entity';
import { UserStatus } from '../modules/user/user.constant';

export default class UserSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(UserEntity);
    const password = await bcrypt.hash('Password123!', 10);
    await repo.save([
      {
        fullname: 'Kai Chew',
        username: 'kai',
        email: 'kai@example.com',
        password,
        status: UserStatus.ACTIVE,
        twoFactorSecret: null,
      },
    ]);
  }
}
