import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { ListSeparator } from "../components/common/ListSeparator";

import { Button, Text, View } from "../components/Themed";
import { addPlant, useAppDispatch } from "../store";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";

export default function PlantDetailsModalScreen() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [photoUrl, setPhotoUrl] = useState(
    "https://source.unsplash.com/900x900/?plant"
  );

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

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const onButtonPress = () => {
    const id = Math.random().toString();
    dispatch(addPlant({ name, nickname, photoUrl, id }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.plant}>
        <TouchableOpacity style={styles.imageView} onPress={openImagePicker}>
          <Image style={styles.plantImage} source={{ uri: photoUrl }} />
          <View style={styles.imageEdit}>
            <FontAwesome5
              name="pencil-alt"
              size={16}
              color="hsl(0, 0%, 97%)"
            ></FontAwesome5>
          </View>
        </TouchableOpacity>
        <View style={styles.plantDetails}>
          <Text style={styles.subtitle}>Nickname</Text>
          <TextInput
            style={styles.title}
            onChangeText={setNickname}
            value={nickname}
            autoCapitalize={"words"}
            autoFocus
          />
          <ListSeparator height={4} />
          <Text style={styles.subtitle}>Name</Text>
          <TextInput
            style={styles.title}
            onChangeText={setName}
            value={name}
            autoCapitalize={"words"}
          />
        </View>
      </View>
      <Button
        onPress={onButtonPress}
        title="Add new plant to a family"
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  plant: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  plantDetails: {
    marginLeft: 32,
    flex: 1,
  },
  imageView: {
    position: "relative",
    height: 100,
    width: 100,
  },
  plantImage: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
    overflow: "hidden",
  },
  imageEdit: {
    backgroundColor: "hsl(138, 37%, 38%)",
    position: "absolute",
    height: 32,
    width: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    bottom: 4,
    right: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
  },
});
