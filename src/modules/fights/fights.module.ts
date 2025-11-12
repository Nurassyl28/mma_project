import { Module } from '@nestjs/common';
import { Fight } from '../../domain/entities/fight.entity';
import { Event } from '../../domain/entities/event.entity';
import { Fighter } from '../../domain/entities/fighter.entity';
import { FightsService } from './fights.service';
import { FightsResolver } from './fights.resolver';
import { RankingQueueModule } from '../../infra/ranking-queue/ranking.queue.module';
import { repositoryModules } from '../../infra/database/repository.module';

@Module({
  imports: [...repositoryModules([Fight, Event, Fighter]), RankingQueueModule],
  providers: [FightsService, FightsResolver],
  exports: [FightsService]
})
export class FightsModule {}
