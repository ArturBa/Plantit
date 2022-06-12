// Button.stories.ts|tsx
import React from 'react';
import { action } from '@storybook/addon-actions';
import { Text } from 'react-native';
import { boolean, text, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';

import { Button, ButtonVariant } from './Button';
import { CenterView } from '../../storybook/CenterView';

const actions = {
  onTouch: action('onTouch'),
};

const variants: ButtonVariant[] = ['primary', 'secondary', 'inline', 'danger'];

storiesOf('Themed/Button', module)
  .addDecorator(story => <CenterView>{story()}</CenterView>)
  .add('Default', () => (
    <Button title={text('text', 'Primary')} onPress={actions.onTouch} />
  ))
  .add('Disabled', () => (
    <Button
      title="Disabled"
      disabled={boolean('disabled', true)}
      onPress={actions.onTouch}
      variant="primary"
    />
  ))
  .add('Variant', () => (
    <Button
      title="Button"
      onPress={actions.onTouch}
      variant={select('variant', variants, variants[0])}
    />
  ))
  .add('With children', () => (
    <Button
      onPress={actions.onTouch}
      variant={select('variant', variants, variants[0])}
    >
      <Text>Children</Text>
    </Button>
  ));
