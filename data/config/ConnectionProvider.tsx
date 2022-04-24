import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useMemo,
} from 'react';
import { ActivityIndicator } from 'react-native';
import { Connection, createConnection } from 'typeorm';
import { PlantRepository } from '../repository/Plant.repository';
import { dbConnectionOptions } from './config';
import {
  DatabaseConnectionContext,
  DatabaseConnectionContextData,
} from './connection';

export const DatabaseConnectionProvider: React.FC = ({ children }) => {
  const [connection, setConnection] = useState<Connection | null>(null);

  const connect = useCallback(async () => {
    const dbOptions = dbConnectionOptions();
    console.log('dbOptions', dbOptions);
    const createdConnection = await createConnection(dbOptions);

    setConnection(createdConnection);
  }, []);

  useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connect, connection]);

  if (!connection) {
    return <ActivityIndicator />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const databaseValue = useMemo<DatabaseConnectionContextData>(
  //   () => ({
  //     plantsRepository: new PlantRepository(connection),
  //   }),
  //   [connection],
  // );
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const databaseValue = {
    plantsRepository: new PlantRepository(connection),
  };

  return (
    <DatabaseConnectionContext.Provider value={databaseValue}>
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

export function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext);

  return context;
}
