import { weekdaysShort } from 'moment';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CalendarTheme } from './CalendarTheme';

import { Layout } from '../../../constants';

type CalendarMonthHeaderProps = {
  theme: CalendarTheme;
};

export function WeekDaysHeader({ theme }: CalendarMonthHeaderProps) {
  const lightText = theme.textLightColor;
  const styles = useMemo(() => styleSheet({ lightText }), [lightText]);

  return (
    <View style={styles.container}>
      {weekdaysShort().map(day => (
        <Text style={styles.weekday} key={day}>
          {day}
        </Text>
      ))}
    </View>
  );
}

const styleSheet = ({ lightText }: { lightText: string }) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    weekday: {
      textAlign: 'center',
      color: lightText,
      width: Layout.window.width / 7,
    },
  });
