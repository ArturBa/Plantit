import React from 'react';
import { View, StyleSheet } from 'react-native';

export const decorators = [
  StoryFn => (
    <View style={styles.container}>
      <StoryFn />
    </View>
  ),
];
export const parameters = {};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F4F4F9',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
});
