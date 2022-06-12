import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import React from 'react';

import { ReadOnly } from './ReadOnly';

const ReadOnlyMeta: ComponentMeta<typeof ReadOnly> = {
  title: 'Themed/ReadOnly',
  component: ReadOnly,
};

export default ReadOnlyMeta;

export const Basic: ComponentStory<typeof ReadOnly> = args => (
  <ReadOnly {...args} />
);

Basic.args = {
  label: 'Label',
  value: 'Value',
};
