import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import { Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';

import { TextInput } from './TextInput';

const TextInputMeta: ComponentMeta<typeof TextInput> = {
  title: 'Themed/TextInput',
  component: TextInput,
};

export default TextInputMeta;

const validationSchema = yup.object().shape({
  name: yup.string(),
});

type TextInputStory = ComponentStory<typeof TextInput>;
export const Basic: TextInputStory = args => (
  <Formik
    validationSchema={validationSchema}
    initialValues={{ name: '' }}
    onSubmit={() => {}}
  >
    {formik => <TextInput {...args} />}
  </Formik>
);

Basic.args = {
  label: 'TextInput',
  name: 'name',
  placeholder: 'Placeholder',
};

const validationSchemaWithError = yup.object().shape({
  name: yup.string().required(),
});

export const WithError: TextInputStory = args => (
  <Formik
    validationSchema={validationSchemaWithError}
    initialValues={{ name: '' }}
    onSubmit={() => {}}
  >
    {formik => <TextInput {...args} />}
  </Formik>
);

WithError.args = {
  label: 'TextInput',
  name: 'name',
  placeholder: 'Placeholder',
};
