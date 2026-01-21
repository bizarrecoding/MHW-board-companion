import { useState } from "react";
import { TextInput as NativeTextInput, StyleProp, StyleSheet, View, ViewStyle, TextInputProps as NativeTextInputProps } from "react-native";

import { ThemedIconButton } from "./ThemedButton";
import { useThemeColor, ThemeProps } from "./useThemeColor";

export type TextInputProps = ThemeProps &
  NativeTextInputProps & {
    variant?: `title` | `subtitle` | `button` | `caption` | `body` | `password`;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const TRANSPARENCY_MOD = `D`;

export default function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, variant = `body`, contentContainerStyle, ...otherProps } = props;
  const [visible, setVisible] = useState(false);
  const color = useThemeColor({ light: lightColor, dark: darkColor }, `text`);
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, `card`);

  if (variant !== `password`) {
    return (
      <View style={[{ backgroundColor }, styles.base, contentContainerStyle]}>
        <NativeTextInput
          placeholderTextColor={`${color}${TRANSPARENCY_MOD}`}
          style={[{ color, width: '100%' }, styles.body, style]}
          {...otherProps}
        />
      </View>
    );
  } else {
    return (
      <View style={[{ backgroundColor }, styles.base, contentContainerStyle]}>
        <NativeTextInput
          placeholderTextColor={`${color}${TRANSPARENCY_MOD}`}
          secureTextEntry={!visible}
          passwordRules="minlength: 8;"
          style={[{ flex: 1, color }, styles.body, style]}
          {...otherProps}
        />
        <ThemedIconButton
          icon={visible ? `eye-slash` : `eye`}
          variant="clear"
          style={{ padding: 0, margin: 0 }}
          onPress={() => setVisible((v) => !v)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 99,
    flexDirection: `row`,
    alignItems: `center`,
  },
  body: {
    fontSize: 14,
  },
});
