import { FieldHookConfig, useField } from 'formik';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput as DefaultTextInput,
  TextInputProps as DefaultTextInputProps,
} from 'react-native';

import { readOnlyStyleSheet } from './ReadOnly';
import { Text } from './Themed';

import { colors, Typography } from '../../constants';

export type TextInputProps = FieldHookConfig<string> &
  DefaultTextInputProps & {
    label: string;
    name: string;
  };

export const TextInput = (props: TextInputProps) => {
  const [field, meta, helpers] = useField(props);
  const { onChange, ...fieldProps } = field;
  const { ref, label, placeholder, style, ...otherProps } = props;
  const [isFocused, setIsFocused] = useState(false);

  const accentColor = colors.accentBasic;
  const warningColor = colors.warning;
  const unfocusedColor = 'hsla(0, 0%, 0%, 0.26)';

  const isError = (): boolean => meta.touched && meta.error !== undefined;
  const underlineColor = () => {
    if (isError()) {
      return warningColor;
    }
    if (isFocused) {
      return accentColor;
    }
    return unfocusedColor;
  };

  const onBlur = () => {
    helpers.setTouched(true);
    setIsFocused(false);
  };

  const styles = textInputStylesSheet({
    color: underlineColor(),
  });
  const readOnlyStyles = readOnlyStyleSheet();

  return (
    <View style={[readOnlyStyles.container, style && style]}>
      <Text style={[readOnlyStyles.label, styles.label]}>{label}</Text>
      <DefaultTextInput
        {...otherProps}
        {...fieldProps}
        placeholder={placeholder ?? label}
        style={[readOnlyStyles.value, styles.value]}
        onChangeText={helpers.setValue}
        onFocus={() => setIsFocused(true)}
        onBlur={onBlur}
      />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[readOnlyStyles.error, styles.error]}
      >
        {meta.error}
      </Text>
    </View>
  );
};

type TextInputStyleProps = {
  color: string;
};

export const textInputStylesSheet = ({ color }: TextInputStyleProps) => {
  return StyleSheet.create({
    label: { color, ...Typography.subtitle_2, marginBottom: 2 },
    value: {
      borderColor: color,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    error: {
      color: colors.warning,
      marginLeft: 8,
      overflow: 'hidden',
    },
  });
};
