import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository
} from 'typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

type EntityCtor<T> = new () => T;

class InMemoryRepository<T extends ObjectLiteral>
  implements Pick<
    Repository<T>,
    'create' | 'save' | 'find' | 'findOne' | 'findOneBy' | 'findOneByOrFail' | 'findOneOrFail'
  >
{
  constructor(private readonly ctor: EntityCtor<T>, private readonly items: T[]) {}

  create(): T;
  create(entityLike: DeepPartial<T>): T;
  create(entityLikeArray: DeepPartial<T>[]): T[];
  create(entityLike?: DeepPartial<T> | DeepPartial<T>[]): T | T[] {
    if (Array.isArray(entityLike)) return entityLike.map((item) => this.create(item));
    const instance = new this.ctor();
    return Object.assign(instance, entityLike);
  }

  async save(entity: T): Promise<T>;
  async save(entities: T[]): Promise<T[]>;
  async save(input: T | T[]): Promise<T | T[]> {
    if (Array.isArray(input)) {
      return Promise.all(input.map((item) => this.saveOne(item)));
    }
    return this.saveOne(input);
  }

  private async saveOne(entity: T): Promise<T> {
    const stored = clone(entity);
    if (!stored.id) {
      (stored as any).id = randomUUID();
    }
    const idx = this.items.findIndex((item) => item.id === stored.id);
    if (idx >= 0) this.items[idx] = stored;
    else this.items.push(stored);
    return clone(stored);
  }

  async find(options?: FindManyOptions<T>): Promise<T[]> {
    let results = [...this.items];
    const where = options?.where;
    if (where) results = results.filter((item) => matchesWhere(item, where));
    if (options?.order) results.sort((a, b) => compareOrder(a, b, options.order as Record<string, any>));
    if (typeof options?.take === 'number') results = results.slice(0, options.take);
    return results.map((item) => clone(item));
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    const results = await this.find({ where: options.where });
    return results[0] ?? null;
  }

  async findOneBy(where: FindOptionsWhere<T>): Promise<T | null> {
    return this.findOne({ where });
  }

  async findOneByOrFail(where: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.findOneBy(where);
    if (!entity) throw new Error('Entity not found');
    return entity;
  }

  async findOneOrFail(options: FindOneOptions<T>): Promise<T> {
    const entity = await this.findOne(options);
    if (!entity) throw new Error('Entity not found');
    return entity;
  }
}

const clone = <T>(value: T): T => deepClone(value);

const deepClone = <V>(value: V): V => {
  if (value === null || typeof value !== 'object') return value;
  if (value instanceof Date) return new Date(value.getTime()) as unknown as V;
  if (Array.isArray(value)) return value.map((item) => deepClone(item)) as unknown as V;
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(value as Record<string, unknown>)) {
    result[key] = deepClone((value as Record<string, unknown>)[key]);
  }
  return result as V;
};

const matchesWhere = <T extends ObjectLiteral>(entity: T, where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): boolean => {
  if (Array.isArray(where)) return where.some((clause) => matchesWhere(entity, clause));
  return Object.entries(where).every(([key, expected]) => matchesValue((entity as any)?.[key], expected));
};

const matchesValue = (actual: any, expected: any): boolean => {
  if (expected === undefined) return true;
  if (expected === null) return actual === null;
  if (expected instanceof Date) {
    return actual instanceof Date ? actual.getTime() === expected.getTime() : actual === expected;
  }
  if (Array.isArray(expected)) {
    return expected.some((item) => matchesValue(actual, item));
  }
  if (expected && typeof expected === 'object') {
    if ('id' in expected && Object.keys(expected).length === 1) {
      return actual?.id === expected.id;
    }
    return Object.entries(expected).every(([nestedKey, nestedExpected]) =>
      matchesValue(actual?.[nestedKey], nestedExpected)
    );
  }
  return actual === expected;
};

const compareOrder = (a: any, b: any, order: Record<string, any>): number => {
  for (const [key, direction] of Object.entries(order)) {
    if (direction && typeof direction === 'object') {
      const nested = compareOrder(a?.[key], b?.[key], direction);
      if (nested !== 0) return nested;
      continue;
    }
    const dir = `${direction}`.toUpperCase() === 'DESC' ? -1 : 1;
    const av = a?.[key];
    const bv = b?.[key];
    if (av > bv) return dir;
    if (av < bv) return -dir;
  }
  return 0;
};

@Injectable()
export class InMemoryStore {
  private readonly repositories = new Map<string, InMemoryRepository<any>>();
  private readonly data = new Map<string, any[]>();

  getRepository<T extends ObjectLiteral>(target: EntityClassOrSchema): InMemoryRepository<T> {
    const name = this.getName(target);
    if (!this.repositories.has(name)) {
      const collection = this.data.get(name) ?? [];
      this.data.set(name, collection);
      this.repositories.set(name, new InMemoryRepository<T>(this.getCtor(target), collection));
    }
    return this.repositories.get(name)!;
  }

  private getName(target: EntityClassOrSchema): string {
    if (typeof target === 'function' && target.name) return target.name;
    if (typeof target === 'string') return target;
    throw new Error('Unsupported entity target for in-memory repository');
  }

  private getCtor<T>(target: EntityClassOrSchema): EntityCtor<T> {
    if (typeof target === 'function') return target as EntityCtor<T>;
    throw new Error('In-memory repositories require class targets');
  }
}

export { InMemoryRepository };
