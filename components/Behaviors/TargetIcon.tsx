import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Colors from "../../constants/Colors";
import { useThemeColor } from "../themed/useThemeColor";

type TargetIconProps = {
  target: string;
  style?: StyleProp<ViewStyle>;
};

const TargetIcon: React.FC<TargetIconProps> = ({ target, style }) => {
  const icon = target === `Melee` ? `gavel` : `crosshairs`;
  const backgroundColor = useThemeColor({}, `secondary`) + 88;
  const borderColor = useThemeColor({ light: Colors.light.secondary }, `secondaryContainer`);
  const iconColor = useThemeColor({ light: Colors.light.secondaryFixedDim }, `onSecondary`);

  return (
    <View style={[styles.iconWrapper, { backgroundColor, borderColor }, style]}>
      <FontAwesome name={icon} size={32} color={iconColor} style={styles.icon} />
    </View>
  );
};

export default TargetIcon;

const iconSize = 40;

const styles = StyleSheet.create({
  icon: {
    textAlignVertical: `center`,
    textAlign: `center`,
    lineHeight: iconSize,
  },
  iconWrapper: {
    width: iconSize * 1.1,
    height: iconSize * 1.1,
    borderWidth: 1,
    borderRadius: iconSize,
    alignItems: `center`,
    justifyContent: `center`,
  },
});
