/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { useColorScheme } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../../constants/Colors";
import { RootState } from "../../util/redux/store";

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export function useThemeColor(
  props: { light?: string; dark?: string } | undefined,
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const systemColorScheme = useColorScheme() ?? `light`;
  const themePreference = useSelector((state: RootState) => state.settings.theme);

  const theme = themePreference === "system" ? systemColorScheme : themePreference;
  const colorFromProps = props ? props[theme] : undefined;

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
