import { DefaultTheme as BaseDefaultTheme, DarkTheme as BaseDarkTheme, Theme } from "@react-navigation/native";

import Colors from "./Colors";

export const DefaultTheme: Theme = {
  dark: false,
  colors: {
    ...BaseDefaultTheme.colors,
    primary: Colors[`light`].tint_dark,
    background: Colors[`light`].background,
    card: `rgb(106, 148, 147)`,
    text: Colors[`light`].text,
    border: `rgb(216, 216, 216)`,
    notification: `rgb(255, 59, 48)`,
  },
  fonts: {
    ...BaseDefaultTheme.fonts,
  }
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    ...BaseDarkTheme.colors,
    primary: Colors[`dark`].tint,
    background: Colors[`dark`].background,
    card: `rgb(18, 22, 18)`,
    text: Colors[`dark`].text,
    border: `rgb(39, 39, 41)`,
    notification: `rgb(255, 69, 58)`,
  },
  fonts: {
    ...BaseDarkTheme.fonts,
  }
};
