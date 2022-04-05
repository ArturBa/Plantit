import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { ListSeparator } from "../components/common/ListSeparator";

import { Button, Text, View } from "../components/Themed";
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
        <ImageModify></ImageModify>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
  },
});
