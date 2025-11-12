import { DynamicModule } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
export declare class InMemoryRepositoriesModule {
    static forFeature(entities: EntityClassOrSchema[]): DynamicModule;
}
