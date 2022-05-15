import React from 'react';
import { StyleSheet } from 'react-native';
import NotificationTest from '../components/notification/Test';

import { Button, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Button title="Notify" />
      <NotificationTest />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 8,
  },
});
