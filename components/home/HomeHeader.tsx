import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { Button, Text, View } from "../Themed";

export function HomeHeader() {
  const accentColor = Colors[useColorScheme()].tint;

  const navigation = useNavigation();
  const onNewPlantPress = () => {
    navigation.navigate("PlantAddModal");
  };

  const styles = styleSheet(accentColor);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome back</Text>
      <View style={styles.subheader}>
        <Text>Take care of your plants</Text>
        <Button onPress={onNewPlantPress} title="Add Plant" />
      </View>
    </View>
  );
}

const styleSheet = (accentColor: string) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 16,
      marginBottom: 24,
    },
    header: {
      color: accentColor,
      fontSize: 32,
      fontWeight: "bold",
      marginTop: StatusBar.currentHeight ?? 0 + 16,
    },
    subheader: {
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
  });
