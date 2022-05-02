import React, { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { Connection, createConnection } from 'typeorm';
import {
  Connection as ConnectionBrowser,
  createConnection as createConnectionBrowser,
} from 'typeorm-browser';

import { PlantRepository } from '../repository/Plant.repository';
import { mobileDbConnection, webDbConnection } from './config';

interface DatabaseConnectionContextData {
  plantsRepository: PlantRepository;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData,
);

export class DatabaseContext {
  protected static async connect() {
    const createConnectionInstance = async (): Promise<
      Connection | ConnectionBrowser
    > => {
      if (Platform.OS === 'web') {
        return createConnectionBrowser(webDbConnection);
      }
      return createConnection(mobileDbConnection);
    };

    return createConnectionInstance()
      .then(this.createDatabaseConnectionContext)
      .catch(console.error);
  }

  protected static createDatabaseConnectionContext = (
    connection: Connection | ConnectionBrowser,
  ) => {
    this.databaseConnectionContext = {
      plantsRepository: new PlantRepository(connection as Connection),
    };
  };

  protected static databaseConnectionContext: DatabaseConnectionContextData;

  static getContext = async (): Promise<DatabaseConnectionContextData> => {
    if (!this.databaseConnectionContext) {
      await this.connect();
    }
    return Promise.resolve(this.databaseConnectionContext);
  };
}

export const DatabaseConnectionProvider: React.FC = ({ children }) => {
  const [databaseConnectionContextData, setDatabaseConnectionContextData] =
    useState<DatabaseConnectionContextData | undefined>(undefined);
  useEffect(() => {
    const getDatabaseContext = async () => {
      await DatabaseContext.getContext().then(setDatabaseConnectionContextData);
    };
    getDatabaseContext();
  }, []);

  if (!databaseConnectionContextData) {
    return <ActivityIndicator />;
  }

  return (
    /* eslint-disable react/jsx-no-constructed-context-values */
    <DatabaseConnectionContext.Provider value={databaseConnectionContextData}>
      {children}
    </DatabaseConnectionContext.Provider>
    /* eslint-enable react/jsx-no-constructed-context-values */
  );
};

export function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext);
  return context;
}
