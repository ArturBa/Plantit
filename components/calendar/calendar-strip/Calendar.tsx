import moment, { Moment } from 'moment';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { CalendarDay } from './calendar-day';
import { CalendarHeader } from './calendar-header';
import { CalendarTheme, defaultTheme } from './CalendarTheme';

import { Layout } from '../../../constants';

type CalendarProps = {
  theme?: CalendarTheme;
  style?: StyleProp<ViewStyle>;
  selectedDay: string | Date | Moment;
  onDayPressed?: (date: Moment) => void;
  markedDays?: string[] | Date[] | Moment[];
  hideArrows?: boolean;
};

Calendar.defaultProps = {
  theme: defaultTheme,
  style: {},
  onDayPressed: () => {},
  markedDays: [],
  hideArrows: false,
};

const { width } = Layout.window;

const getBaseWeekDays = (currentDate: Moment): Moment[] => {
  const days: Moment[] = [];
  const baseDay = currentDate.isValid() ? currentDate : moment().startOf('day');
  const weekdaySelected = baseDay.weekday();

  const baseDayWeekStart = baseDay.clone().subtract(weekdaySelected, 'day');

  [...Array(7).keys()].forEach(i => {
    const newDay = moment(baseDayWeekStart).add(i, 'day');
    days.push(newDay);
  });

  return days;
};
const prevWeekDays = (currentDate: Moment): Moment[] => {
  const days: Moment[] = [];
  [...Array(7).keys()].forEach(i => {
    const newDay = moment(currentDate).subtract(i + 1, 'day');
    days.push(newDay);
  });
  return days.sort((a, b) => a.diff(b));
};
const nextWeekDays = (currentDate: Moment): Moment[] => {
  const days: Moment[] = [];
  [...Array(7).keys()].forEach(i => {
    const newDay = moment(currentDate).add(i + 1, 'day');
    days.push(newDay);
  });
  return days.sort((a, b) => a.diff(b));
};

const renderedDays = (currentDate: Moment): Moment[] => {
  const baseDays = getBaseWeekDays(currentDate);
  return baseDays;
};

function toMomentDate(date: string | Date | Moment): Moment {
  if (typeof date === 'string') {
    return moment(date).startOf('day');
  }
  if (date instanceof Date) {
    return moment(date).startOf('day');
  }
  return date.startOf('day');
}

export function Calendar({
  theme,
  style,
  selectedDay,
  markedDays,
  onDayPressed,
  hideArrows,
}: CalendarProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const selectedDayMoment = toMomentDate(selectedDay);
  const [renderDays, setRenderDays] = useState(renderedDays(selectedDayMoment));
  const themeToUse = { ...defaultTheme, ...theme };
  const flatListRef = useRef<FlatList<Moment>>(null);

  const markedDaysMoment = markedDays?.map(toMomentDate);

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

  useEffect(() => {
    scrollToPage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flatListRef]);

  useEffect(() => {
    scrollToPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setCurrentPage(
      Math.floor(
        Math.floor(event.nativeEvent.contentOffset.x) /
          Math.floor(event.nativeEvent.layoutMeasurement.width),
      ),
    );
  };

  const styles = styleSheet(themeToUse);
  if (renderDays.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style && style]}>
      <CalendarHeader
        theme={themeToUse}
        nextWeek={() => setCurrentPage(currentPage + 1)}
        prevWeek={() => setCurrentPage(currentPage - 1)}
        middleWeekDate={moment(renderDays[10])}
        hideArrows={hideArrows}
      />
      <FlatList
        horizontal
        ref={flatListRef}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={renderDays}
        snapToInterval={width}
        decelerationRate="fast"
        keyExtractor={item => item.toISOString()}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item }) => (
          <CalendarDay
            date={item}
            theme={themeToUse}
            onPress={() => onDayPressed && onDayPressed(item)}
            selected={item.isSame(selectedDay)}
            marked={markedDaysMoment?.some(markedDay => markedDay.isSame(item))}
          />
        )}
      />
    </View>
  );
}

const styleSheet = ({ backgroundColor }: CalendarTheme) =>
  StyleSheet.create({
    container: {
      width,
      paddingVertical: 4,
      backgroundColor,
    },
    weekDaysHeader: {
      flexDirection: 'row',
    },
  });
