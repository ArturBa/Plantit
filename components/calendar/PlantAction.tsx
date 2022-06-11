import { FontAwesome5 } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { StyleSheet } from 'react-native';
import { colors } from '../../constants';

import { Action, setActionStatus, useAppDispatch } from '../../store';
import { View, Text } from '../Themed';

export function PlantAction({ action }: { action: Action }) {
  const accentColor = colors.accentBasic;
  const dispatch = useAppDispatch();

  const onValueChange = () => {
    const done = !action.done;
    dispatch(setActionStatus({ id: action.id, done }));
  };

  return (
    <>
      <View style={styles.action}>
        <FontAwesome5 name="hand-holding-water" style={styles.icon} />
        <Text style={styles.text}>{action.type}</Text>
      </View>
      <Checkbox
        value={action.done}
        onValueChange={onValueChange}
        color={accentColor}
        style={styles.checkbox}
      />
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 64,
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  text: {
    marginLeft: 16,
    fontSize: 16,
  },
  checkbox: {
    margin: 4,
    width: 20,
    height: 20,
  },
});
