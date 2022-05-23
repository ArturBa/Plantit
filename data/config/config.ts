import { ConnectionOptions } from 'typeorm';
import { ConnectionOptions as ConnectionOptionsBrowser } from 'typeorm-browser';
import * as ExpoSQLite from 'expo-sqlite';

import * as Entities from '../entities';
import * as Migrations from '../migrations';

const commonDbConnection = {
  database: 'plantit.db',
  entities: [Entities.PlantEntity, Entities.ActionEntity],
  migrations: [
    Migrations.CreatePlantsTable1650721556938,
    Migrations.CreateActionTable1652542730718,
  ],
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
