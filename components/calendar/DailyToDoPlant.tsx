import { StyleSheet } from 'react-native';

import { PlantAction } from './PlantAction';

import { selectActionsByPlantId, useAppSelector } from '../../store';
import { PlantListItem } from '../plant';
import { View } from '../Themed';

export function DailyToDoPlant({ plantId }: { plantId: number }) {
  const plantActions = useAppSelector(state =>
    selectActionsByPlantId(state, plantId),
  );
  return (
    <View>
      <PlantListItem plantId={plantId} />
      <View style={styles.actions}>
        {plantActions.map(action => (
          <PlantAction action={action} key={action.id} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    marginLeft: 20,
  },
});
