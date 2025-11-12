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
exports.FightsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const fight_entity_1 = require("../../domain/entities/fight.entity");
const fights_service_1 = require("./fights.service");
const create_fight_input_1 = require("./dto/create-fight.input");
const report_result_input_1 = require("./dto/report-result.input");
let FightsResolver = class FightsResolver {
    constructor(service) {
        this.service = service;
    }
    createFight(input) {
        return this.service.create(input);
    }
    reportFightResult(input) {
        return this.service.reportResult(input);
    }
    history(limit) {
        return this.service.history(limit);
    }
};
exports.FightsResolver = FightsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => fight_entity_1.Fight),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fight_input_1.CreateFightInput]),
    __metadata("design:returntype", void 0)
], FightsResolver.prototype, "createFight", null);
__decorate([
    (0, graphql_1.Mutation)(() => fight_entity_1.Fight),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_result_input_1.ReportResultInput]),
    __metadata("design:returntype", void 0)
], FightsResolver.prototype, "reportFightResult", null);
__decorate([
    (0, graphql_1.Query)(() => [fight_entity_1.Fight]),
    __param(0, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FightsResolver.prototype, "history", null);
exports.FightsResolver = FightsResolver = __decorate([
    (0, graphql_1.Resolver)(() => fight_entity_1.Fight),
    __metadata("design:paramtypes", [fights_service_1.FightsService])
], FightsResolver);
//# sourceMappingURL=fights.resolver.js.map