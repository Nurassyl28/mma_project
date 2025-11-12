import 'dotenv/config';

export const dbMode = (process.env.DB_MODE ?? 'postgres').toLowerCase();
export const isMemoryDb = dbMode === 'memory';
