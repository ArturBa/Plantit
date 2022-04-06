import { StyleSheet, View, TextInput as DefaultTextInput } from "react-native";

import { Text, ThemeProps, useThemeColor } from "./Themed";
import { readOnlyStyleSheet } from "./ReadOnly";
import { FieldHookConfig, useField, Field } from "formik";
import { useState } from "react";

export type TextInputProps = FieldHookConfig<string> &
  ThemeProps &
  DefaultTextInput["props"] & {
    label: string;
    name: string;
  };

export const TextInput = (props: TextInputProps) => {
  const [field, meta, helpers] = useField(props);
  const { onChange, ...fieldProps } = field;
  const { label } = props;
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

  const isError = (): boolean => meta.touched && meta.error !== undefined;
  const underlineColor = () => {
    if (isError()) {
      return warningColor;
    }
    if (isFocused) {
      return tintColor;
    }
    return unfocusedColor;
  };

  const styles = textInputStylesSheet({
    underlineColor: underlineColor(),
  });
  const readOnlyStyles = readOnlyStyleSheet({ underlineColor: tintColor });

  return (
    <View style={[readOnlyStyles.container]}>
      <Text style={[readOnlyStyles.label, styles.label]}>{label}</Text>
      <DefaultTextInput
        {...fieldProps}
        placeholder={props.placeholder ?? label}
        style={[readOnlyStyles.value, styles.value]}
        onChangeText={helpers.setValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          helpers.setTouched(true), setIsFocused(false);
        }}
      />
      {meta.error && (
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.error}>
          {meta.error}
        </Text>
      )}
    </View>
  );
};

type TextInputStyleProps = {
  underlineColor: string;
};

export const textInputStylesSheet = ({
  underlineColor,
}: TextInputStyleProps) => {
  return StyleSheet.create({
    label: { color: underlineColor },
    value: {
      fontSize: 20,
      borderBottomWidth: 2,
      fontWeight: "normal",
      borderBottomColor: underlineColor,
    },
    error: {
      fontSize: 12,
      color: underlineColor,
      position: "absolute",
      bottom: -16,
      left: 8,
      overflow: "hidden",
    },
  });
};
