import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { CalendarTheme } from '../CalendarTheme';

type MarkerProps = {
  theme: CalendarTheme;
  marked: boolean;
  selected: boolean;
  style?: StyleProp<ViewStyle>;
};

Marker.defaultProps = {
  style: null,
};

export function Marker({ theme, style, marked, selected }: MarkerProps) {
  const styles = styleSheet(theme);
  return (
    <View
      style={[
        styles.container,
        style && style,
        marked && !selected && styles.colored,
      ]}
    />
  );
}

const dotSize = 4;

const styleSheet = ({ dotColor }: CalendarTheme) =>
  StyleSheet.create({
    container: {
      height: dotSize,
      width: dotSize * 3,
      borderRadius: dotSize / 2,
    },
    colored: {
      backgroundColor: dotColor,
    },
  });
