import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Text } from "../Themed";
import { ThemeProps, useThemeColor } from "../themed/useThemeColor";

type SelectButtonArgs = ThemeProps & {
  modalVisible: boolean;
  showSelectModal: () => void;
  selectedLabel?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
};

export const SelectButton = ({
  modalVisible,
  showSelectModal,
  selectedLabel,
  placeholder = ``,
  style,
  lightColor,
  darkColor,
}: SelectButtonArgs) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, `card`);
  const accentColor = useThemeColor({ light: lightColor, dark: darkColor }, `accent`);
  const iconName = modalVisible ? `caret-up` : `caret-down`;

  return (
    <TouchableOpacity onPress={showSelectModal} style={[styles.select, { backgroundColor }, style]}>
      <>
        <Text variant="body">{selectedLabel ?? placeholder}</Text>
        <FontAwesome name={iconName} size={18} color={accentColor} />
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  select: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    minHeight: 40,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginVertical: 8,
    marginHorizontal: 8,
  },
});
