import 'reflect-metadata';
import React from 'react';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { Provider } from 'react-redux';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { configureAppStore } from './store/store';
import { ProviderCombo } from './components/provider';

export function App() {
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

// STORYBOOK ONLY
const IS_STORYBOOK = true;
console.log('🚀 ~ file: App.tsx ~ line 38 ~ IS_STORYBOOK', IS_STORYBOOK);

// eslint-disable-next-line import/no-mutable-exports
let exportDefault = App;
if (IS_STORYBOOK) {
  /* eslint-disable global-require */
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { StoryBook } = require('./AppStorybook');
  exportDefault = StoryBook;
  /* eslint-enable global-require */
}

export default exportDefault;
