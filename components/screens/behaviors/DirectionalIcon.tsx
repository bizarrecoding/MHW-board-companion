import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { StyleSheet } from "react-native";

import { View } from "../../Themed";
import { useThemeColor } from "../../themed/useThemeColor";
import { Direction } from "../../../assets/data/types";

interface DirectionalIconProps {
  size?: number;
  directions?: Direction[] | null;
}

const DirectionalIcon = ({ size = 16, directions }: DirectionalIconProps) => {
  const textColor = useThemeColor({}, `text`);
  const textColorOff = useThemeColor({}, `textSecondary`);
  const tileStyle = { minWidth: size / 3, height: size / 3, maxHeight: size / 3 };
  const rowStyle = { minWidth: size, height: size / 3, maxHeight: size / 3 };

  const front = directions?.includes(`Front`);
  const back = directions?.includes(`Back`);
  const left = directions?.includes(`Left`);
  const right = directions?.includes(`Right`);
  console.log(directions, front, back, left, right);
  return (
    <View style={{ flex: 1, minHeight: size, minWidth: size }}>
      <View style={[styles.row, rowStyle]}>
        <View style={[styles.tile, tileStyle]} />
        <View style={[styles.tile, tileStyle]}>
          <FontAwesome name="caret-up" color={front ? textColor : textColorOff} size={16} />
        </View>
        <View style={[styles.tile, tileStyle]} />
      </View>
      <View style={[styles.row, rowStyle]}>
        <View style={[styles.tile, tileStyle]}>
          <FontAwesome name="caret-left" color={left ? textColor : textColorOff} size={16} />
        </View>
        <View style={[styles.tile, tileStyle]} />
        <View style={[styles.tile, tileStyle]}>
          <FontAwesome name="caret-right" color={right ? textColor : textColorOff} size={16} />
        </View>
      </View>
      <View style={[styles.row, rowStyle]}>
        <View style={[styles.tile, tileStyle]} />
        <View style={[styles.tile, tileStyle]}>
          <FontAwesome name="caret-down" color={back ? textColor : textColorOff} size={16} />
        </View>
        <View style={[styles.tile, tileStyle]} />
      </View>
    </View>
  );
};

export default DirectionalIcon;

const styles = StyleSheet.create({
  tile: {
    borderWidth: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },
  row: {
    flexDirection: `row`,
    flex: 1,
  },
});
