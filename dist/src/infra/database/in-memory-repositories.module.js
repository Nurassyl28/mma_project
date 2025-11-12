"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var InMemoryRepositoriesModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryRepositoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const in_memory_store_1 = require("./in-memory.store");
const in_memory_module_1 = require("./in-memory.module");
let InMemoryRepositoriesModule = InMemoryRepositoriesModule_1 = class InMemoryRepositoriesModule {
    static forFeature(entities) {
        const providers = entities.map((entity) => ({
            provide: (0, typeorm_1.getRepositoryToken)(entity),
            useFactory: (store) => store.getRepository(entity),
            inject: [in_memory_store_1.InMemoryStore]
        }));
        return {
            module: InMemoryRepositoriesModule_1,
            imports: [in_memory_module_1.InMemoryDatabaseModule],
            providers,
            exports: providers
        };
    }
};
exports.InMemoryRepositoriesModule = InMemoryRepositoriesModule;
exports.InMemoryRepositoriesModule = InMemoryRepositoriesModule = InMemoryRepositoriesModule_1 = __decorate([
    (0, common_1.Module)({})
], InMemoryRepositoriesModule);
//# sourceMappingURL=in-memory-repositories.module.js.map