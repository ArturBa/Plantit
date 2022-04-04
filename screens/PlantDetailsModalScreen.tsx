import { StatusBar } from "expo-status-bar";
import { Image, Platform, StyleSheet, TextInput } from "react-native";
import { ListSeparator } from "../components/common/ListSeparator";

import { Text, View } from "../components/Themed";
import { selectPlantById, useAppSelector } from "../store";
import { RootRouteProps, RootStackScreenProps } from "../types";

export default function PlantDetailsModalScreen({
  navigation,
  route,
}: {
  navigation: RootStackScreenProps<"PlantDetailsModal">;
  route: RootRouteProps<"PlantDetailsModal">;
}) {
  const { plantId } = route.params;
  const plant = useAppSelector((state) => selectPlantById(state, plantId));

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

      <Text style={[styles.title, { textAlign: "center", paddingTop: 32 }]}>
        Today tasks
      </Text>

      <Text style={[styles.title, { textAlign: "center", paddingTop: 32 }]}>
        Upcoming tasks
      </Text>

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
