import 'reflect-metadata';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { configureAppStore } from './store/store';
import { ProviderCombo } from './components/provider';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const store = configureAppStore();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ProviderCombo>
      <Provider store={store}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style={colorScheme} />
      </Provider>
    </ProviderCombo>
  );
}
