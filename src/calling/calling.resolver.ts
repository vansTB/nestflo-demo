import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CallingEntity,
  QueryCallingInput,
} from './calling.entity';
import { CallingService } from './calling.service';

@Resolver(() => CallingEntity)
export class CallingResolver {
  constructor(private readonly callingService: CallingService) {}
  @Query(() => [CallingEntity])
  async queryCalling(
    @Args('input') input: QueryCallingInput,
  ) {
    const user = {
      company:'test_company',
      user:"test_user"
    }
    return this.callingService.queryCalling(user,input);
  }
}
