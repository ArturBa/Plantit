import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

import { View } from "../Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

export function ImageModify() {
  const [photoUrl, setPhotoUrl] = useState(
    "https://source.unsplash.com/900x900/?plant"
  );

  const tintColor = Colors[useColorScheme()].tint;
  const backgroundColor = Colors[useColorScheme()].background;

  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access media library was denied");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled) {
      return;
    }
    setPhotoUrl(pickerResult.uri);
  };

  const styles = stylesSheet({ tintColor });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={openImagePicker}>
        <Image style={styles.image} source={{ uri: photoUrl }} />
      </TouchableOpacity>
      <View style={styles.editIcon}>
        <FontAwesome5
          name="pencil-alt"
          size={16}
          color={backgroundColor}
        ></FontAwesome5>
      </View>
    </View>
  );
}

const stylesSheet = ({ tintColor }: { tintColor: string }) =>
  StyleSheet.create({
    container: {
      position: "relative",
      height: 100,
      width: 100,
    },
    touchable: {
      height: "100%",
      width: "100%",
    },
    image: {
      height: "100%",
      width: "100%",
      borderRadius: 50,
      overflow: "hidden",
      borderColor: tintColor,
      borderWidth: 1,
    },
    editIcon: {
      backgroundColor: tintColor,
      position: "absolute",
      height: 32,
      width: 32,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      bottom: 4,
      right: 4,
    },
  });
