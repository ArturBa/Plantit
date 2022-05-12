import { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { HomePlant } from '../components/home';
import { HomeHeader } from '../components/home/HomeHeader';

import { View } from '../components/Themed';
import {
  getPlants,
  selectPlants,
  useAppDispatch,
  useAppSelector,
} from '../store';
import { RootTabScreenProps } from '../types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPlants());
  }, [dispatch]);
  const userPlants = useAppSelector(selectPlants);
  console.log('User plants', userPlants);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<HomeHeader />}
        data={userPlants}
        keyExtractor={plant => `${plant.id}`}
        renderItem={plant => (
          <>
            <HomePlant plantId={plant.item.id} />
            <View style={styles.separator} />
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 8,
  },
});
