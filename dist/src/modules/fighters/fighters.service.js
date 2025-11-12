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
exports.FightersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const fighter_entity_1 = require("../../domain/entities/fighter.entity");
const typeorm_2 = require("@nestjs/typeorm");
const fight_entity_1 = require("../../domain/entities/fight.entity");
let FightersService = class FightersService {
    constructor(repo, fights) {
        this.repo = repo;
        this.fights = fights;
    }
    create(dto) { return this.repo.save(this.repo.create(dto)); }
    findAll() { return this.repo.find(); }
    findBySlug(slug) { return this.repo.findOneBy({ slug }); }
    historyForFighter(fighterId) {
        return this.fights.find({
            where: [
                { redFighter: { id: fighterId } },
                { blueFighter: { id: fighterId } }
            ],
            relations: ['event', 'redFighter', 'blueFighter'],
            order: { event: { date: 'DESC' } }
        });
    }
};
exports.FightersService = FightersService;
exports.FightersService = FightersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(fighter_entity_1.Fighter)),
    __param(1, (0, typeorm_2.InjectRepository)(fight_entity_1.Fight)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], FightersService);
//# sourceMappingURL=fighters.service.js.map