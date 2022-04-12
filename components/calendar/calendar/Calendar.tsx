import { FlatList, StyleSheet, Text, View } from "react-native";
import { CalendarDay } from "./CalendarDay";
import moment, { Moment } from "moment";
import Layout from "../../../constants/Layout";
import { WeekDaysHeader } from "./WeekDaysHeader";
import { useState } from "react";

type CalendarProps = {
  onDayPressed?: (date: Moment) => void;
};

export function Calendar({}: CalendarProps) {
  const [selectedDay, setSelectedDay] = useState(
    moment().weekday(5).startOf("day")
  );
  const renderDays = [moment().weekday(0).startOf("day")];
  [...Array(7 * 3 - 1).keys()].forEach((i) => {
    const newDay = moment(renderDays[0]).add(i + 1, "day");
    renderDays.push(newDay);
  });

  return (
    <View style={styles.container}>
      <WeekDaysHeader />
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={7}
        data={renderDays}
        keyExtractor={(item) => item.toISOString()}
        renderItem={({ item }) => (
          <CalendarDay
            date={item}
            onDayPress={() => setSelectedDay(item)}
            isSelectedDay={item.isSame(selectedDay)}
            isMarked={item.isSame(moment().startOf("day"))}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Layout.window.width,
    paddingVertical: 4,
  },
  weekDaysHeader: {
    flexDirection: "row",
  },
});
