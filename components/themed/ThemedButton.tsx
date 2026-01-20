import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { StyleProp, TextStyle, TouchableOpacity, StyleSheet, View, TouchableOpacityProps } from "react-native";

import Text from "./ThemedText";
import { useThemeColor, ThemeProps } from "./useThemeColor";
import { commonStyles } from "./styles";

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

  const backgroundBase = useThemeColor({ light: lightColor, dark: darkColor }, `tint`);
  const backgroundColor = backgroundBase + (disabled ? `88` : ``);

  const textBase = useThemeColor({}, `text`);
  const textAccent = useThemeColor({ dark: '#fff' }, `textSecondary`);
  const textColor = variant === `filled` ? textAccent : textBase;

  return (
    <TouchableOpacity
      style={[
        full ? { flex: 1 } : { flex: 0 },
        styles.baseButton,
        { borderRadius: round ? 99 : commonStyles.card.borderRadius },
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
            bold
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
  > & { size?: number };

const TRANSPARENCY_MOD = `cc`;

export const ThemedIconButton = (props: IconButtonProps) => {
  const { style, lightColor, darkColor, icon, onPress, size = 20, variant = `clear` } = props;

  const colorBase = useThemeColor({ light: darkColor, dark: lightColor }, `tint`);
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, `card`);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.baseIconButton, variant !== `clear` ? { backgroundColor } : null, style]}
    >
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
    borderRadius: 12,
  },
});
