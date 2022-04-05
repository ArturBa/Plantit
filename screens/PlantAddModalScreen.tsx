import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet } from "react-native";

import { Button, View, TextInput } from "../components/Themed";
import { addPlant, useAppDispatch } from "../store";
import { ImageModify } from "../components/plant";

export default function PlantDetailsModalScreen() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [photoUrl, setPhotoUrl] = useState(
    "https://source.unsplash.com/900x900/?plant"
  );
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
        <ImageModify size={120} image={photoUrl} onChange={setPhotoUrl} />
        <View style={styles.plantDetails}>
          <TextInput
            label="Nickname"
            value={nickname}
            onChangeText={setNickname}
            autoCapitalize="words"
            autoFocus
            returnKeyType="next"
          />
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            returnKeyLabel="done"
          />
        </View>
      </View>
      <Button
        onPress={onButtonPress}
        title="Add new plant to the family"
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
    // TODO: Think of a dynamic way to calculate the height of the plant section
    height: 120,
  },
  plantDetails: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
  },
});
