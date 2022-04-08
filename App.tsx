import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";

import { DbContext } from "./database";
import { useCachedResourcesAsync } from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { configureAppStore } from "./store/store";

const dbContext = new DbContext();
const allSettled = (promises: any[]) => {
  return Promise.all(
    promises.map((promise) =>
      promise
        .then((value: any) => ({ state: "fulfilled", value }))
        .catch((reason: any) => ({ state: "rejected", reason }))
    )
  );
};

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const colorScheme = useColorScheme();
  const store = configureAppStore();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    const initApp = async () => {
      allSettled([
        useCachedResourcesAsync(),
        dbContext.database.setUpDataBase(),
      ]).then(() => {
        SplashScreen.hideAsync();
        setLoadingComplete(true);
        console.log("ready now", isLoadingComplete);
      });
    };
    initApp();
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
