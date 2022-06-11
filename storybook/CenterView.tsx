import React from 'react';
import { StyleSheet, View } from 'react-native';

export function CenterView({ children }: { children: React.ReactNode }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    alignItems: 'center',
    backgroundColor: '#F4F4F9',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
});
