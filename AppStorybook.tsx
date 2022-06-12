import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StorybookUIRoot } from './storybook';

export function StoryBook() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaProvider style={{ marginTop: 32 }}>
      <StorybookUIRoot />
    </SafeAreaProvider>
  );
}
