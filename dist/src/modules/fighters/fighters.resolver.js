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
exports.FightersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const fighters_service_1 = require("./fighters.service");
const fighter_entity_1 = require("../../domain/entities/fighter.entity");
const create_fighter_input_1 = require("./dto/create-fighter.input");
const fight_entity_1 = require("../../domain/entities/fight.entity");
let FightersResolver = class FightersResolver {
    constructor(service) {
        this.service = service;
    }
    fighters() { return this.service.findAll(); }
    fighter(slug) { return this.service.findBySlug(slug); }
    createFighter(input) { return this.service.create(input); }
    history(fighter) {
        return this.service.historyForFighter(fighter.id);
    }
};
exports.FightersResolver = FightersResolver;
__decorate([
    (0, graphql_1.Query)(() => [fighter_entity_1.Fighter]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FightersResolver.prototype, "fighters", null);
__decorate([
    (0, graphql_1.Query)(() => fighter_entity_1.Fighter, { nullable: true }),
    __param(0, (0, graphql_1.Args)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FightersResolver.prototype, "fighter", null);
__decorate([
    (0, graphql_1.Mutation)(() => fighter_entity_1.Fighter),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fighter_input_1.CreateFighterInput]),
    __metadata("design:returntype", void 0)
], FightersResolver.prototype, "createFighter", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [fight_entity_1.Fight]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fighter_entity_1.Fighter]),
    __metadata("design:returntype", void 0)
], FightersResolver.prototype, "history", null);
exports.FightersResolver = FightersResolver = __decorate([
    (0, graphql_1.Resolver)(() => fighter_entity_1.Fighter),
    __metadata("design:paramtypes", [fighters_service_1.FightersService])
], FightersResolver);
//# sourceMappingURL=fighters.resolver.js.map