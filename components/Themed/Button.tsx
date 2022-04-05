import { Button as DefaultButton } from "react-native";

import { ThemeProps, useThemeColor } from "./Themed";

enum buttonVariant {
  primary = "tint",
  // TODO: Add a secondary color
  secondary = "background",
  danger = "warning",
}

export type ButtonProps = ThemeProps &
  DefaultButton["props"] & {
    variant?: keyof typeof buttonVariant;
  };

export function Button(props: ButtonProps) {
  const { lightColor, darkColor, ...otherProps } = props;
  const tintColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    props.variant ? buttonVariant[props.variant] : buttonVariant.primary
  );

  return (
    <DefaultButton
      {...otherProps}
      title={props.title}
      onPress={props.onPress}
      color={props.color ?? tintColor}
    ></DefaultButton>
  );
}
