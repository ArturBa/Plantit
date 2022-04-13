import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { CalendarDay } from "./CalendarDay";
import moment, { Moment } from "moment";
import Layout from "../../../constants/Layout";
import { WeekDaysHeader } from "./WeekDaysHeader";
import { useRef, useState } from "react";
import { CalendarMonthHeader } from "./CalendarMonthHeader";

export interface CalendarTheme {
  backgroundColor?: string;
  textColor?: string;
  indicatorColor?: string;
  selectedDayBackgroundColor?: string;
  dotColor?: string;
  arrowColor?: string;
  todayTextColor?: string;
}
const defaultTheme: CalendarTheme = {
  backgroundColor: "white",
  indicatorColor: "green",
  textColor: "black",
  selectedDayBackgroundColor: "green",
  dotColor: "green",
  arrowColor: "green",
  todayTextColor: "green",
};

type CalendarProps = {
  theme?: CalendarTheme;
  style?: StyleProp<ViewStyle>;
  selectedDay: string | Date | Moment;
  onDayPressed?: (date: Moment) => void;
  markedDays?: string[] | Date[] | Moment[];
};

const width = Layout.window.width;

function toMomentDate(date: string | Date | Moment): Moment {
  if (typeof date === "string") {
    return moment(date).startOf("day");
  }
  if (date instanceof Date) {
    return moment(date).startOf("day");
  }
  return date;
}

export function Calendar({
  theme,
  style,
  selectedDay,
  markedDays,
  onDayPressed,
}: CalendarProps) {
  const themeToUse = { ...defaultTheme, ...theme };
  const flatListRef = useRef<FlatList<Moment>>(null);

  selectedDay = toMomentDate(selectedDay);
  const markedDaysMoment = markedDays?.map(toMomentDate);

  const renderDays = [moment().weekday(0).startOf("day")];
  [...Array(7 * 3 - 1).keys()].forEach((i) => {
    const newDay = moment(renderDays[0]).add(i + 1, "day");
    renderDays.push(newDay);
  });

  let currentWeekIndex = 0;
  const nextWeek = () => {
    console.log(currentWeekIndex);
    currentWeekIndex++;
    flatListRef.current?.scrollToIndex({
      index: currentWeekIndex * 7,
      animated: true,
    });
  };
  const prevWeek = () => {
    console.log(currentWeekIndex);
    currentWeekIndex--;
    flatListRef.current?.scrollToIndex({
      index: currentWeekIndex * 7,
      animated: true,
    });
  };

  const styles = styleSheet(themeToUse);

  return (
    <View style={[styles.container, style && style]}>
      <CalendarMonthHeader
        theme={themeToUse}
        nextWeek={nextWeek}
        prevWeek={prevWeek}
        middleWeekDate={moment(renderDays[3]).add(currentWeekIndex * 7, "day")}
      />
      <WeekDaysHeader />
      <FlatList
        horizontal
        ref={flatListRef}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={renderDays}
        snapToInterval={width}
        decelerationRate="fast"
        keyExtractor={(item) => item.toISOString()}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(
            Math.floor(event.nativeEvent.contentOffset.x) /
              Math.floor(event.nativeEvent.layoutMeasurement.width)
          );
          console.log("index", index);
          currentWeekIndex = index;
        }}
        renderItem={({ item }) => (
          <CalendarDay
            date={item}
            theme={themeToUse}
            onDayPress={() => onDayPressed && onDayPressed(item)}
            isSelectedDay={item.isSame(selectedDay)}
            isMarked={markedDaysMoment?.some((markedDay) =>
              markedDay.isSame(item)
            )}
          />
        )}
      />
    </View>
  );
}

const styleSheet = ({ backgroundColor }: CalendarTheme) =>
  StyleSheet.create({
    container: {
      width: width,
      paddingVertical: 4,
      backgroundColor,
    },
    weekDaysHeader: {
      flexDirection: "row",
    },
  });
