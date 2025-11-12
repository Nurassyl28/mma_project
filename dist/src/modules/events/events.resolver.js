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
exports.EventsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const event_entity_1 = require("../../domain/entities/event.entity");
const events_service_1 = require("./events.service");
const create_event_input_1 = require("./dto/create-event.input");
let EventsResolver = class EventsResolver {
    constructor(service) {
        this.service = service;
    }
    events() { return this.service.findAll(); }
    upcomingEvents(limit) {
        return this.service.findUpcoming(limit);
    }
    createEvent(input) { return this.service.create(input); }
};
exports.EventsResolver = EventsResolver;
__decorate([
    (0, graphql_1.Query)(() => [event_entity_1.Event]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventsResolver.prototype, "events", null);
__decorate([
    (0, graphql_1.Query)(() => [event_entity_1.Event]),
    __param(0, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EventsResolver.prototype, "upcomingEvents", null);
__decorate([
    (0, graphql_1.Mutation)(() => event_entity_1.Event),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_input_1.CreateEventInput]),
    __metadata("design:returntype", void 0)
], EventsResolver.prototype, "createEvent", null);
exports.EventsResolver = EventsResolver = __decorate([
    (0, graphql_1.Resolver)(() => event_entity_1.Event),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsResolver);
//# sourceMappingURL=events.resolver.js.map