import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { View, StyleSheet } from "react-native";

import { useThemeColor } from "../themed/useThemeColor";
import { Direction } from "../../assets/data/types";

interface DirectionalIconProps {
  size?: number;
  directions?: Direction[] | null;
}
type DirectionIconName = "caret-up" | "caret-down" | "caret-left" | "caret-right";
type DirectionIconProps = {
  size?: number;
  active?: boolean;
  label: DirectionIconName;
}

const Diagonal = ({ size = 16 }) => <View style={[styles.tile, { width: size / 3, height: size / 3 }]} />

const DirectionIcon: React.FC<DirectionIconProps> = ({ size = 16, active = false, label }) => {
  const tileStyle = { width: size / 3, height: size / 3 };
  const accentColor = useThemeColor({}, `accent`);
  const textColor = useThemeColor({}, `tabIconDefault`);
  return (
    <View style={[styles.tile, tileStyle, active && { backgroundColor: `${accentColor}20`, borderColor: accentColor }]}>
      <FontAwesome name={label} color={active ? accentColor : textColor} size={size / 4} />
    </View>
  )
}

const DirectionalIcon: React.FC<DirectionalIconProps> = ({ size = 16, directions }) => { 
  const front = directions?.includes(`Front`);
  const back = directions?.includes(`Back`);
  const left = directions?.includes(`Left`);
  const right = directions?.includes(`Right`);  
  return (
    <View style={{ width: size, height: size }}>
      <View style={styles.row}>
        <Diagonal size={size} />
        <DirectionIcon size={size} active={front} label="caret-up" />
        <Diagonal size={size} />
      </View>
      <View style={styles.row}>
        <DirectionIcon size={size} active={left} label="caret-left" />
        <Diagonal size={size} />
        <DirectionIcon size={size} active={right} label="caret-right" />
      </View>
      <View style={styles.row}>
        <Diagonal size={size} />
        <DirectionIcon size={size} active={back} label="caret-down" />
        <Diagonal size={size} />
      </View>
    </View>
  );
};

export default DirectionalIcon;

const styles = StyleSheet.create({
  tile: {
    borderColor: "rgba(0,0,0,0.03)",
    borderWidth: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },
  row: {
    flexDirection: `row`,
  },
});
