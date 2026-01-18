import { FontAwesome } from "@expo/vector-icons";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useThemeColor } from "../themed/useThemeColor";

type TargetIconProps = {
  target: string;
  style?: StyleProp<ViewStyle>;
};

const TargetIcon: React.FC<TargetIconProps> = ({ target, style }) => {
  const icon = target === `Melee` ? `gavel` : `crosshairs`;
  const backgroundColor = useThemeColor({ light: '#B74', dark: `#B74` }, `card`);
  const borderColor = useThemeColor({ light: `#FA7`, dark: `#FA7` }, `cardBorder`);
  return (
    <View style={[styles.iconWrapper, { backgroundColor, borderColor }, style]}>
      <FontAwesome name={icon} size={32} color="#333" style={styles.icon} />
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