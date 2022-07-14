import { StyleSheet } from 'react-native';

import { View } from '../themed';

export function ListSeparator({ height }: { height: number }) {
  return <View style={styles(height).separator} />;
}

const styles = (height: number) =>
  StyleSheet.create({
    separator: {
      height,
    },
  });
