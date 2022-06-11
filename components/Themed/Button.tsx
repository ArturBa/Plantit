import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { colors, Colors, Typography } from '../../constants';
import { Text, ThemeProps } from './Themed';

export type ButtonVariant = 'primary' | 'secondary' | 'inline' | 'danger';

export const buttonVariant = new Map<
  ButtonVariant | 'disabled',
  {
    background: keyof Colors;
    text: keyof Colors;
  }
>([
  ['primary', { background: 'accentBasic', text: 'background' }],
  ['secondary', { background: 'background', text: 'accentBasic' }],
  ['inline', { background: 'background', text: 'accentBasic' }],
  ['danger', { background: 'warning', text: 'background' }],
  ['disabled', { background: 'textGray', text: 'background' }],
]);

export type ButtonProps = ThemeProps &
  TouchableOpacityProps & {
    variant?: ButtonVariant;
    title?: string;
    children?: React.ReactNode;
    disabled?: boolean;
  };

export function Button(props: ButtonProps) {
  const { disabled, variant, style, title, children, onPress, ...otherProps } =
    props;

  const getButtonColors = (): {
    backgroundColor: string;
    textColor: string;
  } => {
    const selectedVariant = disabled ? 'disabled' : variant ?? 'primary';
    const buttonVariantColors =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      buttonVariant.get(selectedVariant) ?? buttonVariant.get('primary')!;

    return {
      backgroundColor: colors[buttonVariantColors.background],
      textColor: colors[buttonVariantColors.text],
    };
  };

  const styles = styleSheet(getButtonColors());

  const getVariantStyles = (): StyleProp<ViewStyle> => {
    switch (variant) {
      case 'inline':
        return styles.inline;
      case 'secondary':
        return styles.border;
      default:
        return null;
    }
  };

  const variantStyle = getVariantStyles();

  return (
    <TouchableOpacity
      {...otherProps}
      style={[styles.container, variantStyle && variantStyle, style && style]}
      onPress={onPress}
    >
      {title && <Text style={styles.text}>{title}</Text>}
      {children}
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  variant: 'primary',
  title: null,
  children: null,
  disabled: false,
};

type ButtonStyleSheetProps = {
  backgroundColor: string;
  textColor: string;
};

const styleSheet = ({ backgroundColor, textColor }: ButtonStyleSheetProps) =>
  StyleSheet.create({
    container: {
      padding: 12,
      borderRadius: 8,
      backgroundColor,
    },
    border: {
      borderWidth: 2,
      borderColor: textColor,
    },
    // eslint-disable-next-line react-native/no-color-literals
    inline: {
      borderRadius: 0,
      backgroundColor: 'transparent',
    },
    text: {
      color: textColor,
      textAlign: 'center',
      ...Typography.subtitle_2,
    },
  });
