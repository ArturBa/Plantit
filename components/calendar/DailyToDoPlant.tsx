import { Image, ScrollView, StyleSheet } from "react-native";
import { FlatList } from "react-native";

import {
  selectActionsByPlantId,
  selectPlantById,
  useAppSelector,
} from "../../store";
import { Card } from "../Card";
import { Text, View } from "../Themed";
import { PlantAction } from "./PlantAction";

export function DailyToDoPlant({ id }: { id: string }) {
  const action = useAppSelector((state) => selectActionsByPlantId(state, id));
  const plant = useAppSelector((state) => selectPlantById(state, id));
  return (
    <Card style={styles.content}>
      <View style={styles.plant}>
        <Image source={{ uri: plant.photoUrl }} style={styles.image}></Image>
        <View style={styles.plantDetails}>
          <Text style={styles.plantNickname}>{plant.nickname}</Text>
          {plant.name ? (
            <Text style={styles.plantName}>{plant.name}</Text>
          ) : (
            <View />
          )}
        </View>
      </View>
      <FlatList
        data={action}
        keyExtractor={(action) => action.id}
        initialNumToRender={action.length}
        renderItem={(action) => <PlantAction action={action.item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      ></FlatList>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 16,
  },
  plant: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  plantDetails: {
    display: "flex",
    paddingLeft: 16,
  },
  plantNickname: {
    fontSize: 24,
    fontWeight: "bold",
  },
  plantName: {
    fontSize: 18,
    fontStyle: "italic",
  },
  separator: {
    height: 4,
  },
});
