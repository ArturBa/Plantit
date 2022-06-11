import { storiesOf } from '@storybook/react-native';
import { boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Button, ButtonVariant } from './Button';
import { CenterView } from '../../storybook/CenterView';

const variants: ButtonVariant[] = ['primary', 'secondary', 'danger'];

storiesOf('components/Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Primary', () => (
    <Button
      disabled={boolean('disabled', false)}
      variant={select('variant', variants, variants[0])}
      title={text('title', 'Button')}
      onPress={action('onPress executed')}
    />
  ));
