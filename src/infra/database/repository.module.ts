import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { isMemoryDb } from './database.constants';
import { InMemoryRepositoriesModule } from './in-memory-repositories.module';

export const repositoryModules = (entities: EntityClassOrSchema[]) =>
  isMemoryDb ? [InMemoryRepositoriesModule.forFeature(entities)] : [TypeOrmModule.forFeature(entities)];
