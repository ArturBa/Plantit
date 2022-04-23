import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

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
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style={colorScheme} />
      </Provider>
    </SafeAreaProvider>
  );
}
