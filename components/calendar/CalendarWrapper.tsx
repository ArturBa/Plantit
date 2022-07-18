import { Moment } from 'moment';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { Calendar } from './calendar-strip';
import { CustomCalendarTheme } from './CalendarWrapper.helpers';

import { colors } from '../../constants';
import {
  useAppSelector,
  selectActionDays,
  selectSelectedDay,
  useAppDispatch,
  setCurrentDay,
} from '../../store';

export function CalendarWrapper() {
  const calendarTheme = CustomCalendarTheme(colors);

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
    marginBottom: 8,
  },
});
