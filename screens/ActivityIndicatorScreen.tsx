import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export interface ActivityIndicatorScreenProps {
  title: string;
}

export function ActivityIndicatorScreen({
  title,
}: ActivityIndicatorScreenProps): React.ReactElement {
  const accentColor = Colors[useColorScheme()].tint;

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