"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingQueueModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const ranking_processor_1 = require("./ranking.processor");
const ranking_service_1 = require("./ranking.service");
const fight_entity_1 = require("../../domain/entities/fight.entity");
const ranking_entity_1 = require("../../domain/entities/ranking.entity");
const fighter_entity_1 = require("../../domain/entities/fighter.entity");
const repository_module_1 = require("../database/repository.module");
const database_constants_1 = require("../database/database.constants");
const queueEnabled = process.env.ENABLE_RANKING_QUEUE === 'true' && !database_constants_1.isMemoryDb;
let RankingQueueModule = class RankingQueueModule {
};
exports.RankingQueueModule = RankingQueueModule;
exports.RankingQueueModule = RankingQueueModule = __decorate([
    (0, common_1.Module)({
        imports: [
            ...(queueEnabled
                ? [
                    bullmq_1.BullModule.registerQueue({
                        name: 'ranking',
                        connection: {
                            host: (_a = process.env.REDIS_HOST) !== null && _a !== void 0 ? _a : 'localhost',
                            port: +((_b = process.env.REDIS_PORT) !== null && _b !== void 0 ? _b : 6379)
                        }
                    })
                ]
                : []),
            ...(0, repository_module_1.repositoryModules)([fight_entity_1.Fight, ranking_entity_1.Ranking, fighter_entity_1.Fighter])
        ],
        providers: [
            ...(queueEnabled ? [ranking_processor_1.RankingProcessor] : []),
            ranking_service_1.RankingQueueService
        ],
        exports: [ranking_service_1.RankingQueueService]
    })
], RankingQueueModule);
//# sourceMappingURL=ranking.queue.module.js.map