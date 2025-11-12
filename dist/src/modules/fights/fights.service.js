"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FightsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fight_entity_1 = require("../../domain/entities/fight.entity");
const event_entity_1 = require("../../domain/entities/event.entity");
const fighter_entity_1 = require("../../domain/entities/fighter.entity");
const typeorm_2 = require("typeorm");
const ranking_service_1 = require("../../infra/ranking-queue/ranking.service");
let FightsService = class FightsService {
    constructor(fights, events, fighters, rankingQueue) {
        this.fights = fights;
        this.events = events;
        this.fighters = fighters;
        this.rankingQueue = rankingQueue;
    }
    async create(dto) {
        const event = await this.events.findOneByOrFail({ id: dto.eventId });
        const red = await this.fighters.findOneByOrFail({ id: dto.redFighterId });
        const blue = await this.fighters.findOneByOrFail({ id: dto.blueFighterId });
        const fight = this.fights.create({
            event,
            redFighter: red,
            blueFighter: blue,
            weightClass: dto.weightClass
        });
        return this.fights.save(fight);
    }
    async reportResult(input) {
        const fight = await this.fights.findOne({
            where: { id: input.fightId },
            relations: ['event']
        });
        if (!fight)
            throw new common_1.NotFoundException(`Бой ${input.fightId} не найден. Используйте id из createFight.`);
        fight.winnerId = input.winnerId;
        fight.method = input.method;
        fight.round = input.round;
        fight.time = input.time;
        fight.isFinalized = true;
        await this.fights.save(fight);
        await this.rankingQueue.enqueueRecompute(fight.weightClass, fight.event.date);
        return fight;
    }
    async history(limit = 20) {
        const take = Math.min(Math.max(limit !== null && limit !== void 0 ? limit : 20, 1), 100);
        const fights = await this.fights.find({ relations: ['event', 'redFighter', 'blueFighter'] });
        return fights
            .filter((fight) => fight.isFinalized)
            .sort((a, b) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const dateDiff = ((_d = (_c = (_b = (_a = b.event) === null || _a === void 0 ? void 0 : _a.date) === null || _b === void 0 ? void 0 : _b.getTime) === null || _c === void 0 ? void 0 : _c.call(_b)) !== null && _d !== void 0 ? _d : 0) - ((_h = (_g = (_f = (_e = a.event) === null || _e === void 0 ? void 0 : _e.date) === null || _f === void 0 ? void 0 : _f.getTime) === null || _g === void 0 ? void 0 : _g.call(_f)) !== null && _h !== void 0 ? _h : 0);
            if (dateDiff !== 0)
                return dateDiff;
            return b.id.localeCompare(a.id);
        })
            .slice(0, take);
    }
};
exports.FightsService = FightsService;
exports.FightsService = FightsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(fight_entity_1.Fight)),
    __param(1, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(2, (0, typeorm_1.InjectRepository)(fighter_entity_1.Fighter)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        ranking_service_1.RankingQueueService])
], FightsService);
//# sourceMappingURL=fights.service.js.map