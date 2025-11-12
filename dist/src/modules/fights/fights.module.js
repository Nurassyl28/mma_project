"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FightsModule = void 0;
const common_1 = require("@nestjs/common");
const fight_entity_1 = require("../../domain/entities/fight.entity");
const event_entity_1 = require("../../domain/entities/event.entity");
const fighter_entity_1 = require("../../domain/entities/fighter.entity");
const fights_service_1 = require("./fights.service");
const fights_resolver_1 = require("./fights.resolver");
const ranking_queue_module_1 = require("../../infra/ranking-queue/ranking.queue.module");
const repository_module_1 = require("../../infra/database/repository.module");
let FightsModule = class FightsModule {
};
exports.FightsModule = FightsModule;
exports.FightsModule = FightsModule = __decorate([
    (0, common_1.Module)({
        imports: [...(0, repository_module_1.repositoryModules)([fight_entity_1.Fight, event_entity_1.Event, fighter_entity_1.Fighter]), ranking_queue_module_1.RankingQueueModule],
        providers: [fights_service_1.FightsService, fights_resolver_1.FightsResolver],
        exports: [fights_service_1.FightsService]
    })
], FightsModule);
//# sourceMappingURL=fights.module.js.map