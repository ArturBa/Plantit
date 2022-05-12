import { useNavigation } from '@react-navigation/native';
import { selectPlantById, useAppSelector } from '../../store';
import { PlantCard } from '../common/PlantCard';

export function HomePlant({ plantId }: { plantId: number }) {
  const plant = useAppSelector(state => selectPlantById(state, plantId));
  const navigation = useNavigation();

  const onPlantClick = () => {
    navigation.navigate('PlantDetailsModal', { plantId });
  };
  return <PlantCard plant={plant} onPress={() => onPlantClick()} />;
}
