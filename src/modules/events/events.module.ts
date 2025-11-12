import { Module } from '@nestjs/common';
import { Event } from '../../domain/entities/event.entity';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { repositoryModules } from '../../infra/database/repository.module';

@Module({
  imports: [...repositoryModules([Event])],
  providers: [EventsService, EventsResolver],
  exports: [EventsService]
})
export class EventsModule {}
