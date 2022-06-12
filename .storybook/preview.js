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
  container: { padding: 8, flex: 1 },
});
