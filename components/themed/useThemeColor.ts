/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export function useThemeColor(
  props: { light?: string; dark?: string } | undefined,
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? `light`;
  const colorFromProps = props ? props[theme] : undefined;

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
