import { Module } from '@nestjs/common';
import { HealthResolver } from './health.resolver';

@Module({
  providers: [HealthResolver], // register the resolver so NestJS manages it
})
export class HealthModule {}
