import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { RankingProcessor } from './ranking.processor';
import { RankingQueueService } from './ranking.service';
import { Fight } from '../../domain/entities/fight.entity';
import { Ranking } from '../../domain/entities/ranking.entity';
import { Fighter } from '../../domain/entities/fighter.entity';
import { repositoryModules } from '../database/repository.module';
import { isMemoryDb } from '../database/database.constants';

const queueEnabled = process.env.ENABLE_RANKING_QUEUE === 'true' && !isMemoryDb;

@Module({
  imports: [
    ...(queueEnabled
      ? [
          BullModule.registerQueue({
            name: 'ranking',
            connection: {
              host: process.env.REDIS_HOST ?? 'localhost',
              port: +(process.env.REDIS_PORT ?? 6379)
            }
          })
        ]
      : []),
    ...repositoryModules([Fight, Ranking, Fighter])
  ],
  providers: [
    ...(queueEnabled ? [RankingProcessor] : []),
    RankingQueueService
  ],
  exports: [RankingQueueService]
})
export class RankingQueueModule {}
