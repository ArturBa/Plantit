import { StyleSheet, View } from 'react-native';

import { ThemeProps, Text } from './Themed';

export type ReadOnlyProps = ThemeProps & {
  label: string;
  value: string | undefined;
};

export const ReadOnly = (props: ReadOnlyProps) => {
  const { value, label, lightColor, darkColor, ...otherProps } = props;

  const styles = readOnlyStyleSheet();

  return (
    <View style={styles.container} {...otherProps}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value]}>{value}</Text>
    </View>
  );
};

export const readOnlyStyleSheet = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: 8,
      padding: 8,
    },
    // eslint-disable-next-line react-native/no-color-literals
    label: {
      fontSize: 14,
      color: 'hsla(0, 0%, 0%, 0.54)',
    },
    value: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
