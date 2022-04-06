import * as ImagePicker from "expo-image-picker";
import { FieldHookConfig, useField } from "formik";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { View } from "../Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

export type ImageModifyProps = FieldHookConfig<string> & {
  name: string;
  size?: number;
};

export function ImageModify(props: ImageModifyProps) {
  const [field, meta, helpers] = useField(props);
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
    helpers.setValue(pickerResult.uri);
  };

  const styles = stylesSheet({ tintColor, size: props.size ?? 100 });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={openImagePicker}>
        <Image style={styles.image} source={{ uri: field.value }} />
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

type ImageModifyStyleProps = {
  tintColor: string;
  size: number;
};

const stylesSheet = ({ tintColor, size }: ImageModifyStyleProps) =>
  StyleSheet.create({
    container: {
      position: "relative",
      height: size,
      width: size,
    },
    touchable: {
      height: "100%",
      width: "100%",
    },
    image: {
      height: "100%",
      width: "100%",
      borderRadius: size / 2,
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
