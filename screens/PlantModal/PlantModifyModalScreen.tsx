import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import { Button, View, TextInput } from '../../components/Themed';
import {
  updatePlant,
  useAppDispatch,
  useAppSelector,
  selectPlantById,
} from '../../store';
import { ImageModify } from '../../components/plant';
import { plantDetailsModalStyles } from './PlantDetailsModalScreen';
import { plantValidationSchema } from './PlantAddModalScreen';
import { RootRouteProps } from '../../types';
import { PlantModel } from '../../model';

export function PlantModifyModalScreen({
  route,
}: {
  route: RootRouteProps<'PlantModifyModal'>;
}) {
  const { plantId } = route.params;
  const plant = useAppSelector(state => selectPlantById(state, plantId));
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const onSubmit = (value: PlantModel) => {
    dispatch(updatePlant(value))
      .unwrap()
      .then(() => {
        navigation.goBack();
      });
  };
  const initialValues = { ...plant };

  useEffect(() => {
    navigation.setOptions({ headerTitle: `Edit ${plant.nickname}` });
  }, [navigation, plant.nickname]);

  const styles = plantDetailsModalStyles;

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={plantValidationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
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
            />
          </>
        )}
      </Formik>
    </View>
  );
}
