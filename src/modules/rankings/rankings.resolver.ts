import { Resolver, Query, Args } from '@nestjs/graphql';
import { Ranking } from '../../domain/entities/ranking.entity';
import { RankingsService } from './rankings.service';

@Resolver(() => Ranking)
export class RankingsResolver {
  constructor(private readonly service: RankingsService) {}

  @Query(() => [Ranking])
  rankings(@Args('weightClass') weightClass: string) {
    return this.service.list(weightClass);
  }
}
