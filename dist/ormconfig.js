"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const fighter_entity_1 = require("./src/domain/entities/fighter.entity");
const event_entity_1 = require("./src/domain/entities/event.entity");
const fight_entity_1 = require("./src/domain/entities/fight.entity");
const ranking_entity_1 = require("./src/domain/entities/ranking.entity");
require("dotenv/config");
const entities = [fighter_entity_1.Fighter, event_entity_1.Event, fight_entity_1.Fight, ranking_entity_1.Ranking];
const migrations = ['src/migrations/*.ts'];
const options = {
    type: 'postgres',
    host: (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : 'localhost',
    port: +((_b = process.env.DB_PORT) !== null && _b !== void 0 ? _b : 5432),
    username: (_c = process.env.DB_USER) !== null && _c !== void 0 ? _c : 'mma',
    password: (_d = process.env.DB_PASS) !== null && _d !== void 0 ? _d : 'mma',
    database: (_e = process.env.DB_NAME) !== null && _e !== void 0 ? _e : 'mma',
    entities,
    migrations,
    synchronize: process.env.DB_SYNCHRONIZE === 'true'
};
exports.default = new typeorm_1.DataSource(options);
//# sourceMappingURL=ormconfig.js.map