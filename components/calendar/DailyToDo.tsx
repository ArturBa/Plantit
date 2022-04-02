import { FlatList, ScrollView, StyleSheet } from "react-native";

import {
  selectActionIds,
  selectSelectedDay,
  useAppSelector,
} from "../../store";
import { Text, View } from "../Themed";
import { DailyToDoPlant } from "./DailyToDoPlant";

export function DailyToDo() {
  const selectedDay = useAppSelector(selectSelectedDay);
  const actionIds = useAppSelector(selectActionIds);
  const day = new Date(selectedDay);

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <View>
      <Text style={styles.title}>
        {day.toLocaleDateString(undefined, dateOptions)}
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <FlatList
        data={actionIds}
        keyExtractor={(item) => item}
        renderItem={(item) => <DailyToDoPlant id={item.item}></DailyToDoPlant>}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: -20,
  },
  separator: {
    alignSelf: "center",
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
