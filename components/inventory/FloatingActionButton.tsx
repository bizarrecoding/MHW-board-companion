import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleProp, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View, ViewStyle } from "react-native";
import { commonStyles } from "../themed/styles";
import { useThemeColor } from "../themed/useThemeColor";

type FloatingActionButtonProps = {
  icon: "plus";
  size: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ icon, size, style, onPress }) => {
  const iconColor = useThemeColor({}, `onTertiary`);
  const backgroundColor = useThemeColor({}, `tertiary`);
  const customStyles = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor,
  };

  return (
    <View style={style}>
      <TouchableComponent onPress={onPress} style={{ borderWidth: 0, borderColor: "transparent" }}>
        <View style={[styles.fab, commonStyles.shadows, customStyles]}>
          <FontAwesome name={icon} size={size / 2} color={iconColor} />
        </View>
      </TouchableComponent>
    </View>
  );
};

export default FloatingActionButton;

const TouchableComponent = Platform.OS === "web" ? TouchableOpacity : TouchableNativeFeedback;

const styles = StyleSheet.create({
  fab: {
    justifyContent: "center",
    alignItems: "center",
  },
});
