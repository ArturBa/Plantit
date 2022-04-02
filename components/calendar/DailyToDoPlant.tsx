import { ScrollView, StyleSheet } from "react-native";

import {
  selectActionsByPlantId,
  selectSelectedDay,
  useAppSelector,
} from "../../store";
import { Text, View } from "../Themed";

export function DailyToDoPlant({ id }: { id: string }) {
  const action = useAppSelector((state) => selectActionsByPlantId(state, id));
  return (
    <View>
      <Text>Plant</Text>
    </View>
  );
}
