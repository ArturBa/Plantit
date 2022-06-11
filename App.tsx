import 'reflect-metadata';
import React from 'react';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { configureAppStore } from './store/store';
import { ProviderCombo } from './components/provider';
import { StorybookUIRoot } from './storybook';

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const store = configureAppStore();

  if (!isLoadingComplete) {
    return null;
  }

  const statusBarStyle: StatusBarStyle = 'inverted';

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

function StoryBook() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaProvider style={{ marginTop: 32 }}>
      <StorybookUIRoot />
    </SafeAreaProvider>
  );
}

const IS_STORYBOOK = true;
export default IS_STORYBOOK ? StoryBook : App;
