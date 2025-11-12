import { Module } from '@nestjs/common';
import { Ranking } from '../../domain/entities/ranking.entity';
import { RankingsService } from './rankings.service';
import { RankingsResolver } from './rankings.resolver';
import { repositoryModules } from '../../infra/database/repository.module';

@Module({
  imports: [...repositoryModules([Ranking])],
  providers: [RankingsService, RankingsResolver]
})
export class RankingsModule {}
