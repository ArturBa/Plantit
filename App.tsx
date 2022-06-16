import 'reflect-metadata';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';

import { ProviderCombo } from './components/provider';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { configureAppStore } from './store/store';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const store = configureAppStore();

  if (!isLoadingComplete) {
    return null;
  }

  const statusBarStyle: StatusBarStyle = 'dark';

  return (
    <ProviderCombo>
      <Provider store={store}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar
          // eslint-disable-next-line react/style-prop-object
          style={statusBarStyle}
        />
      </Provider>
    </ProviderCombo>
  );
}
