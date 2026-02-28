import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleProp, StyleSheet, TextStyle, View } from "react-native";

import { TextInput } from "../../Themed";
import { commonStyles } from "../styles";
import { useThemeColor } from "../useThemeColor";

type SearchInputProps = {
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
};

export default function SearchInput({ onChangeText, placeholder = "Search materials..." }: SearchInputProps) {
  const bgColor = useThemeColor({ light: `#DEDEDE`, dark: `#191919` }, `background`);
  const textColor = useThemeColor({}, `text`);
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <FontAwesome name="search" size={18} color={textColor} />
      <TextInput onChangeText={onChangeText} contentContainerStyle={styles.input} placeholder={placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.row,
    ...commonStyles.card,
    ...commonStyles.shadows,
    paddingVertical: 1,
    paddingHorizontal: 16,
    margin: 16,
    borderRadius: 32,
    borderColor: "#8883",
  },
  input: {
    paddingVertical: Platform.OS === "android" ? -4 : 2,
    width: "100%",
    backgroundColor: "#8880",
  },
});
