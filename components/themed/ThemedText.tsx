import { Text as DefaultText, StyleSheet } from "react-native";

import { useThemeColor, ThemeProps } from "./useThemeColor";

export type TextProps = ThemeProps &
  DefaultText[`props`] & {
    variant?: `title` | `subtitle` | `button` | `caption` | `body`;
    bold?: boolean;
  };
export default function Text(props: TextProps) {
  const { style, lightColor, darkColor, variant = `body`, bold = false, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, `text`);
  const boldStyle = bold ? styles.bold : undefined;
  switch (variant) {
    case `title`:
      return <DefaultText style={[{ color }, styles.title, style]} {...otherProps} />;
    case `subtitle`:
      return <DefaultText style={[{ color }, styles.subtitle, boldStyle, style]} {...otherProps} />;
    case `button`:
      return <DefaultText style={[{ color }, styles.button, boldStyle, style]} {...otherProps} />;
    case `caption`:
      return <DefaultText style={[{ color }, styles.caption, boldStyle, style]} {...otherProps} />;
    case `body`:
      return <DefaultText style={[{ color }, styles.body, boldStyle, style]} {...otherProps} />;
  }
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: `bold`,
  },
  title: {
    fontSize: 28,
    fontWeight: `bold`,
  },
  subtitle: {
    fontSize: 24,
  },
  button: {
    fontSize: 20,
  },
  caption: {
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
});

export const seamlessTextStyle = styles.body;
