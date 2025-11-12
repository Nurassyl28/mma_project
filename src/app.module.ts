import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import orm from '../ormconfig';
import { isMemoryDb } from './infra/database/database.constants';
import { InMemoryDatabaseModule } from './infra/database/in-memory.module';
import { RankingQueueModule } from './infra/ranking-queue/ranking.queue.module';
import { FightersModule } from './modules/fighters/fighters.module';
import { EventsModule } from './modules/events/events.module';
import { FightsModule } from './modules/fights/fights.module';
import { RankingsModule } from './modules/rankings/rankings.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true
    }),
    ...(isMemoryDb ? [InMemoryDatabaseModule] : [TypeOrmModule.forRoot(orm.options as any)]),
    RankingQueueModule,
    FightersModule,
    EventsModule,
    FightsModule,
    RankingsModule
  ]
})
export class AppModule {}
