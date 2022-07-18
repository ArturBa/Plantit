import { StyleSheet } from 'react-native';

import { Calendar, DailyToDo } from '../components/calendar';
import { View } from '../components/themed';
import { RootTabScreenProps } from '../types';

export default function CalendarScreen({
  navigation,
}: RootTabScreenProps<'Calendar'>) {
  return (
    <View style={styles.container}>
      <Calendar />
      <DailyToDo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});
