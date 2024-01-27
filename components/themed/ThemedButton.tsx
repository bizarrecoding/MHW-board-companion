import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { StyleProp, TextStyle, TouchableOpacity, StyleSheet } from "react-native";

import Text from "./ThemedText";
import { useThemeColor, ThemeProps } from "./useThemeColor";

export type ButtonProps = ThemeProps &
  TouchableOpacity[`props`] & {
    title?: string;
    round?: boolean;
    variant?: `filled` | `outlined` | `clear`;
    icon?: keyof typeof FontAwesome.glyphMap | React.ReactNode;
    textStyle?: StyleProp<TextStyle>;
  };

export default function Button(props: ButtonProps) {
  const {
    style,
    lightColor,
    darkColor,
    title = ``,
    icon,
    textStyle,
    round = true,
    variant = `filled`,
    ...otherProps
  } = props;

  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, `tint`);

  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, `textSecondary`);

  return (
    <TouchableOpacity
      style={[
        styles.baseButton,
        round ? styles.round : null,
        variant === `filled` ? { backgroundColor } : null,
        variant === `outlined` ? { borderColor: textColor, borderWidth: 1 } : null,
        variant === `clear` ? { backgroundColor: `transparent` } : null,
        icon && !title ? { padding: 0, margin: 0, minWidth: 0 } : null,
        style,
      ]}
      {...otherProps}
    >
      {/* @ts-ignore */}
      {icon && typeof icon === `string` ? <FontAwesome name={icon} size={25} color="#FFF" /> : null}
      {icon && typeof icon !== `string` ? icon : null}
      {title ? (
        <Text variant="button" style={[{ color: textColor }, textStyle]}>
          {title}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 10,
    minWidth: 100,
    alignItems: `center`,
    justifyContent: `center`,
  },
  round: {
    borderRadius: 99,
  },
});
