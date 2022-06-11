import 'reflect-metadata';
import React from 'react';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { Provider } from 'react-redux';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { configureAppStore } from './store/store';
import { ProviderCombo } from './components/provider';

// export default function App() {
//   const isLoadingComplete = useCachedResources();
//   const colorScheme = useColorScheme();
//   const store = configureAppStore();

//   if (!isLoadingComplete) {
//     return null;
//   }

//   const statusBarStyle: StatusBarStyle = 'inverted';

//   return (
//     <ProviderCombo>
//       <Provider store={store}>
//         <Navigation colorScheme={colorScheme} />
//         <StatusBar
//           // eslint-disable-next-line react/style-prop-object
//           style={statusBarStyle}
//         />
//       </Provider>
//     </ProviderCombo>
//   );
// }

// eslint-disable-next-line no-restricted-exports
export { default } from './storybook';
