import { TouchableOpacity, StyleSheet } from "react-native";

import { colors, Text, ThemeProps, useThemeColor } from "./Themed";

enum ButtonVariant {
  primary = "primary",
  secondary = "secondary",
  danger = "danger",
}

export const buttonVariant = new Map<
  keyof typeof ButtonVariant,
  {
    background: colors;
    text: colors;
  }
>([
  [
    "primary",
    {
      background: "tint",
      text: "background",
    },
  ],
  [
    "danger",
    {
      background: "warning",
      text: "background",
    },
  ],
]);

export type ButtonProps = ThemeProps &
  TouchableOpacity["props"] & {
    variant?: keyof typeof ButtonVariant;
    title?: string;
    children?: React.ReactNode;
  };

export function Button(props: ButtonProps) {
  const { lightColor, darkColor, ...otherProps } = props;
  const variant = buttonVariant.get(props.variant ?? "primary")!!;

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    variant.background
  );
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    variant.text
  );

  const styles = styleSheet({ backgroundColor, textColor });

  return (
    <TouchableOpacity
      {...otherProps}
      style={[styles.container, props.style]}
      onPress={props.onPress}
    >
      {props.title && <Text style={styles.text}>{props.title}</Text>}
      {props.children}
    </TouchableOpacity>
  );
}

type ButtonStyleSheetProps = {
  backgroundColor: string;
  textColor: string;
};

const styleSheet = ({ backgroundColor, textColor }: ButtonStyleSheetProps) =>
  StyleSheet.create({
    container: {
      padding: 8,
      backgroundColor,
      color: textColor,
    },
    text: {
      color: textColor,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
