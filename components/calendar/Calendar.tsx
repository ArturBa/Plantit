import { Calendar as CalendarNative } from 'react-native-calendars';
import { DateData, Theme } from 'react-native-calendars/src/types';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import {
  useAppSelector,
  selectActionDays,
  selectSelectedDay,
  useAppDispatch,
  setCurrentDay,
} from '../../store';

export function Calendar() {
  const accentColor = Colors[useColorScheme()].tint;
  const backgroundColor = Colors[useColorScheme()].background;

  const calendarTheme: Theme = {
    backgroundColor,
    calendarBackground: backgroundColor,
    indicatorColor: accentColor,
    selectedDayBackgroundColor: accentColor,
    dotColor: accentColor,
    arrowColor: accentColor,
    todayTextColor: accentColor,
  };

  const selectedDay = useAppSelector(selectSelectedDay);
  const actionDay = useAppSelector(selectActionDays);
  const markedDates: { [key: string]: MarkingProps } = actionDay.reduce(
    (previous, next: string) => {
      return {
        ...previous,
        [next]: {
          ...previous[next],
          marked: true,
        },
      };
    },
    {
      [selectedDay]: {
        selected: true,
      } as MarkingProps,
    },
  );

  const dispatch = useAppDispatch();
  const onDayPress = (date: DateData) => {
    dispatch(setCurrentDay(date.dateString));
  };

  useEffect(() => {
    if (selectedDay === '') {
      dispatch(setCurrentDay(new Date().toISOString().split('T')[0]));
    }
  }, [selectedDay, dispatch]);

  return (
    <CalendarNative
      theme={calendarTheme}
      style={styles.calendar}
      enableSwipeMonths
      hideArrows={false}
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 20,
  },
});
