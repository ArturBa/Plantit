import moment, { Moment } from 'moment';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { CalendarTheme } from './CalendarTheme';

import { Layout, Typography } from '../../../constants';

type CalendarDayProps = {
  date: Moment;
  style?: StyleProp<ViewStyle>;
  isSelectedDay?: boolean;
  isMarked?: boolean;
  onDayPress?: () => void;
  theme: CalendarTheme;
};

CalendarDay.defaultProps = {
  style: {},
  isSelectedDay: false,
  isMarked: false,
  onDayPress: () => {},
};

export function CalendarDay({
  date,
  style,
  onDayPress,
  isSelectedDay,
  isMarked,
  theme,
}: CalendarDayProps) {
  const isToday = date.startOf('day').isSame(moment().startOf('day'));
  const styles = stylesSheet(theme);

  return (
    <View style={[styles.container, styles.center, style && style]}>
      <TouchableOpacity
        style={[
          styles.touchable,
          styles.center,
          isSelectedDay && styles.selectedDay,
        ]}
        onPress={() => onDayPress && onDayPress()}
      >
        <Text
          style={[
            styles.dayText,
            isToday && styles.today,
            isSelectedDay && styles.todaySelected,
          ]}
        >
          {date.format('D')}
        </Text>
        {isMarked && <View style={styles.marker} />}
      </TouchableOpacity>
    </View>
  );
}

const itemWidth = Layout.window.width / 7;
const containerPadding = 8;
const markerSize = 4;

const stylesSheet = ({
  selectedDayBackgroundColor,
  backgroundColor,
  dotColor,
  todayTextColor,
  textColor,
}: CalendarTheme) =>
  StyleSheet.create({
    container: {
      borderRadius: itemWidth / 2,
      width: itemWidth,
      height: itemWidth,
      overflow: 'hidden',
      padding: containerPadding,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedDay: {
      backgroundColor: selectedDayBackgroundColor,
    },
    touchable: {
      width: itemWidth - 2 * containerPadding,
      height: itemWidth - 2 * containerPadding,
      borderRadius: (itemWidth - 2 * containerPadding) / 2,
    },
    dayText: {
      ...Typography.subtitle_2,
      color: textColor,
    },
    today: {
      color: todayTextColor,
    },
    todaySelected: {
      color: backgroundColor,
    },
    marker: {
      position: 'absolute',
      bottom: 4,
      left: '50%',
      width: markerSize,
      height: markerSize,
      borderRadius: markerSize / 2,
      backgroundColor: dotColor,
      transform: [
        {
          translateX: -markerSize / 2,
        },
      ],
    },
  });
