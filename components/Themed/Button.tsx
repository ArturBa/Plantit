import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import { Colors } from '../../constants';

import { Text, ThemeProps, useThemeColor } from './Themed';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export const buttonVariant = new Map<
  ButtonVariant,
  {
    background: keyof Colors;
    text: keyof Colors;
  }
>([
  ['primary', { background: 'accentBasic', text: 'background' }],
  ['danger', { background: 'warning', text: 'background' }],
]);

export type ButtonProps = ThemeProps &
  TouchableOpacityProps & {
    variant?: ButtonVariant;
    title?: string;
    children?: React.ReactNode;
    disabled?: boolean;
  };

export function Button(props: ButtonProps) {
  const {
    lightColor,
    darkColor,
    disabled,
    variant,
    style,
    title,
    children,
    onPress,
    ...otherProps
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const selectedVariant = buttonVariant.get(variant ?? 'primary')!;
  const backgroundColorTheme = useThemeColor(
    { light: lightColor, dark: darkColor },
    selectedVariant.background,
  );
  const textColorTheme = useThemeColor(
    { light: lightColor, dark: darkColor },
    selectedVariant.text,
  );

  const backgroundColor = disabled ? 'hsl(0, 0%, 90%)' : backgroundColorTheme;
  const textColor = disabled ? 'hsl(0, 0%, 60%)' : textColorTheme;

  const styles = styleSheet({ backgroundColor, textColor });

  return (
    <TouchableOpacity
      {...otherProps}
      style={[styles.container, style && style]}
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
      color: textColor,
    },
    text: {
      color: textColor,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
