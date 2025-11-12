"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FightersModule = void 0;
const common_1 = require("@nestjs/common");
const fighter_entity_1 = require("../../domain/entities/fighter.entity");
const fight_entity_1 = require("../../domain/entities/fight.entity");
const fighters_service_1 = require("./fighters.service");
const fighters_resolver_1 = require("./fighters.resolver");
const repository_module_1 = require("../../infra/database/repository.module");
let FightersModule = class FightersModule {
};
exports.FightersModule = FightersModule;
exports.FightersModule = FightersModule = __decorate([
    (0, common_1.Module)({
        imports: [...(0, repository_module_1.repositoryModules)([fighter_entity_1.Fighter, fight_entity_1.Fight])],
        providers: [fighters_service_1.FightersService, fighters_resolver_1.FightersResolver],
        exports: [fighters_service_1.FightersService]
    })
], FightersModule);
//# sourceMappingURL=fighters.module.js.map