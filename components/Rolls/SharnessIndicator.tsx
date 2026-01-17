import { View, StyleSheet, useWindowDimensions, useColorScheme } from "react-native";
import { WhetstoneIcon } from "../InventoryIcon";
import { Text } from "../Themed";
import { tintColor } from "../../constants/Colors";

type SharnessIndicatorProps = {
  sharpness: number;
  total: number;
  reset: () => void;
};

const SharpnessValues: Record<'light' | 'dark', string[]> = {
  light: ['#F66', '#E86', '#CC6', tintColor, tintColor, tintColor],
  dark: ['#C44', '#C62', '#CC4', tintColor, tintColor, tintColor],
}

const SharpnessBarHeight = 12;

const SharpnessIndicator: React.FC<SharnessIndicatorProps> = ({ sharpness, total, reset }) => {
  const width = useWindowDimensions().width / 2;
  const colorScheme = useColorScheme() ?? `light`;
  const sharpnessValue = Math.floor(sharpness / total * (SharpnessValues[colorScheme].length - 1));
  const bladeColor = SharpnessValues[colorScheme][sharpnessValue];

  const glowStyle = {
    ...styles.shadowStyle,
    shadowColor: bladeColor,
  };

  return (
    <View style={styles.container}>
      <WhetstoneIcon style={styles.sharpnessIconWrapper} onPress={reset} />
      <View style={[styles.sharpnessIconWrapper, { borderColor: bladeColor, borderWidth: 8 }]}>
        <Text style={styles.counterText}>{sharpness}</Text>
      </View>
      <View style={styles.bladeWrapper}>
        <View style={{
          backgroundColor: bladeColor,
          height: SharpnessBarHeight,
          width: width / 5
        }} />
        <View style={[glowStyle, {
          backgroundColor: `#888`,
          height: SharpnessBarHeight * 3,
          width,
          borderBottomRightRadius: SharpnessBarHeight * 3
        }]}>
          <View style={{
            backgroundColor: bladeColor,
            height: SharpnessBarHeight * 3,
            width: width * (sharpness / total),
            borderBottomRightRadius: SharpnessBarHeight * 3
          }} />
        </View>
      </View>
    </View>
  );
};

export default SharpnessIndicator;

const styles = StyleSheet.create({
  center_row: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  container: {
    padding: 16,
    flexDirection: `row`,
    alignItems: `center`,
  },
  sharpnessIconWrapper: {
    width: 44,
    height: 44,
    marginRight: 12,
    borderRadius: 999,
    alignItems: `center`,
    justifyContent: `center`,
  },
  shadowStyle: {
    elevation: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  counterText: {
    fontSize: 18,
    fontWeight: `bold`,
    textAlign: `center`,
  },
  bladeWrapper: {
    flexDirection: `row`,
    alignItems: `center`, 
  },
});