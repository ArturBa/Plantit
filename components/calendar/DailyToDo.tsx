import { FlatList, StyleSheet } from 'react-native';

import { DailyToDoPlant } from './DailyToDoPlant';

import { Action, selectActions, useAppSelector } from '../../store';
import { ListSeparator } from '../common/ListSeparator';
import { Text, View } from '../Themed';

export function DailyToDo() {
  const plantIds = [
    ...new Set(
      useAppSelector(selectActions).map((action: Action) => action.plant),
    ),
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {plantIds?.length > 1 ? 'Take care of your plants' : 'Nothing to do'}
      </Text>
      <FlatList
        data={plantIds}
        keyExtractor={item => item}
        renderItem={item => <DailyToDoPlant plantId={item.item} />}
        ItemSeparatorComponent={() => ListSeparator({ height: 8 })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
