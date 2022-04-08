import * as yup from "yup";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { Button, View, TextInput } from "../../components/Themed";
import { addPlant, Plant, useAppDispatch } from "../../store";
import { ImageModify } from "../../components/plant";
import { plantDetailsModalStyles } from "./PlantDetailsModalScreen";

export const plantValidationSchema = yup.object().shape({
  name: yup.string(),
  nickname: yup.string().required("You need to set a nickname for your plant"),
  photoUrl: yup.string().required(),
});

export function PlantAddModalScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const onSubmit = (values: Omit<Plant, "id">) => {
    const id = Math.random().toString();
    dispatch(addPlant({ ...values, id }));
    navigation.goBack();
  };

  const styles = plantDetailsModalStyles;

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: "",
          nickname: "",
          photoUrl: "https://source.unsplash.com/900x900/?plant",
        }}
        validationSchema={plantValidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <>
            <View style={styles.plant}>
              <ImageModify size={120} name="photoUrl" />
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
              disabled={!formik.isValid || !formik.dirty}
              onPress={formik.submitForm}
              title="Add a New Plant to The Family"
            ></Button>
          </>
        )}
      </Formik>
    </View>
  );
}
