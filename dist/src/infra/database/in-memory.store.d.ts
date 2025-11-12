import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
type EntityCtor<T> = new () => T;
declare class InMemoryRepository<T extends ObjectLiteral> implements Pick<Repository<T>, 'create' | 'save' | 'find' | 'findOne' | 'findOneBy' | 'findOneByOrFail' | 'findOneOrFail'> {
    private readonly ctor;
    private readonly items;
    constructor(ctor: EntityCtor<T>, items: T[]);
    create(): T;
    create(entityLike: DeepPartial<T>): T;
    create(entityLikeArray: DeepPartial<T>[]): T[];
    save(entity: T): Promise<T>;
    save(entities: T[]): Promise<T[]>;
    private saveOne;
    find(options?: FindManyOptions<T>): Promise<T[]>;
    findOne(options: FindOneOptions<T>): Promise<T | null>;
    findOneBy(where: FindOptionsWhere<T>): Promise<T | null>;
    findOneByOrFail(where: FindOptionsWhere<T>): Promise<T>;
    findOneOrFail(options: FindOneOptions<T>): Promise<T>;
}
export declare class InMemoryStore {
    private readonly repositories;
    private readonly data;
    getRepository<T extends ObjectLiteral>(target: EntityClassOrSchema): InMemoryRepository<T>;
    private getName;
    private getCtor;
}
export { InMemoryRepository };
