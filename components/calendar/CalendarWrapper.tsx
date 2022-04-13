import { FlatList, StyleSheet, Text } from "react-native";
import { useEffect } from "react";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import {
  useAppSelector,
  selectActionDays,
  selectSelectedDay,
  useAppDispatch,
  setCurrentDay,
} from "../../store";
import { Calendar, CalendarTheme } from "./calendar";
import { Moment } from "moment";

export function CalendarWrapper() {
  const accentColor = Colors[useColorScheme()].tint;
  const backgroundColor = Colors[useColorScheme()].background;
  const textColor = Colors[useColorScheme()].text;

  const calendarTheme: CalendarTheme = {
    backgroundColor: backgroundColor,
    indicatorColor: accentColor,
    textColor,
    selectedDayBackgroundColor: accentColor,
    dotColor: accentColor,
    arrowColor: accentColor,
    todayTextColor: accentColor,
  };

  const selectedDay = useAppSelector(selectSelectedDay);
  const actionDay = useAppSelector(selectActionDays);

  const dispatch = useAppDispatch();
  const onDayPress = (date: Moment) => {
    dispatch(setCurrentDay(date.format("YYYY-MM-DD")));
  };

  useEffect(() => {
    if (selectedDay === "") {
      dispatch(setCurrentDay(new Date().toISOString().split("T")[0]));
    }
  }, []);

  return (
    <Calendar
      theme={calendarTheme}
      style={styles.calendar}
      selectedDay={selectedDay}
      markedDays={actionDay}
      onDayPressed={onDayPress}
    />

    // <CalendarNative
    //   enableSwipeMonths={true}
    //   hideArrows={false}
    // ></CalendarNative>
  );
}

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 20,
  },
});
