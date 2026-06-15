import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HealthResolver {
  // @Query marks this method as a GraphQL query field
  // () => String tells GraphQL the return type
  @Query(() => String)
  health(): string {
    return 'ok';
  }
}
