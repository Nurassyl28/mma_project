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
exports.Fighter = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const weight_class_enum_1 = require("../enums/weight-class.enum");
const fight_entity_1 = require("./fight.entity");
(0, graphql_1.registerEnumType)(weight_class_enum_1.WeightClass, { name: 'WeightClass' });
let Fighter = class Fighter {
};
exports.Fighter = Fighter;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Fighter.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Fighter.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Fighter.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Fighter.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Fighter.prototype, "nickname", void 0);
__decorate([
    (0, graphql_1.Field)(() => weight_class_enum_1.WeightClass),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Fighter.prototype, "weightClass", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Fighter.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => fight_entity_1.Fight, f => f.redFighter),
    __metadata("design:type", Array)
], Fighter.prototype, "redFights", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => fight_entity_1.Fight, f => f.blueFighter),
    __metadata("design:type", Array)
], Fighter.prototype, "blueFights", void 0);
exports.Fighter = Fighter = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('fighters')
], Fighter);
//# sourceMappingURL=fighter.entity.js.map