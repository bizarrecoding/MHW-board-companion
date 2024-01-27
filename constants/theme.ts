import type { Theme } from "@react-navigation/native/src/types";

import Colors from "./Colors";

export const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: Colors[`light`].tint_dark,
    background: Colors[`light`].background,
    card: Colors[`light`].tint_dark + `88`,
    text: Colors[`light`].text,
    border: `rgb(216, 216, 216)`,
    notification: `rgb(255, 59, 48)`,
  },
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: Colors[`dark`].tint,
    background: Colors[`dark`].background,
    card: `rgb(18, 22, 18)`,
    text: Colors[`dark`].text,
    border: `rgb(39, 39, 41)`,
    notification: `rgb(255, 69, 58)`,
  },
};
