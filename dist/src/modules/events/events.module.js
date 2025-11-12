"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const event_entity_1 = require("../../domain/entities/event.entity");
const events_service_1 = require("./events.service");
const events_resolver_1 = require("./events.resolver");
const repository_module_1 = require("../../infra/database/repository.module");
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = __decorate([
    (0, common_1.Module)({
        imports: [...(0, repository_module_1.repositoryModules)([event_entity_1.Event])],
        providers: [events_service_1.EventsService, events_resolver_1.EventsResolver],
        exports: [events_service_1.EventsService]
    })
], EventsModule);
//# sourceMappingURL=events.module.js.map