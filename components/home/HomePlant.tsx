import { Text } from "../Themed";
import { selectPlantById, useAppSelector } from "../../store";
import { PlantCard } from "../common/PlantCard";
import navigation from "../../navigation";
import { useNavigation } from "@react-navigation/native";

export function HomePlant({ plantId }: { plantId: string }) {
  const plant = useAppSelector((state) => selectPlantById(state, plantId));
  const navigation = useNavigation();

  const onPlantClick = (plantId: string) => {
    navigation.navigate("PlantDetailsModal", { plantId });
  };
  return (
    <PlantCard plant={plant} onPress={() => onPlantClick(plant.id)}>
      <Text></Text>
    </PlantCard>
  );
}
