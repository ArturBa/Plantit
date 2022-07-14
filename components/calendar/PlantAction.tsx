import { FontAwesome5 } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { colors, Typography } from '../../constants';
import { Action, setActionStatus, useAppDispatch } from '../../store';
import { View, Text } from '../themed';

export function PlantAction({ action }: { action: Action }) {
  const accentColor = colors.accentBasic;
  const dispatch = useAppDispatch();

  const onValueChange = () => {
    const done = !action.done;
    dispatch(setActionStatus({ id: action.id, done }));
  };

  return (
    <TouchableOpacity style={styles.content} onPressOut={onValueChange}>
      <View style={styles.actionWithIcon}>
        <View style={styles.iconWrapper}>
          <FontAwesome5 name="hand-holding-water" style={styles.icon} />
        </View>
        <View style={styles.actionDetails}>
          <Text style={styles.actionType}>{action.type}</Text>
          <Text style={styles.actionDate}>Today</Text>
        </View>
      </View>
      <Checkbox
        value={action.done}
        onValueChange={onValueChange}
        color={accentColor}
        style={styles.checkbox}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  iconWrapper: {
    backgroundColor: colors.accentBasic,
    borderRadius: 48 / 2,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: colors.background,
  },
  actionWithIcon: {
    flexDirection: 'row',
  },
  actionDetails: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  actionType: {
    ...Typography.subtitle_2,
    marginBottom: 4,
  },
  actionDate: {
    ...Typography.body_2,
  },
  checkbox: {
    margin: 4,
    width: 20,
    height: 20,
  },
});
