import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CqrsModule } from '@nestjs/cqrs';
import { AppResolver } from './app.resolver';
import { HealthModule } from '../modules/health/health.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [
    // Load .env into process.env — available everywhere via ConfigService
    ConfigModule.forRoot({
      isGlobal: true, // no need to import ConfigModule in every feature module
      envFilePath: '.env',
    }),

    // TypeORM: connect to PostgreSQL
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('PROJECT_DB_HOST'),
        port: config.get<number>('PROJECT_DB_PORT'),
        username: config.get('PROJECT_DB_USERNAME'),
        password: config.get('PROJECT_DB_PASSWORD'),
        database: config.get('PROJECT_DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // NEVER true in production — use migrations
        logging: config.get('PROJECT_DB_DEBUG') === 'true',
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),

    // GraphQL: code-first schema generation via Apollo
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        autoSchemaFile: true, // generate schema.gql automatically from decorators
        playground: config.get('PROJECT_GRAPHQL_PLAYGROUND') === 'true',
        context: ({ req }) => ({ req }), // pass request context (needed for guards)
      }),
    }),

    // CQRS: registers CommandBus, QueryBus, EventBus globally
    CqrsModule.forRoot(),

    HealthModule,
    TodoModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
