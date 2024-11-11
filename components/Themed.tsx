/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { View as DefaultView } from "react-native";

import Button, { ThemedIconButton as IconButton } from "./themed/ThemedButton";
import TextInput from "./themed/ThemedInput";
import Text from "./themed/ThemedText";
import { useThemeColor, ThemeProps } from "./themed/useThemeColor";

export type ViewProps = ThemeProps &
  DefaultView[`props`] & {
    transparent?: boolean;
  };

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const _backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, `background`);
  const backgroundColor = props.transparent ? undefined : _backgroundColor;
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export { Button, Text, TextInput, IconButton };
