import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';

import { Button } from './Button';

const ButtonMeta: ComponentMeta<typeof Button> = {
  title: 'Themed/Button',
  component: Button,
  argTypes: {
    onPress: { action: 'clicked' },
  },
};

export default ButtonMeta;

type ButtonStory = ComponentStory<typeof Button>;
export const Basic: ButtonStory = args => <Button {...args} />;

Basic.args = {
  title: 'Button',
  variant: 'primary',
  disabled: false,
};

export const WithChild: ButtonStory = args => (
  <Button {...args}>
    <Text>Child</Text>
  </Button>
);
WithChild.args = {
  variant: 'primary',
  disabled: false,
};
