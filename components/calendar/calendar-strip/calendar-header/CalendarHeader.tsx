import { FontAwesome5 } from '@expo/vector-icons';
import { Moment } from 'moment';
import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Typography } from '../../../../constants';
import { CalendarTheme, defaultTheme } from '../CalendarTheme';

type CalendarHeaderProps = {
  theme?: CalendarTheme;
  nextWeek?: () => void;
  prevWeek?: () => void;
  middleWeekDate: Moment;
  hideArrows?: boolean;
  firstWeek?: boolean;
};

CalendarHeader.defaultProps = {
  theme: defaultTheme,
  nextWeek: () => {},
  prevWeek: () => {},
  hideArrows: false,
  firstWeek: false,
};

const size = 24;

export function CalendarHeader({
  theme,
  prevWeek,
  nextWeek,
  middleWeekDate,
  hideArrows,
  firstWeek,
}: CalendarHeaderProps) {
  const styles = useMemo(() => styleSheet(theme!), [theme]);

  return (
    <View style={styles.container}>
      {hideArrows ? null : (
        <TouchableOpacity
          style={styles.touchableIcon}
          onPress={() => prevWeek && !firstWeek && prevWeek()}
        >
          {!firstWeek && (
            <FontAwesome5
              size={size}
              color={theme!.textLightColor}
              name="angle-left"
            />
          )}
        </TouchableOpacity>
      )}
      <Text style={styles.monthText}>{middleWeekDate.format('MMMM')}</Text>
      {hideArrows ? null : (
        <TouchableOpacity
          style={styles.touchableIcon}
          onPress={() => nextWeek && nextWeek()}
        >
          <FontAwesome5
            size={size}
            color={theme!.textLightColor}
            name="angle-right"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styleSheet = ({ textLightColor }: CalendarTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    monthText: {
      ...Typography.subtitle_2,
      fontWeight: '700',
      color: textLightColor,
      textAlign: 'center',
    },
    touchableIcon: {
      minHeight: 40,
      minWidth: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
