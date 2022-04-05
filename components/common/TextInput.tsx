import { StyleSheet, View, TextInput as DefaultTextInput } from "react-native";
import { useState } from "react";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Text } from "../Themed";

export type TextInputProps = DefaultTextInput["props"] & {
  label: string;
  required?: boolean;
};

export const TextInput = (props: TextInputProps) => {
  const { label, value, onChangeText } = props;

  const [isFocused, setIsFocused] = useState(false);

  const tintColor = Colors[useColorScheme()].tint;
  const waringColor = Colors[useColorScheme()].warning;
  const unfocusedColor = "hsla(0, 0%, 0%, 0.26)";

  const styles = stylesSheet({ tintColor, isFocused, unfocusedColor });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <DefaultTextInput
        {...props}
        placeholder={props.placeholder ?? label}
        style={[styles.input, props.style]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

type TextInputStyleProps = {
  tintColor: string;
  isFocused: boolean;
  unfocusedColor: string;
};

const stylesSheet = ({
  tintColor,
  isFocused,
  unfocusedColor,
}: TextInputStyleProps) => {
  const underlineColor = isFocused ? tintColor : unfocusedColor;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "hsla(0, 0%, 0%, 0.1)",
      height: 64,
      marginBottom: 8,
      padding: 8,
    },
    input: {
      fontSize: 20,
      borderBottomWidth: 1,
      borderBottomColor: underlineColor,
    },
    label: {
      fontSize: 14,
      marginBottom: 4,
    },
  });
};
