import { DynamicModule, Module, Provider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { InMemoryStore, InMemoryRepository } from './in-memory.store';
import { InMemoryDatabaseModule } from './in-memory.module';

@Module({})
export class InMemoryRepositoriesModule {
  static forFeature(entities: EntityClassOrSchema[]): DynamicModule {
    const providers: Provider[] = entities.map((entity) => ({
      provide: getRepositoryToken(entity),
      useFactory: (store: InMemoryStore): InMemoryRepository<any> => store.getRepository(entity),
      inject: [InMemoryStore]
    }));

    return {
      module: InMemoryRepositoriesModule,
      imports: [InMemoryDatabaseModule],
      providers,
      exports: providers
    };
  }
}
