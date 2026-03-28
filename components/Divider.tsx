import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { View } from "./Themed";
import { useThemeColor } from "./themed/useThemeColor";

type DividerProps = {
  style?: StyleProp<ViewStyle>;
  variant?: `title` | `full`;
  separation?: number;
  lightColor?: string;
  darkColor?: string;
};

export default function Divider(props: DividerProps) {
  const backgroundColor = useThemeColor({ light: "#eee", dark: "rgba(255,255,255,0.1)" }, "textSecondary");
  return (
    <View
      style={[
        styles.divider,
        props.variant === `title` ? { width: `80%` } : null,
        props.style,
        { marginVertical: props.separation ?? 30, backgroundColor },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
  },
});
