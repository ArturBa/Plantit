import { StyleSheet, View, TextInput as DefaultTextInput } from "react-native";
import { useState } from "react";

import { Text, ThemeProps, useThemeColor } from "./Themed";
import { readOnlyStyleSheet } from "./ReadOnly";

export type TextInputProps = ThemeProps &
  DefaultTextInput["props"] & {
    label: string;
    required?: boolean;
  };

export const TextInput = (props: TextInputProps) => {
  const { label, value, onChangeText } = props;
  const { lightColor, darkColor, ...otherProps } = props;

  const [isFocused, setIsFocused] = useState(false);
  const tintColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint"
  );
  const warningColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "warning"
  );

  const unfocusedColor = "hsla(0, 0%, 0%, 0.26)";

  const styles = textInputStylesSheet({ tintColor, isFocused, unfocusedColor });
  const readOnlyStyles = readOnlyStyleSheet({ underlineColor: tintColor });

  return (
    <View style={[readOnlyStyles.container]}>
      <Text style={readOnlyStyles.label}>{label}</Text>
      <DefaultTextInput
        {...props}
        placeholder={props.placeholder ?? label}
        style={[readOnlyStyles.value, styles.value, props.style]}
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

export const textInputStylesSheet = ({
  tintColor,
  isFocused,
  unfocusedColor,
}: TextInputStyleProps) => {
  const underlineColor = isFocused ? tintColor : unfocusedColor;
  return StyleSheet.create({
    value: {
      fontSize: 20,
      borderBottomWidth: 1,
      borderBottomColor: underlineColor,
    },
  });
};
