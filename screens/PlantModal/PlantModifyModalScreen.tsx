import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Formik } from "formik";

import { Button, View, TextInput, Text } from "../../components/Themed";
import {
  updatePlant,
  PlantInterface,
  useAppDispatch,
  useAppSelector,
  selectPlantById,
} from "../../store";
import { ImageModify } from "../../components/plant";
import { plantDetailsModalStyles } from "./PlantDetailsModalScreen";
import { plantValidationSchema } from "./PlantAddModalScreen";
import { useEffect } from "react";
import { RootRouteProps } from "../../types";

export function PlantModifyModalScreen({
  route,
}: {
  route: RootRouteProps<"PlantModifyModal">;
}) {
  const { plantId } = route.params;
  const plant = useAppSelector((state) => selectPlantById(state, plantId));
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const onSubmit = (value: PlantInterface) => {
    dispatch(updatePlant(value));
    navigation.goBack();
  };
  let initialValues = { ...plant };
  useEffect(() => {
    navigation.setOptions({ headerTitle: `Edit ${plant.nickname}` });
  }, []);

  const styles = plantDetailsModalStyles;

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
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
              disabled={!formik.isValid}
              onPress={formik.submitForm}
              title={`Update ${plant.nickname}`}
            ></Button>
          </>
        )}
      </Formik>
    </View>
  );
}
