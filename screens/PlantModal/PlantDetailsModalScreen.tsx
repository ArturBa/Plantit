import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Alert, Image, Platform, StyleSheet } from 'react-native';

import { Button, View } from '../../components/Themed';
import { ReadOnly } from '../../components/Themed/ReadOnly';
import {
  removePlant,
  selectPlantById,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { RootRouteProps } from '../../types';

export function PlantDetailsModalScreen({
  route,
}: {
  route: RootRouteProps<'PlantDetailsModal'>;
}) {
  const { plantId } = route.params;
  const plant = useAppSelector(state => selectPlantById(state, plantId));
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: plant.nickname,
    });
  }, [plant.nickname, navigation]);

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
  return (
    <View style={plantDetailsModalStyles.container}>
      <View style={plantDetailsModalStyles.plant}>
        <Image
          style={plantDetailsModalStyles.plantImage}
          source={{ uri: plant.photoUrl }}
        />
        <View style={plantDetailsModalStyles.plantDetails}>
          <ReadOnly label="Nickname" value={plant.nickname} />
          {/* {plant.name && <ReadOnly label="Name" value={plant.name} />} */}
        </View>
      </View>

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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
  button: {
    marginVertical: 4,
  },
});
