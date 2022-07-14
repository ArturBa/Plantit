import { Moment } from 'moment';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { Date } from './Date';
import { Marker } from './Marker';
import { WeekDay } from './WeekDay';

import { Layout } from '../../../../constants';
import { CalendarTheme, defaultTheme } from '../CalendarTheme';

type CalendarDayProps = {
  date: Moment;
  style?: StyleProp<ViewStyle>;
  selected?: boolean;
  marked?: boolean;
  onPress?: () => void;
  theme?: CalendarTheme;
};

CalendarDay.defaultProps = {
  style: null,
  selected: false,
  marked: false,
  onPress: null,
  theme: defaultTheme,
};

export function CalendarDay({
  theme,
  date,
  onPress,
  selected,
  marked,
  style,
}: CalendarDayProps) {
  const styles = styleSheet();

  return (
    <TouchableOpacity
      style={[styles.container, style && style]}
      onPress={() => onPress && onPress()}
    >
      <WeekDay date={date} theme={theme!} style={styles.marginBottom} />
      <Date
        date={date}
        theme={theme!}
        selected={selected!}
        style={styles.marginBottom}
      />
      <Marker
        theme={theme!}
        selected={selected!}
        marked={marked!}
        style={styles.marginMinusTop}
      />
    </TouchableOpacity>
  );
}

const itemWidth = Layout.window.width / 7;

const styleSheet = () =>
  StyleSheet.create({
    container: {
      width: itemWidth,
      justifyContent: 'center',
      alignItems: 'center',
    },
    marginBottom: {
      marginBottom: 4,
    },
    marginMinusTop: {
      marginTop: -8,
    },
  });
