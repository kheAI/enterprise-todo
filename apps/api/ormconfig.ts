// apps/api/ormconfig.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config({ path: '.env' }); // load .env

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PROJECT_DB_HOST,
  port: Number(process.env.PROJECT_DB_PORT),
  username: process.env.PROJECT_DB_USERNAME,
  password: process.env.PROJECT_DB_PASSWORD,
  database: process.env.PROJECT_DB_DATABASE,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['apps/api/src/**/*.entity.ts'],
  migrations: ['apps/api/src/migrations/*.ts'],
  synchronize: false, // NEVER true — always use migrations
});
