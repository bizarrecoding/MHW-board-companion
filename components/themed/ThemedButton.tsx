import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Text from "./ThemedText";
import { useThemeColor, ThemeProps } from "./useThemeColor";

export type ButtonProps = ThemeProps &
  TouchableOpacity[`props`] & {
    title: string;
    round?: boolean;
    variant?: `filled` | `outlined`;
    textStyle?: StyleProp<TextStyle>;
  };

export default function Button(props: ButtonProps) {
  const {
    style,
    lightColor,
    darkColor,
    title,
    round = true,
    textStyle,
    variant = `filled`,
    ...otherProps
  } = props;

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    `tint`,
  );

  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    `textSecondary`,
  );
  return (
    <TouchableOpacity
      style={[
        styles.baseButton,
        round ? styles.round : null,
        variant === `filled` ? { backgroundColor } : null,
        style,
      ]}
      {...otherProps}
    >
      <Text variant="button" style={[{ color: textColor }, textStyle]}>
        {title}
      </Text>
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
