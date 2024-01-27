import { TextInput as DefaultTextInput, StyleSheet } from "react-native";

import { useThemeColor, ThemeProps } from "./useThemeColor";

export type TextInputProps = ThemeProps &
  DefaultTextInput[`props`] & {
    variant?: `title` | `subtitle` | `button` | `caption` | `body`;
  };
export default function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, variant = `body`, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, `text`);
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, `modal`);

  switch (variant) {
    case `title`:
      return (
        <DefaultTextInput
          placeholderTextColor={`${color}8`}
          style={[{ color, backgroundColor }, styles.base, styles.title, style]}
          {...otherProps}
        />
      );
    case `subtitle`:
      return (
        <DefaultTextInput
          placeholderTextColor={`${color}8`}
          style={[{ color, backgroundColor }, styles.base, styles.subtitle, style]}
          {...otherProps}
        />
      );
    case `button`:
      return (
        <DefaultTextInput
          placeholderTextColor={`${color}8`}
          style={[{ color, backgroundColor }, styles.base, styles.button, style]}
          {...otherProps}
        />
      );
    case `caption`:
      return (
        <DefaultTextInput
          placeholderTextColor={`${color}8`}
          style={[{ color, backgroundColor }, styles.base, styles.caption, style]}
          {...otherProps}
        />
      );
    case `body`:
      return (
        <DefaultTextInput
          placeholderTextColor={`${color}8`}
          style={[{ color, backgroundColor }, styles.base, styles.body, style]}
          {...otherProps}
        />
      );
  }
}

const styles = StyleSheet.create({
  base: {
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 99,
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
