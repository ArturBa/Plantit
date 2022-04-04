import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { View } from "../Themed";

export function Card({
  children,
  style,
  onPress,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}) {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
        {children}
      </TouchableOpacity>
    );
  } else {
    return <View style={[styles.container, style]}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
  },
});
