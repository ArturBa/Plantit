import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { colors } from '../constants';

export interface ActivityIndicatorScreenProps {
  title: string;
}

export function ActivityIndicatorScreen({
  title,
}: ActivityIndicatorScreenProps): React.ReactElement {
  const accentColor = colors.accentBasic;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <ActivityIndicator size="large" color={accentColor} />
    </View>
  );
}

ActivityIndicatorScreen.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 32,
  },
});
