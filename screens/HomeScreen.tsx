import { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { PlantListItem } from '../components/plant';
import { HomeHeader } from '../components/home/HomeHeader';

import { View } from '../components/Themed';
import {
  getPlants,
  selectPlants,
  useAppDispatch,
  useAppSelector,
} from '../store';
import { RootTabScreenProps } from '../types';
import { colors } from '../constants';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPlants());
  }, [dispatch]);
  const userPlants = useAppSelector(selectPlants);

  const styles = styleSheet(colors.accentBasic);

  return (
    <View style={styles.container}>
      <HomeHeader />
      <FlatList
        ListHeaderComponent={<View />}
        ListHeaderComponentStyle={styles.header}
        ListFooterComponentStyle={styles.footer}
        ListFooterComponent={<View />}
        data={userPlants}
        keyExtractor={plant => `${plant.id}`}
        renderItem={plant => <PlantListItem plantId={plant.item.id} />}
      />
    </View>
  );
}

const styleSheet = (accent: string) =>
  StyleSheet.create({
    container: {
      padding: 16,
      flex: 1,
    },
    header: {
      borderBottomWidth: 1,
      borderColor: accent,
    },
    footer: {
      borderTopWidth: 1,
      borderColor: accent,
    },
  });
