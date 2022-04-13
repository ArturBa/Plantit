import { FontAwesome5 } from "@expo/vector-icons";
import { ThemeProvider } from "@react-navigation/native";
import moment, { Moment } from "moment";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { CalendarTheme } from "./Calendar";

type CalendarMonthHeaderProps = {
  theme: CalendarTheme;
  nextWeek?: () => void;
  prevWeek?: () => void;
  middleWeekDate: Moment;
};

const size = 16;

export function CalendarMonthHeader({
  theme,
  prevWeek,
  nextWeek,
  middleWeekDate,
}: CalendarMonthHeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableIcon}
        onPress={() => prevWeek && prevWeek()}
      >
        <FontAwesome5
          size={size}
          color={theme.indicatorColor}
          name="angle-left"
        />
      </TouchableOpacity>
      <Text style={styles.monthText}>{middleWeekDate.format("MMMM YYYY")}</Text>
      <TouchableOpacity
        style={styles.touchableIcon}
        onPress={() => nextWeek && nextWeek()}
      >
        <FontAwesome5
          size={size}
          color={theme.indicatorColor}
          name="angle-right"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  monthText: {
    fontSize: size,
    fontWeight: "bold",
    color: "hsl(0, 0%, 50%)",
    paddingVertical: 4,
  },
  touchableIcon: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
