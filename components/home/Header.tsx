import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, StatusBar } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

import { Text, View } from "../Themed";

export function HomeHeader() {
  const accentColor = Colors[useColorScheme()].tint;
  return (
    <View style={styles(accentColor).container}>
      <Text style={styles(accentColor).header}>Welcome back</Text>
    </View>
  );
}

const styles = (accentColor: string) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 8,
      marginBottom: 24,
    },
    header: {
      color: accentColor,
      fontSize: 32,
      fontWeight: "bold",
      marginTop: StatusBar.currentHeight ?? 0 + 16,
      marginLeft: 16,
    },
  });
