import { selectPlantById, useAppSelector } from "../../store";
import { PlantCard } from "../common/PlantCard";
import { useNavigation } from "@react-navigation/native";

export function HomePlant({ plantId }: { plantId: string }) {
  const plant = useAppSelector((state) => selectPlantById(state, plantId));
  const navigation = useNavigation();

  const onPlantClick = (plantId: string) => {
    navigation.navigate("PlantDetailsModal", { plantId });
  };
  return (
    <PlantCard plant={plant} onPress={() => onPlantClick(plant.id)}></PlantCard>
  );
}
