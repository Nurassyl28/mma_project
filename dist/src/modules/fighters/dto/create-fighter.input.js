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
exports.CreateFighterInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const weight_class_enum_1 = require("../../../domain/enums/weight-class.enum");
const class_validator_1 = require("class-validator");
let CreateFighterInput = class CreateFighterInput {
};
exports.CreateFighterInput = CreateFighterInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFighterInput.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFighterInput.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFighterInput.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateFighterInput.prototype, "nickname", void 0);
__decorate([
    (0, graphql_1.Field)(() => weight_class_enum_1.WeightClass),
    (0, class_validator_1.IsEnum)(weight_class_enum_1.WeightClass),
    __metadata("design:type", String)
], CreateFighterInput.prototype, "weightClass", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateFighterInput.prototype, "country", void 0);
exports.CreateFighterInput = CreateFighterInput = __decorate([
    (0, graphql_1.InputType)()
], CreateFighterInput);
//# sourceMappingURL=create-fighter.input.js.map