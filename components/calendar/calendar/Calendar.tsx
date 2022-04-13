import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
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
import { useEffect, useMemo, useRef, useState } from "react";
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

const renderedDays = (currentDate: Moment): Moment[] => {
  const days: Moment[] = [];
  const baseDay = currentDate.isValid() ? currentDate : moment().startOf("day");
  const weekdaySelected = baseDay.weekday();

  const baseDayWeekStart = baseDay.clone().subtract(weekdaySelected, "day");

  [...Array(7 * 3 - 1).keys()].forEach((i) => {
    const newDay = moment(baseDayWeekStart).add(i - 7, "day");
    days.push(newDay);
  });

  return days;
};

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

  const selectedDayMoment = toMomentDate(selectedDay);
  const markedDaysMoment = markedDays?.map(toMomentDate);
  const renderDays: Moment[] = useMemo(
    () => renderedDays(selectedDayMoment),
    [selectedDayMoment]
  );

  let currentWeekIndex = 1;
  const onNextWeek = () => {
    currentWeekIndex++;
    goToCurrentIndex();
  };
  const onPrevWeek = () => {
    currentWeekIndex--;
    goToCurrentIndex();
  };

  const goToCurrentIndex = (animated = true) => {
    try {
      flatListRef.current?.scrollToIndex({
        index: currentWeekIndex * 7,
        animated,
      });
    } catch {
      console.log("Web: Scroll to index failed");
    }
  };

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    currentWeekIndex = Math.floor(
      Math.floor(event.nativeEvent.contentOffset.x) /
        Math.floor(event.nativeEvent.layoutMeasurement.width)
    );
  };

  const styles = styleSheet(themeToUse);

  return (
    <View style={[styles.container, style && style]}>
      <CalendarMonthHeader
        theme={themeToUse}
        nextWeek={onNextWeek}
        prevWeek={onPrevWeek}
        middleWeekDate={moment(renderDays[10])}
      />
      <WeekDaysHeader />
      {renderDays.length > 0 && (
        <FlatList
          style={[{ flex: 1 }]}
          horizontal
          ref={flatListRef}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={renderDays}
          snapToInterval={width}
          decelerationRate="fast"
          keyExtractor={(item) => item.toISOString()}
          onMomentumScrollEnd={onScrollEnd}
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
      )}
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
