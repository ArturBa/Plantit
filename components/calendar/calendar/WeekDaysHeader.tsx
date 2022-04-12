import { weekdaysShort } from "moment";
import { StyleSheet, Text, View } from "react-native";

import Layout from "../../../constants/Layout";

export function WeekDaysHeader() {
  return (
    <View style={styles.container}>
      {weekdaysShort().map((day) => (
        <Text style={styles.weekday} key={day}>
          {day}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  weekday: {
    textAlign: "center",
    width: Layout.window.width / 7,
  },
});
