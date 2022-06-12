import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { colors, Typography } from '../../constants';

import { selectPlantById, useAppSelector } from '../../store';

export function PlantListItem({ plantId }: { plantId: number }) {
  const plant = useAppSelector(state => selectPlantById(state, plantId));

  const navigation = useNavigation();
  const onPlantClick = () => {
    navigation.navigate('PlantDetailsModal', { plantId });
  };

  const styles = styleSheet({
    transparentAccent: colors.accentTransparent,
    accent: colors.accentBasic,
  });

  return (
    <TouchableOpacity onPress={onPlantClick} style={[styles.container]}>
      <Image source={{ uri: plant.photoUrl }} style={styles.image} />
      <View>
        <Text style={styles.plantNickname}>{plant.nickname}</Text>
        <Text style={styles.plantName}>{plant.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styleSheet = ({
  transparentAccent,
  accent,
}: {
  transparentAccent: string;
  accent: string;
}) =>
  StyleSheet.create({
    container: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: transparentAccent,
      borderColor: accent,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      height: 64,
      width: 64,
      borderRadius: 32,
      marginRight: 16,
    },
    plantNickname: {
      ...Typography.subtitle_1,
      marginBottom: 8,
    },
    plantName: {
      ...Typography.body_1,
      fontStyle: 'italic',
      height: Typography.body_1.lineHeight,
    },
  });
