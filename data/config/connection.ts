import { createContext } from 'react';

import { PlantRepository } from '../repository/Plant.repository';

export interface DatabaseConnectionContextData {
  plantsRepository: PlantRepository;
}

export const DatabaseConnectionContext =
  createContext<DatabaseConnectionContextData>(
    {} as DatabaseConnectionContextData,
  );
