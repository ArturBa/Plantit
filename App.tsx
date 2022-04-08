import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { DbContext } from "./database";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { configureAppStore } from "./store/store";

const dbContext = new DbContext();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const store = configureAppStore();
  useEffect(() => {
    const openDb = async () => {
      await dbContext.database.setUpDataBase();
    };
    openDb();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar style="dark" />
        </Provider>
      </SafeAreaProvider>
    );
  }
}
