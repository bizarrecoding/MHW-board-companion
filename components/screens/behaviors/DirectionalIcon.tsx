import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { StyleSheet } from "react-native";

import { View } from "../../Themed";

const DirectionalIcon = ({ size = 16 }) => {
  const color = `#FFF`;
  const tileStyle = { minWidth: size / 3, height: size / 3, maxHeight: size / 3 };
  const rowStyle = { minWidth: size, height: size / 3, maxHeight: size / 3 };
  // caret${match ? "-square-o":""}-${direction}
  return (
    <View style={{ flex: 1, minHeight: size, minWidth: size }}>
      <View style={[styles.row, rowStyle]}>
        <View style={[styles.tile, tileStyle]} />
        <View style={[styles.tile, tileStyle]}>
          <FontAwesome name="caret-up" color={color} size={16} />
        </View>
        <View style={[styles.tile, tileStyle]} />
      </View>
      <View style={[styles.row, rowStyle]}>
        <View style={[styles.tile, tileStyle]}>
          <FontAwesome name="caret-left" color={color} size={16} />
        </View>
        <View style={[styles.tile, tileStyle]} />
        <View style={[styles.tile, tileStyle]}>
          <FontAwesome name="caret-right" color={color} size={16} />
        </View>
      </View>
      <View style={[styles.row, rowStyle]}>
        <View style={[styles.tile, tileStyle]} />
        <View style={[styles.tile, tileStyle]}>
          <FontAwesome name="caret-down" color={color} size={16} />
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
