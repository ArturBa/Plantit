import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Alert, Image, StyleSheet } from 'react-native';

import { Button, View, ReadOnly } from '../../components/themed';
import {
  removePlant,
  selectPlantById,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { RootRouteProps } from '../../types';

export function PlantDetailsCardScreen({
  route,
}: {
  route: RootRouteProps<'PlantDetailsModal'>;
}) {
  const { plantId } = route.params;
  const plant = useAppSelector(state => selectPlantById(state, plantId));
  const navigation = useNavigation();

  useEffect(() => {
    if (plant?.nickname) {
      navigation.setOptions({
        headerTitle: plant.nickname,
      });
    }
  }, [plant?.nickname, navigation]);

  const dispatch = useAppDispatch();
  const onPlantModify = () => {
    navigation.navigate('PlantModifyModal', { plantId });
  };

  const onPlantRemove = () => {
    Alert.alert(
      'Remove plant',
      `Are you sure to remove ${plant.nickname}\nThis is irreversible`,
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Remove',
          onPress: () => {
            navigation.goBack();
            dispatch(removePlant(plantId));
          },
          style: 'destructive',
        },
      ],
    );
  };

  if (!plant) {
    // TODO: Add skeleton loading
    return <View />;
  }

  return (
    <View style={plantDetailsModalStyles.container}>
      <View style={plantDetailsModalStyles.details}>
        <Image
          style={plantDetailsModalStyles.plantImage}
          source={{ uri: plant.photoUrl }}
        />
        <View style={plantDetailsModalStyles.data}>
          <ReadOnly
            label="Nickname"
            value={plant.nickname}
            style={plantDetailsModalStyles.readonlyGap}
          />
          {plant.name && plant.name !== '' ? (
            <ReadOnly label="Name" value={plant.name} />
          ) : null}
        </View>
      </View>

      <View>
        <Button
          style={plantDetailsModalStyles.button}
          title="Edit the Plant"
          onPress={onPlantModify}
        />
        <Button
          style={plantDetailsModalStyles.button}
          variant="danger"
          title="Remove the Plant"
          onPress={onPlantRemove}
        />
      </View>
    </View>
  );
}

export const plantDetailsModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  details: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
  },
  data: {
    marginLeft: 20,
    flex: 1,
  },
  readonlyGap: {
    marginBottom: 8,
  },
  plantImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  button: {
    marginBottom: 8,
  },
});
