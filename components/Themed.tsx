/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { View as DefaultView } from "react-native";

import Button from "./themed/ThemedButton";
import Text from "./themed/ThemedText";
import { useThemeColor, ThemeProps } from "./themed/useThemeColor";

export type ViewProps = ThemeProps & DefaultView[`props`];

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    `background`,
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export { Button, Text };
