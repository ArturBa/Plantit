import { FlatList } from 'react-native';

import { selectActionsByPlantId, useAppSelector } from '../../store';
import { Text, View } from '../Themed';

export function DailyToDoPlant({ plantId }: { plantId: number }) {
  const action = useAppSelector(state =>
    selectActionsByPlantId(state, plantId),
  );
  return (
    <View>
      <Text>TODO</Text>
    </View>
    // <PlantCard plantId={plantId}>
    //   <FlatList
    //     data={action}
    //     keyExtractor={item => `${item.id}`}
    //     initialNumToRender={action.length}
    //     renderItem={item => <PlantAction action={item.item} />}
    //     ItemSeparatorComponent={() => ListSeparator({ height: 4 })}
    //   />
    // </PlantCard>
  );
}
