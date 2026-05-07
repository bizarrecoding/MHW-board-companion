import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import { commonStyles } from "./styles";
import Text from "./ThemedText";
import { ThemeProps, useThemeColor } from "./useThemeColor";

export type ButtonProps = ThemeProps &
  TouchableOpacityProps & {
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
    round = false,
    variant = `filled`,
    disabled,
    full = false,
    ...otherProps
  } = props;

  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, disabled ? "outline" : `primary`);
  const borderColor = useThemeColor({ dark: darkColor }, "onPrimary");

  const textAccent = useThemeColor({}, `onPrimary`);
  const textBase = useThemeColor({}, "primary");
  const textColor = variant === `filled` ? textAccent : textBase;

  return (
    <TouchableOpacity
      style={[
        full ? { flex: 1 } : { flex: 0, minHeight: 45 },
        styles.baseButton,
        { borderRadius: round ? 99 : commonStyles.button.borderRadius },
        variant === `filled` ? { backgroundColor, borderColor } : null,
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
          <Text bold variant="button" style={[{ color: textColor, flex: 1, textAlign: `center` }, textStyle]}>
            {title}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

type IconButtonProps = Pick<ButtonProps, `style` | `lightColor` | `darkColor` | `icon` | `onPress` | `variant`> & {
  size?: number;
};

const TRANSPARENCY_MOD = `cc`;

export const ThemedIconButton = (props: IconButtonProps) => {
  const { style, lightColor, darkColor, icon, onPress, size = 20, variant = `clear` } = props;

  const colorBase = useThemeColor({ light: darkColor, dark: lightColor }, `primary`);
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, `card`);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.baseIconButton, variant !== `clear` ? { backgroundColor } : null, style]}>
      {icon && typeof icon === `string` ? (
        // @ts-ignore
        <FontAwesome name={icon} size={size} color={`${colorBase}${TRANSPARENCY_MOD}`} />
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    ...commonStyles.button,
    minWidth: 100,
  },
  baseIconButton: {
    margin: 4,
    padding: 8,
    alignItems: `center`,
    justifyContent: `center`,
  },
});
