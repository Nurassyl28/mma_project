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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fight = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const event_entity_1 = require("./event.entity");
const fighter_entity_1 = require("./fighter.entity");
const method_enum_1 = require("../enums/method.enum");
(0, graphql_1.registerEnumType)(method_enum_1.Method, { name: 'Method' });
let Fight = class Fight {
    constructor() {
        this.isFinalized = false;
    }
};
exports.Fight = Fight;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Fight.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => event_entity_1.Event),
    (0, typeorm_1.ManyToOne)(() => event_entity_1.Event, (e) => e.fights, { eager: true }),
    __metadata("design:type", event_entity_1.Event)
], Fight.prototype, "event", void 0);
__decorate([
    (0, graphql_1.Field)(() => fighter_entity_1.Fighter),
    (0, typeorm_1.ManyToOne)(() => fighter_entity_1.Fighter, { eager: true }),
    __metadata("design:type", fighter_entity_1.Fighter)
], Fight.prototype, "redFighter", void 0);
__decorate([
    (0, graphql_1.Field)(() => fighter_entity_1.Fighter),
    (0, typeorm_1.ManyToOne)(() => fighter_entity_1.Fighter, { eager: true }),
    __metadata("design:type", fighter_entity_1.Fighter)
], Fight.prototype, "blueFighter", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Fight.prototype, "winnerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => method_enum_1.Method, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Fight.prototype, "method", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Fight.prototype, "round", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Fight.prototype, "time", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: false }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Fight.prototype, "isFinalized", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Fight.prototype, "weightClass", void 0);
exports.Fight = Fight = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('fights')
], Fight);
//# sourceMappingURL=fight.entity.js.map