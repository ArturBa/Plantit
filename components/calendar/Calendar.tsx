import { StyleSheet, View } from "react-native";
import { Calendar as CalendarNative } from "react-native-calendars";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import { Theme } from "react-native-calendars/src/types";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

export function Calendar() {
  const accentColor = Colors[useColorScheme()].tint;
  const actionDays = ["2022-04-15", "2022-04-16", "2022-04-22", "2022-04-21"];
  const selected = "2022-04-04";

  const calendarTheme: Theme = {
    indicatorColor: accentColor,
    selectedDayBackgroundColor: accentColor,
    dotColor: accentColor,
    arrowColor: accentColor,
    todayTextColor: accentColor,
  };

  const markedDates: { [key: string]: MarkingProps } = actionDays.reduce(
    (previous, next: string) => {
      return {
        ...previous,
        [next]: { marked: true },
      };
    },
    {
      [selected]: {
        selected: true,
      },
    }
  );

  return (
    <View>
      <CalendarNative
        theme={calendarTheme}
        style={styles.calendar}
        enableSwipeMonths={true}
        hideArrows={false}
        markedDates={markedDates}
      ></CalendarNative>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
