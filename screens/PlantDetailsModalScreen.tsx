import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Alert, Image, Platform, StyleSheet } from "react-native";
import { ListSeparator } from "../components/common/ListSeparator";

import { Button, Text, View } from "../components/Themed";
import { ReadOnly } from "../components/Themed/ReadOnly";
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
          <ReadOnly label="Nickname" value={plant.nickname} />
          {plant.name && <ReadOnly label="Name" value={plant.name} />}
        </View>
      </View>

      <Button
        variant="danger"
        title="Remove the Plant"
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
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
  },
});
