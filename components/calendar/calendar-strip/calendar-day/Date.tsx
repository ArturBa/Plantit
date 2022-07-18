import moment, { Moment } from 'moment';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Typography } from '../../../../constants';
import { CalendarTheme } from '../CalendarTheme';

export type DateParams = {
  date: Moment;
  theme: CalendarTheme;
  selected: boolean;
  style?: StyleProp<ViewStyle>;
};

Date.defaultProps = {
  style: null,
};

export function Date({ date, theme, selected, style }: DateParams) {
  const styles = styleSheet(theme);
  const today = moment();
  const isToday = today.startOf('D').isSame(date.startOf('D'));

  return (
    <View
      style={[styles.container, selected && styles.selected, style && style]}
    >
      <Text
        style={[
          styles.date,
          isToday && !selected && styles.today,
          selected && styles.selected,
        ]}
      >
        {date.format('D')}
      </Text>
    </View>
  );
}

const styleSheet = ({
  textColor,
  todayTextColor,
  selectedDayBackgroundColor,
  backgroundColor,
}: CalendarTheme) =>
  StyleSheet.create({
    container: {
      minHeight: 40,
      minWidth: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10000,
      overflow: 'hidden',
    },
    date: {
      ...Typography.subtitle_2,
      color: textColor,
    },
    today: {
      color: todayTextColor,
      fontWeight: '700',
    },
    selected: {
      backgroundColor: selectedDayBackgroundColor,
      color: backgroundColor,
    },
  });
