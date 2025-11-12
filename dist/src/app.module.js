"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const typeorm_1 = require("@nestjs/typeorm");
const path_1 = require("path");
const ormconfig_1 = require("../ormconfig");
const database_constants_1 = require("./infra/database/database.constants");
const in_memory_module_1 = require("./infra/database/in-memory.module");
const ranking_queue_module_1 = require("./infra/ranking-queue/ranking.queue.module");
const fighters_module_1 = require("./modules/fighters/fighters.module");
const events_module_1 = require("./modules/events/events.module");
const fights_module_1 = require("./modules/fights/fights.module");
const rankings_module_1 = require("./modules/rankings/rankings.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'schema.gql'),
                sortSchema: true
            }),
            ...(database_constants_1.isMemoryDb ? [in_memory_module_1.InMemoryDatabaseModule] : [typeorm_1.TypeOrmModule.forRoot(ormconfig_1.default.options)]),
            ranking_queue_module_1.RankingQueueModule,
            fighters_module_1.FightersModule,
            events_module_1.EventsModule,
            fights_module_1.FightsModule,
            rankings_module_1.RankingsModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map