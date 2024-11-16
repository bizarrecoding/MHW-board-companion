import React from "react";
import { View, Image, ViewStyle, StyleSheet, StyleProp } from "react-native";

export type Elements = `Fire` | `Water` | `Thunder` | `Ice` | `Dragon`;
export type Ailments = `Paralysis` | `Poison` | `Sleep` | `Blast` | `Stun`;

type ResistanceProps = {
  type: Elements | Ailments;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

const IMAGE_MAP: Record<Elements | Ailments | `none`, any> = {
  Fire: require(`../../../assets/images/resistance/elem-fire.webp`),
  Water: require(`../../../assets/images/resistance/elem-water.webp`),
  Thunder: require(`../../../assets/images/resistance/elem-thunder.webp`),
  Ice: require(`../../../assets/images/resistance/elem-ice.webp`),
  Dragon: require(`../../../assets/images/resistance/elem-dragon.webp`),
  Paralysis: require(`../../../assets/images/resistance/status-paralysis.webp`),
  Poison: require(`../../../assets/images/resistance/status-poison.webp`),
  Sleep: require(`../../../assets/images/resistance/status-sleep.webp`),
  Blast: require(`../../../assets/images/resistance/status-blast.webp`),
  Stun: require(`../../../assets/images/resistance/status-stun.webp`),
  none: undefined,
};

const ResistanceIcon: React.FC<ResistanceProps> = ({ type, size, style }) => {
  const iconStyle = size ? { width: size, height: size } : {};
  return (
    <View style={[styles.wrapper, style]}>
      <Image source={IMAGE_MAP[type ?? `none`]} style={iconStyle} resizeMode="contain" />
    </View>
  );
};

export default ResistanceIcon;

const styles = StyleSheet.create({
  wrapper: {
    width: 32,
    height: 32,
  },
});
