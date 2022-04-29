import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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

export const DatabaseConnectionProvider: React.FC = ({ children }) => {
  const [connection, setConnection] = useState<
    Connection | ConnectionBrowser | null
  >(null);

  const connect = useCallback(async () => {
    const createConnectionInstance = async (): Promise<
      Connection | ConnectionBrowser
    > => {
      if (Platform.OS === 'web') {
        return createConnectionBrowser(webDbConnection);
      }
      return createConnection(mobileDbConnection);
    };
    createConnectionInstance().then(setConnection).catch(console.error);
  }, []);

  useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connect, connection]);

  const databaseConnectionContextData: DatabaseConnectionContextData | null =
    useMemo(() => {
      if (!connection) {
        return null;
      }

      return {
        plantsRepository: new PlantRepository(connection as Connection),
      };
    }, [connection]);

  if (!connection || !databaseConnectionContextData) {
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
