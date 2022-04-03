import { StyleSheet, StatusBar } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Text } from "../Themed";

export function HomeHeader() {
  const accentColor = Colors[useColorScheme()].tint;
  return <Text style={styles(accentColor).header}>Welcome back</Text>;
}

const styles = (accentColor: string) =>
  StyleSheet.create({
    header: {
      color: accentColor,
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 24,
      marginTop: StatusBar.currentHeight ?? 0 + 16,
      marginLeft: 8,
    },
  });
