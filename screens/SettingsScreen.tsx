import React from 'react';
import { StyleSheet } from 'react-native';

import { CareScheduledNotification } from '../components/notification/CareScheduledNotification';
import { Button, View } from '../components/themed';

export default function SettingsScreen() {
  const onClick = () => {
    CareScheduledNotification();
  };

  return (
    <View style={styles.container}>
      <Button title="Notify" onPress={onClick} />
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
