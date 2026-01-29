import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";

import { TextInput } from "../../Themed";
import { commonStyles } from "../styles";
import { useThemeColor } from "../useThemeColor";

type SearchInputProps = {
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
};

export default function SearchInput({
  onChangeText,
  placeholder = "Search materials...",
}: SearchInputProps) {
  const bgColor = useThemeColor({ light: `#DEDEDE`, dark: `#191919` }, `background`);
  const textColor = useThemeColor({}, `text`);
  // for web inputs have focus indicators that do not match the container style
  // so we need to use a different approach and style the input directly 
  // while overlaying the icon on top of it
  return (
    <>
      <FontAwesome name="search" size={18} color={textColor} style={styles.icon} />
      <TextInput
        onChangeText={onChangeText}
        contentContainerStyle={styles.input}
        placeholder={placeholder}
        style={[styles.container, { backgroundColor: bgColor }]}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.row,
    ...commonStyles.card,
    ...commonStyles.shadows,
    borderRadius: 32,
    borderColor: '#8883',
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 8,
    margin: 0,
  },
  input: {
    paddingVertical: 2,
    width: "100%",
    backgroundColor: "#8880",
  },
  icon: {
    position: "absolute",
    left: 32,
    top: 22,
    zIndex: 10,
  }
});