import * as yup from "yup";
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { Button, View, TextInput } from "../../components/Themed";
import { addPlant, Plant, useAppDispatch } from "../../store";
import { ImageModify } from "../../components/plant";

export function PlantAddModalScreen() {
  const [photoUrl, setPhotoUrl] = useState(
    "https://source.unsplash.com/900x900/?plant"
  );
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const onSubmit = (values: Omit<Plant, "id">) => {
    const id = Math.random().toString();
    dispatch(addPlant({ ...values, id }));
    navigation.goBack();
  };

  const validationSchema = yup.object().shape({
    name: yup.string(),
    nickname: yup
      .string()
      .required("You need to set a nickname for your plant"),
    photoUrl: yup.string().required(),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: "",
          nickname: "",
          photoUrl: "https://source.unsplash.com/900x900/?plant",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <>
            <View style={styles.plant}>
              <ImageModify size={120} image={photoUrl} onChange={setPhotoUrl} />
              <View style={styles.plantDetails}>
                <TextInput
                  label="Nickname"
                  name="nickname"
                  autoCapitalize="words"
                  autoFocus
                  returnKeyType="next"
                />
                <TextInput
                  label="Name"
                  name="name"
                  autoCapitalize="words"
                  returnKeyLabel="done"
                />
              </View>
            </View>
            <Button
              onPress={formik.submitForm}
              title="Add a New Plant to The Family"
            ></Button>
          </>
        )}
      </Formik>
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
