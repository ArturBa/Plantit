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
import { nextWeekDays, renderedDays, toMomentDate } from './Calendar.helper';
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

  const endReached = () => {
    setRenderDays([
      ...renderDays,
      ...nextWeekDays(renderDays[renderDays.length - 1]),
    ]);
  };

  return (
    <View style={[styles.container, style && style]}>
      <CalendarHeader
        theme={themeToUse}
        nextWeek={() => setCurrentPage(currentPage + 1)}
        prevWeek={() => setCurrentPage(currentPage - 1)}
        middleWeekDate={moment(renderDays[10])}
        hideArrows={hideArrows}
        firstWeek={currentPage === 0}
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
        onEndReached={endReached}
        onEndReachedThreshold={0.7}
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
