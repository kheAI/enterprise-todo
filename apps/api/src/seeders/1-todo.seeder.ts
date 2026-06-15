import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { TodoEntity } from '../modules/todo/todo.entity';
import { TodoStatus } from '../modules/todo/todo.constant';

export default class TodoSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(TodoEntity);
    await repo.save([
      {
        text: 'Buy groceries',
        isChecked: false,
        userId: 1,
        status: TodoStatus.ACTIVE,
      },
      {
        text: 'Write tests',
        isChecked: false,
        userId: 1,
        status: TodoStatus.ACTIVE,
      },
      {
        text: 'Deploy to production',
        isChecked: true,
        userId: 1,
        status: TodoStatus.ARCHIVED,
      },
    ]);
  }
}
