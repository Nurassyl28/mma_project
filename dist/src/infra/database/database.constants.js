"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMemoryDb = exports.dbMode = void 0;
require("dotenv/config");
exports.dbMode = ((_a = process.env.DB_MODE) !== null && _a !== void 0 ? _a : 'postgres').toLowerCase();
exports.isMemoryDb = exports.dbMode === 'memory';
//# sourceMappingURL=database.constants.js.map