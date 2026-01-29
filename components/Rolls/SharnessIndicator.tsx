import { StyleSheet, useColorScheme, View } from "react-native";
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

import { useEffect } from "react";
import { tintColor } from "../../constants/Colors";
import { useResponsiveWidth } from "../../hooks/useResponsiveWidth";
import { WhetstoneIcon } from "../InventoryIcon";
import { Text } from "../Themed";

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

const getLayout = (width: number) => {
  const bladeHilt = Math.min(60, width / 5);
  return {
    bladeHilt,
    bladeWidth: width - bladeHilt,
  }
}

const SharpnessIndicator: React.FC<SharnessIndicatorProps> = ({ sharpness, total, reset }) => {
  const _width = useResponsiveWidth().width / 2;
  const { bladeHilt, bladeWidth } = getLayout(_width);
  const colorScheme = useColorScheme() ?? `light`;
  const sharpnessValue = Math.floor(sharpness / total * (SharpnessValues[colorScheme].length - 1));
  const bladeColor = SharpnessValues[colorScheme][sharpnessValue];

  const sharpnessAnimated = useSharedValue(bladeWidth * (sharpness / total));

  useEffect(() => {
    sharpnessAnimated.value = withTiming(bladeWidth * (sharpness / total), {
      duration: 600,
    });
  }, [sharpness, total, bladeWidth]);

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
          width: bladeHilt,
        }} />
        <View style={[glowStyle, {
          backgroundColor: `#888`,
          height: SharpnessBarHeight * 3,
          width: bladeWidth,
          borderBottomRightRadius: SharpnessBarHeight * 3
        }]}>
          <Animated.View style={{
            backgroundColor: bladeColor,
            height: SharpnessBarHeight * 3,
            width: sharpnessAnimated,
            borderBottomRightRadius: SharpnessBarHeight * 3
          }} />
        </View>
      </View>
    </View>
  );
};

export default SharpnessIndicator;

const styles = StyleSheet.create({
  container: {
    margin: "auto",
    paddingHorizontal: 16,
    marginVertical: 12,
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