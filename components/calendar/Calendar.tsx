import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar as CalendarNative } from "react-native-calendars";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import { DateData, Theme } from "react-native-calendars/src/types";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import {
  useAppSelector,
  selectActionDays,
  selectSelectedDay,
  useAppDispatch,
  setCurrentDay,
} from "../../store";

export function Calendar() {
  const accentColor = Colors[useColorScheme()].tint;
  const calendarTheme: Theme = {
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
    }
  );

  const dispatch = useAppDispatch();
  const onDayPress = (date: DateData) => {
    dispatch(setCurrentDay(date.dateString));
  };

  useEffect(() => {
    if (selectedDay === "") {
      dispatch(setCurrentDay(new Date().toISOString().split("T")[0]));
    }
  }, []);

  return (
    <CalendarNative
      theme={calendarTheme}
      style={styles.calendar}
      enableSwipeMonths={true}
      hideArrows={false}
      markedDates={markedDates}
      onDayPress={onDayPress}
    ></CalendarNative>
  );
}

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 20,
  },
});
