"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryRepository = exports.InMemoryStore = void 0;
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
class InMemoryRepository {
    constructor(ctor, items) {
        this.ctor = ctor;
        this.items = items;
    }
    create(entityLike) {
        if (Array.isArray(entityLike))
            return entityLike.map((item) => this.create(item));
        const instance = new this.ctor();
        return Object.assign(instance, entityLike);
    }
    async save(input) {
        if (Array.isArray(input)) {
            return Promise.all(input.map((item) => this.saveOne(item)));
        }
        return this.saveOne(input);
    }
    async saveOne(entity) {
        const stored = clone(entity);
        if (!stored.id) {
            stored.id = (0, crypto_1.randomUUID)();
        }
        const idx = this.items.findIndex((item) => item.id === stored.id);
        if (idx >= 0)
            this.items[idx] = stored;
        else
            this.items.push(stored);
        return clone(stored);
    }
    async find(options) {
        let results = [...this.items];
        const where = options === null || options === void 0 ? void 0 : options.where;
        if (where)
            results = results.filter((item) => matchesWhere(item, where));
        if (options === null || options === void 0 ? void 0 : options.order)
            results.sort((a, b) => compareOrder(a, b, options.order));
        if (typeof (options === null || options === void 0 ? void 0 : options.take) === 'number')
            results = results.slice(0, options.take);
        return results.map((item) => clone(item));
    }
    async findOne(options) {
        var _a;
        const results = await this.find({ where: options.where });
        return (_a = results[0]) !== null && _a !== void 0 ? _a : null;
    }
    async findOneBy(where) {
        return this.findOne({ where });
    }
    async findOneByOrFail(where) {
        const entity = await this.findOneBy(where);
        if (!entity)
            throw new Error('Entity not found');
        return entity;
    }
    async findOneOrFail(options) {
        const entity = await this.findOne(options);
        if (!entity)
            throw new Error('Entity not found');
        return entity;
    }
}
exports.InMemoryRepository = InMemoryRepository;
const clone = (value) => deepClone(value);
const deepClone = (value) => {
    if (value === null || typeof value !== 'object')
        return value;
    if (value instanceof Date)
        return new Date(value.getTime());
    if (Array.isArray(value))
        return value.map((item) => deepClone(item));
    const result = {};
    for (const key of Object.keys(value)) {
        result[key] = deepClone(value[key]);
    }
    return result;
};
const matchesWhere = (entity, where) => {
    if (Array.isArray(where))
        return where.some((clause) => matchesWhere(entity, clause));
    return Object.entries(where).every(([key, expected]) => matchesValue(entity === null || entity === void 0 ? void 0 : entity[key], expected));
};
const matchesValue = (actual, expected) => {
    if (expected === undefined)
        return true;
    if (expected === null)
        return actual === null;
    if (expected instanceof Date) {
        return actual instanceof Date ? actual.getTime() === expected.getTime() : actual === expected;
    }
    if (Array.isArray(expected)) {
        return expected.some((item) => matchesValue(actual, item));
    }
    if (expected && typeof expected === 'object') {
        if ('id' in expected && Object.keys(expected).length === 1) {
            return (actual === null || actual === void 0 ? void 0 : actual.id) === expected.id;
        }
        return Object.entries(expected).every(([nestedKey, nestedExpected]) => matchesValue(actual === null || actual === void 0 ? void 0 : actual[nestedKey], nestedExpected));
    }
    return actual === expected;
};
const compareOrder = (a, b, order) => {
    for (const [key, direction] of Object.entries(order)) {
        if (direction && typeof direction === 'object') {
            const nested = compareOrder(a === null || a === void 0 ? void 0 : a[key], b === null || b === void 0 ? void 0 : b[key], direction);
            if (nested !== 0)
                return nested;
            continue;
        }
        const dir = `${direction}`.toUpperCase() === 'DESC' ? -1 : 1;
        const av = a === null || a === void 0 ? void 0 : a[key];
        const bv = b === null || b === void 0 ? void 0 : b[key];
        if (av > bv)
            return dir;
        if (av < bv)
            return -dir;
    }
    return 0;
};
let InMemoryStore = class InMemoryStore {
    constructor() {
        this.repositories = new Map();
        this.data = new Map();
    }
    getRepository(target) {
        var _a;
        const name = this.getName(target);
        if (!this.repositories.has(name)) {
            const collection = (_a = this.data.get(name)) !== null && _a !== void 0 ? _a : [];
            this.data.set(name, collection);
            this.repositories.set(name, new InMemoryRepository(this.getCtor(target), collection));
        }
        return this.repositories.get(name);
    }
    getName(target) {
        if (typeof target === 'function' && target.name)
            return target.name;
        if (typeof target === 'string')
            return target;
        throw new Error('Unsupported entity target for in-memory repository');
    }
    getCtor(target) {
        if (typeof target === 'function')
            return target;
        throw new Error('In-memory repositories require class targets');
    }
};
exports.InMemoryStore = InMemoryStore;
exports.InMemoryStore = InMemoryStore = __decorate([
    (0, common_1.Injectable)()
], InMemoryStore);
//# sourceMappingURL=in-memory.store.js.map