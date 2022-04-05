import { FlatList, StyleSheet } from "react-native";

import { Action, selectActions, useAppSelector } from "../../store";
import { DailyToDoPlant } from "./DailyToDoPlant";
import { Text, View } from "../Themed";
import { ListSeparator } from "../common/ListSeparator";

export function DailyToDo() {
  const plantIds = [
    ...new Set(
      useAppSelector(selectActions).map((action: Action) => action.plant)
    ),
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {plantIds?.length > 1 ? "Take care of your plants" : "Nothing to do"}
      </Text>
      <FlatList
        data={plantIds}
        keyExtractor={(item) => item}
        renderItem={(item) => (
          <DailyToDoPlant plantId={item.item}></DailyToDoPlant>
        )}
        ItemSeparatorComponent={() => ListSeparator({ height: 8 })}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
