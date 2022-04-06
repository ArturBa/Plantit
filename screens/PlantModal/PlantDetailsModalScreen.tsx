import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Button, View } from "../../components/Themed";
import { ReadOnly } from "../../components/Themed/ReadOnly";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import {
  removePlant,
  selectPlantById,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { RootRouteProps } from "../../types";

const editIcon = ({
  plantId,
  navigation,
}: {
  plantId: string;
  navigation: any;
}) => {
  const tintColor = Colors[useColorScheme()].tint;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PlantModifyModal", { plantId })}
    >
      <FontAwesome5 name="pencil-alt" size={16} color={tintColor} />
    </TouchableOpacity>
  );
};

export function PlantDetailsModalScreen({
  route,
}: {
  route: RootRouteProps<"PlantDetailsModal">;
}) {
  const { plantId } = route.params;
  const plant = useAppSelector((state) => selectPlantById(state, plantId));
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: plant.nickname,
      headerRight: () => editIcon({ plantId, navigation }),
    });
  }, [plant.nickname]);

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
    <View style={plantDetailsModalStyles.container}>
      <View style={plantDetailsModalStyles.plant}>
        <Image
          style={plantDetailsModalStyles.plantImage}
          source={{ uri: plant.photoUrl }}
        ></Image>
        <View style={plantDetailsModalStyles.plantDetails}>
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

export const plantDetailsModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  plant: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  plantDetails: {
    marginLeft: 16,
    flex: 1,
  },
  plantImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
});
