import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DatabaseConnectionProvider } from '../../data/config/ConnectionProvider';

const compose = (
  providers: React.FC<{ children: React.ReactNode }>[],
): React.FC<{ children: React.ReactNode }> =>
  providers.reduce(
    (Prev, Curr) =>
      ({ children }: { children: React.ReactNode }) =>
        (
          <Prev>
            <Curr>{children}</Curr>
          </Prev>
        ),
  );

export const ProviderCombo = compose([
  SafeAreaProvider,
  DatabaseConnectionProvider,
]);
