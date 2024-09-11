import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { StyleProp, TextStyle, TouchableOpacity, StyleSheet, View } from "react-native";

import Text from "./ThemedText";
import { useThemeColor, ThemeProps } from "./useThemeColor";

export type ButtonProps = ThemeProps &
  TouchableOpacity[`props`] & {
    title?: string;
    round?: boolean;
    variant?: `filled` | `outlined` | `clear`;
    icon?: keyof typeof FontAwesome.glyphMap | React.ReactNode;
    full?: boolean;
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
    disabled,
    full = false,
    ...otherProps
  } = props;

  const backgroundBase = useThemeColor({ light: lightColor, dark: darkColor }, `tint`);
  const backgroundColor = backgroundBase + (disabled ? `88` : ``);

  const textBase = useThemeColor({ light: darkColor, dark: lightColor }, `text`);
  const textAccent = useThemeColor({ light: lightColor, dark: darkColor }, `textSecondary`);
  const textColor = variant === `filled` ? textAccent : textBase;

  return (
    <TouchableOpacity
      style={[
        full ? { flex: 1 } : { flex: 0 },
        styles.baseButton,
        round ? styles.round : null,
        variant === `filled` ? { backgroundColor } : null,
        variant === `outlined` ? { borderColor: textColor, borderWidth: 1 } : null,
        variant === `clear` ? { backgroundColor: `transparent` } : null,
        icon && !title ? { padding: 0, margin: 0, minWidth: 0 } : null,
        style,
      ]}
      disabled={disabled}
      {...otherProps}
    >
      <View style={{ flexDirection: `row` }}>
        {/* @ts-ignore */}
        {icon && typeof icon === `string` ? (
          <FontAwesome name={icon as keyof typeof FontAwesome.glyphMap} size={25} color="#FFF" />
        ) : null}
        {icon && typeof icon !== `string` ? icon : null}
        {title ? (
          <Text
            variant="button"
            style={[{ color: textColor, flex: 1, textAlign: `center` }, textStyle]}
          >
            {title}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

type IconButtonProps = Pick<
  ButtonProps,
  `style` | `lightColor` | `darkColor` | `icon` | `onPress` | `variant`
>;

const TRANSPARENCY_MOD = `cc`;

export const ThemedIconButton = (props: IconButtonProps) => {
  const { style, lightColor, darkColor, icon, onPress, variant = `clear` } = props;

  const colorBase = useThemeColor({ light: darkColor, dark: lightColor }, `tint`);
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, `card`);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.baseIconButton, variant !== `clear` ? { backgroundColor } : null, style]}
    >
      {icon && typeof icon === `string` ? (
        // @ts-ignore
        <FontAwesome name={icon} size={25} color={`${colorBase}${TRANSPARENCY_MOD}`} />
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
    alignItems: `center`,
    justifyContent: `center`,
  },
  baseIconButton: {
    margin: 4,
    padding: 8,
    alignItems: `center`,
    justifyContent: `center`,
  },
  round: {
    borderRadius: 99,
  },
});
