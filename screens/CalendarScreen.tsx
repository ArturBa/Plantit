import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";
import { Calendar } from "../components/calendar";

export default function CalendarScreen({
  navigation,
}: RootTabScreenProps<"Calendar">) {
  return (
    <View style={styles.container}>
      <Calendar></Calendar>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
