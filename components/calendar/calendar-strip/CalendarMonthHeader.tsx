import { FontAwesome5 } from '@expo/vector-icons';
import { Moment } from 'moment';
import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { CalendarTheme } from './CalendarTheme';

import { Typography } from '../../../constants';

type CalendarMonthHeaderProps = {
  theme: CalendarTheme;
  nextWeek?: () => void;
  prevWeek?: () => void;
  middleWeekDate: Moment;
  hideArrows?: boolean;
};

CalendarMonthHeader.defaultProps = {
  nextWeek: () => {},
  prevWeek: () => {},
  hideArrows: false,
};

const size = 16;

export function CalendarMonthHeader({
  theme,
  prevWeek,
  nextWeek,
  middleWeekDate,
  hideArrows,
}: CalendarMonthHeaderProps) {
  const lightText = theme.todayTextColor;
  const styles = useMemo(() => styleSheet({ lightText }), [lightText]);

  return (
    <View style={styles.container}>
      {hideArrows ? null : (
        <TouchableOpacity
          style={styles.touchableIcon}
          onPress={() => prevWeek && prevWeek()}
        >
          <FontAwesome5
            size={size * 2}
            color={theme.indicatorColor}
            name="angle-left"
          />
        </TouchableOpacity>
      )}
      <Text style={styles.monthText}>{middleWeekDate.format('MMMM YYYY')}</Text>
      {hideArrows ? null : (
        <TouchableOpacity
          style={styles.touchableIcon}
          onPress={() => nextWeek && nextWeek()}
        >
          <FontAwesome5
            size={size * 2}
            color={theme.indicatorColor}
            name="angle-right"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styleSheet = ({ lightText }: { lightText: string }) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    monthText: {
      textAlign: 'center',
      flex: 1,
      ...Typography.subtitle_1,
      color: lightText,
      paddingVertical: (51 - Typography.subtitle_1.fontSize) / 2,
    },
    touchableIcon: {
      fontWeight: 200,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
  });
