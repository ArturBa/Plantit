import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { StyleSheet, StatusBar, Button } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

import { Text, View } from "../Themed";

export function HomeHeader() {
  const accentColor = Colors[useColorScheme()].tint;

  const navigation = useNavigation();
  const onNewPlantPress = () => {
    navigation.navigate("PlantAddModal");
  };

  return (
    <View style={styles(accentColor).container}>
      <Text style={styles(accentColor).header}>Welcome back</Text>
      <View>
        <Text>Take care of your plants</Text>
        <Button
          title={"New Plant"}
          onPress={onNewPlantPress}
          color={accentColor}
        >
          {/* New plant */}
        </Button>
      </View>
    </View>
  );
}

const styles = (accentColor: string) =>
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
  });
