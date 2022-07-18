import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';

import { plantDetailsModalStyles } from './PlantDetailsModalScreen';

import { ImageModify } from '../../components/plant';
import { Button, View, TextInput } from '../../components/themed';
import { PlantModel } from '../../model';
import { addPlant, useAppDispatch } from '../../store';

export const plantValidationSchema = yup.object().shape({
  name: yup.string(),
  nickname: yup.string().required('You need to set a nickname for your plant'),
  photoUrl: yup.string().required(),
});

export function PlantAddCardScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const onSubmit = (values: Omit<PlantModel, 'id'>) => {
    dispatch(addPlant(values))
      .unwrap()
      .then(() => navigation.goBack());
  };

  const styles = plantDetailsModalStyles;

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: '',
          nickname: '',
          photoUrl: 'https://source.unsplash.com/900x900/?plant',
        }}
        validationSchema={plantValidationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <>
            <View style={styles.details}>
              <ImageModify size={120} name="photoUrl" />
              <View style={styles.data}>
                <TextInput
                  label="Nickname"
                  name="nickname"
                  autoCapitalize="words"
                  autoFocus
                  returnKeyType="next"
                  style={styles.readonlyGap}
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
            />
          </>
        )}
      </Formik>
    </View>
  );
}
