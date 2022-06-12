import * as ExpoSQLite from 'expo-sqlite';
import { ConnectionOptions } from 'typeorm';
import { ConnectionOptions as ConnectionOptionsBrowser } from 'typeorm-browser';

import { PlantEntity } from '../entities/Plant.entity';
import { CreatePlantsTable1650721556938 } from '../migrations';

const commonDbConnection = {
  database: 'plantit.db',
  entities: [PlantEntity],

  migrations: [CreatePlantsTable1650721556938],
  migrationsRun: true,

  synchronize: false,
  logging: true,
};

export const mobileDbConnection: ConnectionOptions = {
  type: 'expo',
  driver: ExpoSQLite,
  ...commonDbConnection,
};

export const webDbConnection: ConnectionOptionsBrowser = {
  type: 'websql',
  ...commonDbConnection,
};
