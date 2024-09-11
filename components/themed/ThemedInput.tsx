import { useState } from "react";
import { TextInput as DefaultTextInput, StyleSheet, View } from "react-native";

import { useThemeColor, ThemeProps } from "./useThemeColor";
import { IconButton } from "../Themed";

export type TextInputProps = ThemeProps &
  DefaultTextInput[`props`] & {
    variant?: `title` | `subtitle` | `button` | `caption` | `body` | `password`;
  };

const TRANSPARENCY_MOD = `D`;

export default function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, variant = `body`, ...otherProps } = props;
  const [visible, setVisible] = useState(false);
  const color = useThemeColor({ light: lightColor, dark: darkColor }, `text`);
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, `card`);

  switch (variant) {
    case `title`:
      return (
        <DefaultTextInput
          placeholderTextColor={`${color}${TRANSPARENCY_MOD}`}
          style={[{ color, backgroundColor }, styles.base, styles.title, style]}
          {...otherProps}
        />
      );
    case `subtitle`:
      return (
        <DefaultTextInput
          placeholderTextColor={`${color}${TRANSPARENCY_MOD}`}
          style={[{ color, backgroundColor }, styles.base, styles.subtitle, style]}
          {...otherProps}
        />
      );
    case `button`:
      return (
        <DefaultTextInput
          placeholderTextColor={`${color}${TRANSPARENCY_MOD}`}
          style={[{ color, backgroundColor }, styles.base, styles.button, style]}
          {...otherProps}
        />
      );
    case `caption`:
      return (
        <DefaultTextInput
          placeholderTextColor={`${color}${TRANSPARENCY_MOD}`}
          style={[{ color, backgroundColor }, styles.base, styles.caption, style]}
          {...otherProps}
        />
      );
    case `password`:
      return (
        <View style={[{ backgroundColor }, styles.passwordWrapper, styles.base, style]}>
          <DefaultTextInput
            placeholderTextColor={`${color}${TRANSPARENCY_MOD}`}
            secureTextEntry={!visible}
            passwordRules="minlength: 8;"
            style={[{ flex: 1, color }, styles.body, style]}
            {...otherProps}
          />
          <IconButton
            icon={visible ? `eye-slash` : `eye`}
            variant="clear"
            style={{ padding: 0, margin: 0 }}
            onPress={() => setVisible((v) => !v)}
          />
        </View>
      );
    case `body`:
    default:
      return (
        <DefaultTextInput
          placeholderTextColor={`${color}${TRANSPARENCY_MOD}`}
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
  passwordWrapper: {
    flexDirection: `row`,
    alignItems: `center`,
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
