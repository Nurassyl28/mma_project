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
exports.CreateFightInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const weight_class_enum_1 = require("../../../domain/enums/weight-class.enum");
let CreateFightInput = class CreateFightInput {
};
exports.CreateFightInput = CreateFightInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateFightInput.prototype, "eventId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateFightInput.prototype, "redFighterId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateFightInput.prototype, "blueFighterId", void 0);
__decorate([
    (0, graphql_1.Field)(() => weight_class_enum_1.WeightClass),
    (0, class_validator_1.IsEnum)(weight_class_enum_1.WeightClass),
    __metadata("design:type", String)
], CreateFightInput.prototype, "weightClass", void 0);
exports.CreateFightInput = CreateFightInput = __decorate([
    (0, graphql_1.InputType)()
], CreateFightInput);
//# sourceMappingURL=create-fight.input.js.map