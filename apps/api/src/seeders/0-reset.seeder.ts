import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';

// Always run this first — clears tables to avoid duplicate key errors on re-seed
export default class ResetSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    // Truncate in FK-safe order: child tables first, then parent
    await dataSource.query('TRUNCATE TABLE todo RESTART IDENTITY CASCADE');
    await dataSource.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE');
  }
}
