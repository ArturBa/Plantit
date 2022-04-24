import { Platform } from 'react-native';
import { ConnectionOptions } from 'typeorm';
import * as ExpoSQLite from 'expo-sqlite';
import * as sqljs from 'sql.js';
import path from 'path';

import { PlantEntity } from '../entities/Plant.entity';
import { CreatePlantsTable1650721556938 } from '../migrations';

const commonDbConnection = {
  synchronize: false,
  logging: true,
  entities: [PlantEntity],
  migrations: [CreatePlantsTable1650721556938],
  // migrationsRun: true,
};

const webDbConnection: ConnectionOptions = {
  type: 'sqljs',
  location: 'test',
  autoSave: true,
  // driver: sqljs,
  ...commonDbConnection,
};

const mobileDbConnection: ConnectionOptions = {
  type: 'expo',
  database: 'plantit.db',
  driver: ExpoSQLite,
  ...commonDbConnection,
};

export const dbConnectionOptions = (): ConnectionOptions => {
  if (Platform.OS === 'web') {
    return webDbConnection;
  }
  return mobileDbConnection;
};
