import { AppRegistry } from 'react-native';
import {
  getStorybookUI,
  configure,
  addDecorator,
} from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

import { loadStories } from './stories';
import './rn-addons';

addDecorator(withKnobs);

// import stories
configure(() => {
  loadStories();
}, module);

export const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
});

AppRegistry.registerComponent('StorybookReactNative', () => StorybookUIRoot);
