import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { Fight } from '../../domain/entities/fight.entity';
import { FightsService } from './fights.service';
import { CreateFightInput } from './dto/create-fight.input';
import { ReportResultInput } from './dto/report-result.input';

@Resolver(() => Fight)
export class FightsResolver {
  constructor(private readonly service: FightsService) {}

  @Mutation(() => Fight)
  createFight(@Args('input') input: CreateFightInput) {
    return this.service.create(input);
  }

  @Mutation(() => Fight)
  reportFightResult(@Args('input') input: ReportResultInput) {
    return this.service.reportResult(input);
  }

  @Query(() => [Fight])
  history(@Args('limit', { type: () => Int, nullable: true }) limit?: number) {
    return this.service.history(limit);
  }
}
