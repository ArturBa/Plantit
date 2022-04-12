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
import { Calendar } from "./calendar";

export function CalendarWrapper() {
  const accentColor = Colors[useColorScheme()].tint;
  const backgroundColor = Colors[useColorScheme()].background;

  // const calendarTheme: Theme = {
  //   backgroundColor: backgroundColor,
  //   calendarBackground: backgroundColor,
  //   indicatorColor: accentColor,
  //   selectedDayBackgroundColor: accentColor,
  //   dotColor: accentColor,
  //   arrowColor: accentColor,
  //   todayTextColor: accentColor,
  // };

  const selectedDay = useAppSelector(selectSelectedDay);
  const actionDay = useAppSelector(selectActionDays).map(
    (day) => new Date(day)
  );
  // const markedDates: { [key: string]: MarkingProps } = actionDay.reduce(
  //   (previous, next: string) => {
  //     return {
  //       ...previous,
  //       [next]: {
  //         ...previous[next],
  //         marked: true,
  //       },
  //     };
  //   },
  //   {
  //     [selectedDay]: {
  //       selected: true,
  //     } as MarkingProps,
  //   }
  // );

  const dispatch = useAppDispatch();
  const onDayPress = (date: string) => {
    dispatch(setCurrentDay(date));
  };

  useEffect(() => {
    if (selectedDay === "") {
      dispatch(setCurrentDay(new Date().toISOString().split("T")[0]));
    }
  }, []);

  return (
    <Calendar />

    // <WeekCalendar />
    // <CalendarNative
    //   theme={calendarTheme}
    //   style={styles.calendar}
    //   enableSwipeMonths={true}
    //   hideArrows={false}
    //   markedDates={markedDates}
    //   onDayPress={onDayPress}
    // ></CalendarNative>
  );
}

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 20,
  },
});
