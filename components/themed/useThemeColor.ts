/**
 * Theme color hook supporting both legacy color names and DESIGN.md tokens.
 *
 * Legacy colors (backward compatible):
 *   text, textSecondary, background, card, cardBorder, accent, tint, tint_dark,
 *   tabIconDefault, tabIconSelected
 *
 * DESIGN.md "Wilderness Hunter" tokens:
 *   surface, surfaceDim, surfaceBright, surfaceContainerLowest, surfaceContainerLow,
 *   surfaceContainer, surfaceContainerHigh, surfaceContainerHighest, surfaceVariant,
 *   surfaceTint, onSurface, onSurfaceVariant, inverseSurface, inverseOnSurface,
 *   inversePrimary, primary, onPrimary, primaryContainer, onPrimaryContainer,
 *   primaryFixed, primaryFixedDim, onPrimaryFixed, onPrimaryFixedVariant,
 *   secondary, onSecondary, secondaryContainer, onSecondaryContainer,
 *   secondaryFixed, secondaryFixedDim, onSecondaryFixed, onSecondaryFixedVariant,
 *   tertiary, onTertiary, tertiaryContainer, onTertiaryContainer,
 *   tertiaryFixed, tertiaryFixedDim, onTertiaryFixed, onTertiaryFixedVariant,
 *   error, onError, errorContainer, onErrorContainer,
 *   outline, outlineVariant, background, onBackground
 */

import { useColorScheme } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../../constants/Colors";
import { RootState } from "../../util/redux/store";

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

// All color keys available in both light and dark themes (legacy + DESIGN.md tokens)
export type ColorToken = keyof typeof Colors.light & keyof typeof Colors.dark;

export function useThemeColor(props: { light?: string; dark?: string } | undefined, colorName: ColorToken): string {
  const systemColorScheme = useColorScheme() ?? `light`;
  const themePreference = useSelector((state: RootState) => state.settings.theme);

  const theme = themePreference === "system" ? systemColorScheme : themePreference;
  const colorFromProps = props ? props[theme] : undefined;

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorName];
}
