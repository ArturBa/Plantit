import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Alert, Image, Platform, StyleSheet } from "react-native";
import { ListSeparator } from "../components/common/ListSeparator";

import { Button, Text, View } from "../components/Themed";
import {
  removePlant,
  selectPlantById,
  useAppDispatch,
  useAppSelector,
} from "../store";
import { RootRouteProps } from "../types";

export default function PlantDetailsModalScreen({
  route,
}: {
  route: RootRouteProps<"PlantDetailsModal">;
}) {
  const { plantId } = route.params;
  const plant = useAppSelector((state) => selectPlantById(state, plantId));

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const onPlantRemove = () => {
    Alert.alert(
      "Remove plant",
      `Are you sure to remove ${plant.nickname}\nThis is irreversible`,
      [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Remove",
          onPress: () => {
            navigation.goBack();
            dispatch(removePlant(plantId));
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.plant}>
        <Image
          style={styles.plantImage}
          source={{ uri: plant.photoUrl }}
        ></Image>
        <View style={styles.plantDetails}>
          <Text style={styles.subtitle}>Nickname</Text>
          <Text style={styles.title}>{plant.nickname}</Text>
          <ListSeparator height={4} />
          <Text style={styles.subtitle}>Name</Text>
          <Text style={styles.title}>{plant.name}</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>
        You need to take care of this little boy
      </Text>

      <Button
        variant="danger"
        title="Remove plant"
        onPress={onPlantRemove}
      ></Button>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  plant: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  plantDetails: {
    marginLeft: 32,
    flex: 1,
  },
  plantImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
  },
});
