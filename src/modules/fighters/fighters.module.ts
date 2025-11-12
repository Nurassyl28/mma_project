import { Module } from '@nestjs/common';
import { Fighter } from '../../domain/entities/fighter.entity';
import { Fight } from '../../domain/entities/fight.entity';
import { FightersService } from './fighters.service';
import { FightersResolver } from './fighters.resolver';
import { repositoryModules } from '../../infra/database/repository.module';

@Module({
  imports: [...repositoryModules([Fighter, Fight])],
  providers: [FightersService, FightersResolver],
  exports: [FightersService]
})
export class FightersModule {}
