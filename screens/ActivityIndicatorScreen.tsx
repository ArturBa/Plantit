import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeOut } from 'react-native-reanimated';
import { LogoSvg } from '../components/common/LogoSvg';
import { Text } from '../components/Themed';

export interface ActivityIndicatorScreenProps {
  title: string;
}

export function ActivityIndicatorScreen({
  title,
}: ActivityIndicatorScreenProps): React.ReactElement {
  return (
    <Animated.View style={styles.container} exiting={FadeOut}>
      <Text style={styles.text}>{title}</Text>
      <LogoSvg />
    </Animated.View>
  );
}

ActivityIndicatorScreen.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginBottom: 32,
  },
});
