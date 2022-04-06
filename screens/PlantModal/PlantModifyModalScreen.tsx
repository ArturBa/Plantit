import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Formik } from "formik";

import { Button, View, TextInput } from "../../components/Themed";
import { addPlant, useAppDispatch } from "../../store";
import { ImageModify } from "../../components/plant";

export function PlantModifyModalScreen() {
  const initialValues = {
    name: "",
    nickname: "",
    photoUrl: "https://source.unsplash.com/900x900/?plant",
  };
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [photoUrl, setPhotoUrl] = useState(
    "https://source.unsplash.com/900x900/?plant"
  );
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const onSubmit = (value: any) => {
    const id = Math.random().toString();
    console.log(value);
    // dispatch(addPlant({ id }));
    // navigation.goBack();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <View style={styles.plant}>
            <ImageModify size={120} image={photoUrl} onChange={setPhotoUrl} />
            <View style={styles.plantDetails}>
              <TextInput
                name="nickname"
                label="Nickname"
                autoCapitalize="words"
                autoFocus
                returnKeyType="next"
              />
              {/* <TextInput
                label="Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                returnKeyLabel="done"
              /> */}
            </View>
          </View>
          <Button
            onPress={onSubmit}
            title="Add a New Plant to The Family"
          ></Button>
        </View>
      )}
    </Formik>
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
