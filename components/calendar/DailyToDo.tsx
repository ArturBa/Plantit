import { FlatList, StyleSheet } from 'react-native';

import { DailyToDoPlant } from './DailyToDoPlant';

import { Typography } from '../../constants';
import { Action, selectActions, useAppSelector } from '../../store';
import { ListSeparator } from '../common/ListSeparator';
import { Button, Text, View } from '../themed';

export function DailyToDo() {
  const plantIds = [
    ...new Set(
      useAppSelector(selectActions).map((action: Action) => action.plant),
    ),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {plantIds?.length > 0 ? 'Take care of your plants' : 'Nothing to do'}
        </Text>
        <Button title="Add" variant="inline" />
      </View>
      <FlatList
        data={plantIds}
        keyExtractor={item => `plant-action-${item}`}
        renderItem={item => <DailyToDoPlant plantId={item.item} />}
        ItemSeparatorComponent={() => ListSeparator({ height: 8 })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  title: {
    ...Typography.title_3,
  },
});
