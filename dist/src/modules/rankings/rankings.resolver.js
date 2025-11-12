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
exports.RankingsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const ranking_entity_1 = require("../../domain/entities/ranking.entity");
const rankings_service_1 = require("./rankings.service");
let RankingsResolver = class RankingsResolver {
    constructor(service) {
        this.service = service;
    }
    rankings(weightClass) {
        return this.service.list(weightClass);
    }
};
exports.RankingsResolver = RankingsResolver;
__decorate([
    (0, graphql_1.Query)(() => [ranking_entity_1.Ranking]),
    __param(0, (0, graphql_1.Args)('weightClass')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RankingsResolver.prototype, "rankings", null);
exports.RankingsResolver = RankingsResolver = __decorate([
    (0, graphql_1.Resolver)(() => ranking_entity_1.Ranking),
    __metadata("design:paramtypes", [rankings_service_1.RankingsService])
], RankingsResolver);
//# sourceMappingURL=rankings.resolver.js.map