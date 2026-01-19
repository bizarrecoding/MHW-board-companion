import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { TextInput } from "../../Themed";
import { FontAwesome } from "@expo/vector-icons";
import { useThemeColor } from "../useThemeColor";

type SearchInputProps = {
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
};

export default function SearchInput({
  onChangeText,
  placeholder = "Search materials...",
  style,
}: SearchInputProps) {
  const textColor = useThemeColor({}, `text`);
  return (
    <View style={[styles.container, style]}>
      <FontAwesome name="search" size={18} color={textColor} />
      <TextInput
        onChangeText={onChangeText}
        contentContainerStyle={{ backgroundColor: "#8880", marginVertical: 2 }}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: `row`,
    alignItems: `center`,
    paddingHorizontal: 16,
    margin: 16,
    borderRadius: 32,
    backgroundColor: "#8883",
  },
});