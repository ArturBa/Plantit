import { Moment } from 'moment';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import { Typography } from '../../../../constants';
import { CalendarTheme } from '../CalendarTheme';

export type WeekDayParams = {
  date: Moment;
  theme: CalendarTheme;
  style?: StyleProp<TextStyle>;
};

WeekDay.defaultProps = {
  style: null,
};

export function WeekDay({ date, theme, style }: WeekDayParams) {
  const styles = styleSheet(theme);
  return (
    <Text style={[styles.container, style && style]}>{date.format('ddd')}</Text>
  );
}

const styleSheet = ({ textLightColor }: CalendarTheme) =>
  StyleSheet.create({
    container: {
      ...Typography.caption_2,
      color: textLightColor,
    },
  });
