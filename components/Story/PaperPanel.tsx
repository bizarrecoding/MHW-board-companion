import React from "react";
import { StyleSheet, TextProps, View } from "react-native";
import Colors from "../../constants/Colors";
import { Text } from "../Themed";
import { commonStyles } from "../themed/styles";
import { useThemeColor } from "../themed/useThemeColor";

type PaperPanelProps = React.PropsWithChildren;
type PaperTextProps = TextProps;

const PaperPanel: React.FC<PaperPanelProps> = ({ children }) => {
  const backgroundColor = useThemeColor({ dark: Colors.dark.onSecondaryFixedVariant }, "secondaryFixed");
  const borderColor = useThemeColor({ dark: Colors.dark.onSecondary }, "secondaryFixedDim");
  return <View style={[styles.content, { backgroundColor, borderColor }]}>{children}</View>;
};

export default PaperPanel;

export const PaperText: React.FC<PaperTextProps> = ({ style, ...rest }) => {
  const color = useThemeColor({ dark: Colors.dark.secondaryFixed }, "onSecondaryFixed");
  return (
    <Text variant="caption" style={[styles.text, { color }, style]} {...rest}>
      {rest.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  content: {
    ...commonStyles.card,
    ...commonStyles.shadows,
    borderWidth: 12,
    borderRadius: 4,
    padding: 16,
    paddingVertical: 32,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1,
    fontFamily: "NewsreaderItalic",
  },
});
