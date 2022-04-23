import { Image, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

import { Plant, selectPlantById, useAppSelector } from '../../store';
import { Card } from './Card';
import { View, Text } from '../Themed';

PlantCard.defaultProps = {
  onPress: () => {},
  children: null,
  plant: null,
  plantId: null,
};

export function PlantCard({
  children,
  plantId,
  plant,
  onPress,
}: {
  children?: ReactNode;
  plantId?: string;
  plant?: Plant;
  onPress?: () => void;
}) {
  if (!plant && !plantId) {
    throw new Error(
      `[PlantCard] Wrong arguments plant: ${JSON.stringify(
        plant,
      )} plantId: ${plantId}`,
    );
  }
  /* eslint-disable react-hooks/rules-of-hooks */
  const displayPlant =
    plant ?? useAppSelector(state => selectPlantById(state, plantId ?? ''));
  /* eslint-enable react-hooks/rules-of-hooks */

  return (
    <Card style={styles.content} onPress={onPress}>
      <View style={styles.plant}>
        <Image source={{ uri: displayPlant.photoUrl }} style={styles.image} />
        <View style={styles.plantDetails}>
          <Text style={styles.plantNickname}>{displayPlant.nickname}</Text>
          {displayPlant.name ? (
            <Text style={styles.plantName}>{displayPlant.name}</Text>
          ) : (
            <View />
          )}
        </View>
      </View>
      {children}
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 16,
  },
  plant: {
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  plantDetails: {
    display: 'flex',
    paddingLeft: 16,
  },
  plantNickname: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  plantName: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  separator: {
    height: 4,
  },
});
