import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { CalendarDay } from './CalendarDay';
import moment, { Moment } from 'moment';
import Layout from '../../../constants/Layout';
import { WeekDaysHeader } from './WeekDaysHeader';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CalendarMonthHeader } from './CalendarMonthHeader';

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
  backgroundColor: 'white',
  indicatorColor: 'green',
  textColor: 'black',
  selectedDayBackgroundColor: 'green',
  dotColor: 'green',
  arrowColor: 'green',
  todayTextColor: 'green',
};

type CalendarProps = {
  theme?: CalendarTheme;
  style?: StyleProp<ViewStyle>;
  selectedDay: string | Date | Moment;
  onDayPressed?: (date: Moment) => void;
  markedDays?: string[] | Date[] | Moment[];
};

const width = Layout.window.width;

const getBaseWeekDays = (currentDate: Moment): Moment[] => {
  const days: Moment[] = [];
  const baseDay = currentDate.isValid() ? currentDate : moment().startOf('day');
  const weekdaySelected = baseDay.weekday();

  const baseDayWeekStart = baseDay.clone().subtract(weekdaySelected, 'day');

  [...Array(7).keys()].forEach((i) => {
    const newDay = moment(baseDayWeekStart).add(i, 'day');
    days.push(newDay);
  });

  return days;
};
const prevWeekDays = (currentDate: Moment): Moment[] => {
  const days: Moment[] = [];
  [...Array(7).keys()].forEach((i) => {
    const newDay = moment(currentDate).subtract(i + 1, 'day');
    days.push(newDay);
  });
  return days.sort((a, b) => a.diff(b));
};
const nextWeekDays = (currentDate: Moment): Moment[] => {
  const days: Moment[] = [];
  [...Array(7).keys()].forEach((i) => {
    const newDay = moment(currentDate).add(i + 1, 'day');
    days.push(newDay);
  });
  return days.sort((a, b) => a.diff(b));
};

const renderedDays = (currentDate: Moment): Moment[] => {
  const baseDays = getBaseWeekDays(currentDate);
  return baseDays;
  const previousDays = prevWeekDays(baseDays[0]);
  const nextDays = nextWeekDays(baseDays[6]);
  return [...previousDays, ...baseDays, ...nextDays];
};

function toMomentDate(date: string | Date | Moment): Moment {
  if (typeof date === 'string') {
    return moment(date).startOf('day');
  }
  if (date instanceof Date) {
    return moment(date).startOf('day');
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
  const [currentPage, setCurrentPage] = useState(1);

  const selectedDayMoment = toMomentDate(selectedDay);
  const [renderDays, setRenderDays] = useState(renderedDays(selectedDayMoment));
  const themeToUse = { ...defaultTheme, ...theme };
  const flatListRef = useRef<FlatList<Moment>>(null);

  const markedDaysMoment = markedDays?.map(toMomentDate);

  useEffect(() => {
    scrollToPage(false);
  }, [flatListRef]);

  useEffect(() => {
    scrollToPage();
  }, [currentPage]);

  const scrollToPage = (animated = true) => {
    try {
      flatListRef.current?.scrollToIndex({
        index: currentPage * 7,
        animated,
      });
    } catch {
      console.log('Scroll to index failed');
    }
  };

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setCurrentPage(
      Math.floor(
        Math.floor(event.nativeEvent.contentOffset.x) /
          Math.floor(event.nativeEvent.layoutMeasurement.width)
      )
    );
  };

  const styles = styleSheet(themeToUse);
  if (renderDays.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style && style]}>
      <CalendarMonthHeader
        theme={themeToUse}
        nextWeek={() => setCurrentPage(currentPage + 1)}
        prevWeek={() => setCurrentPage(currentPage - 1)}
        middleWeekDate={moment(renderDays[10])}
      />
      <WeekDaysHeader />
      <FlatList
        // style={[{ flex: 1 }]}
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
      flexDirection: 'row',
    },
  });
