import { FlatList, StyleSheet } from "react-native";
import { Plant } from "../components/home";

import { Text, View } from "../components/Themed";
import { selectPlants, useAppSelector } from "../store";
import { RootTabScreenProps } from "../types";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const userPlants = useAppSelector(selectPlants);

  return (
    <View style={styles.container}>
      <FlatList
        data={userPlants}
        keyExtractor={(plant) => plant.id}
        renderItem={(plant) => <Plant plantId={plant.item.id} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 8,
  },
});
