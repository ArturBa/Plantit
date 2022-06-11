import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { CareScheduledNotification } from '../components/notification/CareScheduledNotification';

import { Button, View } from '../components/Themed';

export default function SettingsScreen() {
  const onNotifyClick = () => {
    CareScheduledNotification();
  };

  return (
    <View style={styles.container}>
      <Button title="Notify" onPress={onNotifyClick} />
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
