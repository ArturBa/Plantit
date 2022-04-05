import { FlatList } from "react-native";

import { selectActionsByPlantId, useAppSelector } from "../../store";
import { ListSeparator } from "../common/ListSeparator";
import { PlantCard } from "../common/PlantCard";
import { PlantAction } from "./PlantAction";

export function DailyToDoPlant({ plantId }: { plantId: string }) {
  const action = useAppSelector((state) =>
    selectActionsByPlantId(state, plantId)
  );
  return (
    <PlantCard plantId={plantId}>
      <FlatList
        data={action}
        keyExtractor={(action) => action.id}
        initialNumToRender={action.length}
        renderItem={(action) => <PlantAction action={action.item} />}
        ItemSeparatorComponent={() => ListSeparator({ height: 4 })}
      ></FlatList>
    </PlantCard>
  );
}
