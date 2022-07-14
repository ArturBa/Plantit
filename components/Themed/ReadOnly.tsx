import { StyleSheet, View, ViewStyle } from 'react-native';

import { Text } from './Themed';

import { colors, Typography } from '../../constants';

export type ReadOnlyProps = {
  label: string;
  value: string;
  style?: ViewStyle;
};

export const ReadOnly = (props: ReadOnlyProps) => {
  const { value, label, style, ...otherProps } = props;

  const styles = readOnlyStyleSheet();

  return (
    <View style={[styles.container, style && style]} {...otherProps}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.error} />
    </View>
  );
};

ReadOnly.defaultProps = {
  style: null,
};

export const readOnlyStyleSheet = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexBasis: 72,
    },
    label: {
      ...Typography.subtitle_2,
      color: colors.textGray,
      marginBottom: 2,
    },
    value: {
      ...Typography.subtitle_1,
      paddingVertical: 4,
      marginBottom: 2,
    },
    error: {
      ...Typography.caption_1,
      height: Typography.caption_1.lineHeight,
    },
  });
