"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repositoryModules = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const database_constants_1 = require("./database.constants");
const in_memory_repositories_module_1 = require("./in-memory-repositories.module");
const repositoryModules = (entities) => database_constants_1.isMemoryDb ? [in_memory_repositories_module_1.InMemoryRepositoriesModule.forFeature(entities)] : [typeorm_1.TypeOrmModule.forFeature(entities)];
exports.repositoryModules = repositoryModules;
//# sourceMappingURL=repository.module.js.map