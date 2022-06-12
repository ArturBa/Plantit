// Button.stories.ts|tsx
import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react-native';
import { Text } from 'react-native';
import { Button } from './Button';

const ButtonMeta: ComponentMeta<typeof Button> = {
  title: 'Themed/Button',
  component: Button,
};

export default ButtonMeta;

type ButtonStory = ComponentStory<typeof Button>;
export const Basic: ButtonStory = args => <Button {...args} />;

Basic.args = {
  title: 'Button',
  variant: 'primary',
  disabled: false,
};

export const Child: ButtonStory = args => (
  <Button {...args}>
    <Text>Child</Text>
  </Button>
);
Child.args = {
  variant: 'primary',
  disabled: false,
};
