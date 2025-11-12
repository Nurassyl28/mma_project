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
exports.RankingProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fight_entity_1 = require("../../domain/entities/fight.entity");
const ranking_entity_1 = require("../../domain/entities/ranking.entity");
const fighter_entity_1 = require("../../domain/entities/fighter.entity");
const method_enum_1 = require("../../domain/enums/method.enum");
let RankingProcessor = class RankingProcessor extends bullmq_1.WorkerHost {
    constructor(fights, ranks, fighters) {
        super();
        this.fights = fights;
        this.ranks = ranks;
        this.fighters = fighters;
    }
    async process(job) {
        const wc = job.data.weightClass;
        const finalized = await this.fights.find({ where: { weightClass: wc, isFinalized: true } });
        const stats = new Map();
        const addPoints = (winnerId, redId, blueId, method, eventDate) => {
            const pFor = (method === method_enum_1.Method.KO_TKO || method === method_enum_1.Method.SUBMISSION) ? 4 :
                (method === method_enum_1.Method.DECISION) ? 3 :
                    (method === method_enum_1.Method.DRAW) ? 1 : 0;
            const ensure = (id) => {
                if (!stats.has(id))
                    stats.set(id, { points: 0, wins: 0, losses: 0, draws: 0, last: new Date(0) });
                return stats.get(id);
            };
            const red = ensure(redId);
            const blue = ensure(blueId);
            if (winnerId === redId) {
                red.points += pFor;
                red.wins++;
                blue.losses++;
            }
            else if (winnerId === blueId) {
                blue.points += pFor;
                blue.wins++;
                red.losses++;
            }
            else {
                red.points += 1;
                blue.points += 1;
                red.draws++;
                blue.draws++;
            }
            const d = eventDate !== null && eventDate !== void 0 ? eventDate : new Date();
            if (d > red.last)
                red.last = d;
            if (d > blue.last)
                blue.last = d;
        };
        for (const f of finalized) {
            addPoints(f.winnerId, f.redFighter.id, f.blueFighter.id, f.method, f.event.date);
        }
        for (const [fighterId, s] of stats.entries()) {
            const fighter = await this.fighters.findOneByOrFail({ id: fighterId });
            let row = await this.ranks.findOne({ where: { fighter: { id: fighterId }, weightClass: wc } });
            if (!row)
                row = this.ranks.create({ fighter, weightClass: wc });
            row.points = s.points;
            row.wins = s.wins;
            row.losses = s.losses;
            row.draws = s.draws;
            row.lastActivity = s.last;
            await this.ranks.save(row);
        }
        const all = await this.ranks.find({ where: { weightClass: wc } });
        const withRatio = all.map(r => ({ r, ratio: (r.wins + r.losses + r.draws) ? r.wins / (r.wins + r.losses + r.draws) : 0 }));
        withRatio.sort((a, b) => {
            var _a, _b, _c, _d;
            return (b.r.points - a.r.points ||
                b.ratio - a.ratio ||
                (((_b = (_a = b.r.lastActivity) === null || _a === void 0 ? void 0 : _a.getTime()) !== null && _b !== void 0 ? _b : 0) - ((_d = (_c = a.r.lastActivity) === null || _c === void 0 ? void 0 : _c.getTime()) !== null && _d !== void 0 ? _d : 0)));
        });
        for (let i = 0; i < withRatio.length; i++) {
            withRatio[i].r.rank = i + 1;
            await this.ranks.save(withRatio[i].r);
        }
    }
};
exports.RankingProcessor = RankingProcessor;
exports.RankingProcessor = RankingProcessor = __decorate([
    (0, bullmq_1.Processor)('ranking'),
    __param(0, (0, typeorm_1.InjectRepository)(fight_entity_1.Fight)),
    __param(1, (0, typeorm_1.InjectRepository)(ranking_entity_1.Ranking)),
    __param(2, (0, typeorm_1.InjectRepository)(fighter_entity_1.Fighter)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RankingProcessor);
//# sourceMappingURL=ranking.processor.js.map