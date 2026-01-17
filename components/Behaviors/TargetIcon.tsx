import { FontAwesome } from "@expo/vector-icons";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useThemeColor } from "../themed/useThemeColor";

type TargetIconProps = {
  target: string;
  style?: StyleProp<ViewStyle>;
};

const TargetIcon: React.FC<TargetIconProps> = ({ target, style }) => {
  const icon = target === `Melee` ? `gavel` : `crosshairs`;
  const textColor = useThemeColor({}, `text`) + 'C';
  const backgroundColor = useThemeColor({ light: '#A64', dark: `#A64` }, `card`);
  const borderColor = useThemeColor({ light: `#FA7`, dark: `#FA7` }, `cardBorder`);
  return (
    <View style={[styles.icon, { backgroundColor, borderColor }, style]}>
      <FontAwesome name={icon} size={32} color={textColor} />
    </View>
  );
};

export default TargetIcon;

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: `center`,
    justifyContent: `center`,
  },
});