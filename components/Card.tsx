import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { View } from "./Themed";

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
  },
});
