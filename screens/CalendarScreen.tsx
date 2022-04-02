import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Calendar, DailyToDo } from "../components/calendar";

export default function CalendarScreen({
  navigation,
}: RootTabScreenProps<"Calendar">) {
  return (
    <View style={styles.container}>
      <Calendar></Calendar>
      <DailyToDo></DailyToDo>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
