import { FontAwesome5 } from '@expo/vector-icons';
import { Moment } from 'moment';
import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { CalendarTheme } from './CalendarTheme';

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
  const lightText = theme.textLightColor;
  const styles = useMemo(() => styleSheet({ lightText }), [lightText]);

  return (
    <View style={styles.container}>
      {hideArrows ? null : (
        <TouchableOpacity
          style={styles.touchableIcon}
          onPress={() => prevWeek && prevWeek()}
        >
          <FontAwesome5
            size={size}
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
            size={size}
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
    },
    monthText: {
      fontSize: size,
      fontWeight: 'bold',
      color: lightText,
      paddingVertical: 4,
      textAlign: 'center',
      flex: 1,
    },
    touchableIcon: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
  });
