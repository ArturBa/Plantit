import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Formik } from "formik";

import { Button, View, TextInput, Text } from "../../components/Themed";
import { updatePlant, Plant, useAppDispatch } from "../../store";
import { ImageModify } from "../../components/plant";
import { plantDetailsModalStyles } from "./PlantDetailsModalScreen";
import { plantValidationSchema } from "./PlantAddModalScreen";

export function PlantModifyModalScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const onSubmit = (value: Plant) => {
    dispatch(updatePlant(value));
    navigation.goBack();
  };

  const styles = plantDetailsModalStyles;

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          validateOnMount: true,
          id: "",
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
              disabled={Object.keys(formik.touched).length === 0}
              // disabled={!(formik.isValid && formik.dirty)}
              // disabled={
              //   Array.isArray(formik.errors) ||
              //   Object.values(formik.errors).toString() != ""
              // }
              onPress={formik.submitForm}
              title="Add a New Plant to The Family"
            ></Button>
          </>
        )}
      </Formik>
    </View>
  );
}
