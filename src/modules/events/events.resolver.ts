import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Event } from '../../domain/entities/event.entity';
import { EventsService } from './events.service';
import { CreateEventInput } from './dto/create-event.input';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly service: EventsService) {}

  @Query(() => [Event]) events() { return this.service.findAll(); }

  @Query(() => [Event])
  upcomingEvents(@Args('limit', { type: () => Int, nullable: true }) limit?: number) {
    return this.service.findUpcoming(limit);
  }

  @Mutation(() => Event)
  createEvent(@Args('input') input: CreateEventInput) { return this.service.create(input); }
}
