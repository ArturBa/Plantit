import { Moment } from 'moment';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { Calendar, CalendarTheme } from './calendar-strip';

import { colors } from '../../constants';
import {
  useAppSelector,
  selectActionDays,
  selectSelectedDay,
  useAppDispatch,
  setCurrentDay,
} from '../../store';

export function CalendarWrapper() {
  const accentColor = colors.accentBasic;
  const backgroundColor = colors.background;
  const textColor = colors.textBlack;
  const textLightColor = colors.textGray;

  const calendarTheme: CalendarTheme = {
    backgroundColor,
    indicatorColor: accentColor,
    textColor,
    textLightColor,
    selectedDayBackgroundColor: accentColor,
    dotColor: accentColor,
    arrowColor: accentColor,
    todayTextColor: accentColor,
  };

  const selectedDay = useAppSelector(selectSelectedDay);
  const actionDay = useAppSelector(selectActionDays);

  const dispatch = useAppDispatch();
  const onDayPress = (date: Moment) => {
    dispatch(setCurrentDay(date.format('YYYY-MM-DD')));
  };

  useEffect(() => {
    if (selectedDay === '') {
      dispatch(setCurrentDay(new Date().toISOString().split('T')[0]));
    }
  }, [selectedDay, dispatch]);

  return (
    <Calendar
      theme={calendarTheme}
      style={styles.calendar}
      selectedDay={selectedDay}
      markedDays={actionDay}
      onDayPressed={onDayPress}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 20,
  },
});
