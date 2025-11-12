import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { FightersService } from './fighters.service';
import { Fighter } from '../../domain/entities/fighter.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { Fight } from '../../domain/entities/fight.entity';

@Resolver(() => Fighter)
export class FightersResolver {
  constructor(private readonly service: FightersService) {}

  @Query(() => [Fighter]) fighters() { return this.service.findAll(); }

  @Query(() => Fighter, { nullable: true })
  fighter(@Args('slug') slug: string) { return this.service.findBySlug(slug); }

  @Mutation(() => Fighter)
  createFighter(@Args('input') input: CreateFighterInput) { return this.service.create(input); }

  @ResolveField(() => [Fight])
  history(@Parent() fighter: Fighter) {
    return this.service.historyForFighter(fighter.id);
  }
}
