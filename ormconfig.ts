import { DataSource, DataSourceOptions } from 'typeorm';
import { Fighter } from './src/domain/entities/fighter.entity';
import { Event } from './src/domain/entities/event.entity';
import { Fight } from './src/domain/entities/fight.entity';
import { Ranking } from './src/domain/entities/ranking.entity';
import 'dotenv/config';

const entities = [Fighter, Event, Fight, Ranking];
const migrations = ['src/migrations/*.ts'];

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: +(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'mma',
  password: process.env.DB_PASS ?? 'mma',
  database: process.env.DB_NAME ?? 'mma',
  entities,
  migrations,
  synchronize: process.env.DB_SYNCHRONIZE === 'true'
};

export default new DataSource(options);
