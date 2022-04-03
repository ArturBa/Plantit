import { FontAwesome5 } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

import { Action, setActionStatus, useAppDispatch } from "../../store";
import { Card } from "../common/Card";
import { View, Text } from "../Themed";

export function PlantAction({ action }: { action: Action }) {
  const accentColor = Colors[useColorScheme()].tint;
  const dispatch = useAppDispatch();

  const onValueChange = (newValue: boolean) => {
    dispatch(setActionStatus({ id: action.id, done: newValue }));
  };

  return (
    <Card style={styles.content}>
      <View style={styles.action}>
        <FontAwesome5
          name="hand-holding-water"
          style={styles.icon}
        ></FontAwesome5>
        <Text style={styles.text}>{action.type}</Text>
      </View>
      <Checkbox
        value={action.done}
        onValueChange={onValueChange}
        color={accentColor}
        style={styles.checkbox}
      ></Checkbox>
    </Card>
  );
}

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 64,
  },
  action: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
