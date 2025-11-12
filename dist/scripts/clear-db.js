"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = require("../ormconfig");
async function main() {
    const ds = await ormconfig_1.default.initialize();
    try {
        await ds.query('TRUNCATE TABLE fights, rankings, events, fighters RESTART IDENTITY CASCADE');
        console.log('Database tables truncated.');
    }
    finally {
        await ds.destroy();
    }
}
main().catch((error) => {
    console.error('Failed to truncate tables:', error);
    process.exitCode = 1;
});
//# sourceMappingURL=clear-db.js.map