import React from "react";
import { Image, ImageStyle, StyleProp, StyleSheet } from "react-native";

import { View } from "./Themed";
import { InventoryKind, MonsterKind, RankType } from "../assets/data/types";

const Barroth = require(`../assets/images/monster/MHW-Barroth_Icon.webp`);
const Diablos = require(`../assets/images/monster/MHW-Diablos_Icon.webp`);
const Jyuratodus = require(`../assets/images/monster/MHW-Jyuratodus_Icon.webp`);
const PukeiPukei = require(`../assets/images/monster/MHW-Pukei-Pukei_Icon.webp`);
const BlackDiablos = require(`../assets/images/monster/MHW-Black_Diablos_Icon.webp`);

const ColorMap: Record<string, string> = {
  Barroth: `#D5A683`,
  Diablos: `#F5A623`,
  Blos: `#F5A623`,
  Twisted: `#F5A623`,
  Majestic: `#F5A623`,
  Jyuratodus: `#4499EE`,
  "Pukei-Pukei": `#77AA22`,
  Black: `#444`,
  "Black Diablos": `#666666`,
  Fucium: `#F8A`,
  Carbalite: `#A8F`,
  Dragonite: `#8C8`,
  Malachite: `#8AD`,
  Dragonvein: `#A33`,
  Monster: `#FFD`,
  Quality: `#FFD`,
  Ancient: `#FFD`,
  Boulder: `#FFD`,
  Aqua: `#8BF`,
  Poison: `#D8F`,
  Toxic: `#A6D`,
};

type InventoryIconProps = {
  type: InventoryKind;
  name?: string;
  style?: StyleProp<ImageStyle>;
};

const InventoryIcon_ = ({ type }: InventoryIconProps) => {
  switch (type) {
    case `ore`:
      return (
        <Image
          style={styles.InventoryIcon}
          source={require(`../assets/images/materials/Ore.webp`)}
        />
      );
    case `shell`:
      return (
        <Image
          style={styles.InventoryIcon}
          source={require(`../assets/images/materials/Shell.webp`)}
        />
      );
    case `bone`:
      return (
        <Image
          style={styles.InventoryIcon}
          source={require(`../assets/images/materials/Bone.webp`)}
        />
      );
    case `wing`:
      return (
        <Image
          style={styles.InventoryIcon}
          source={require(`../assets/images/materials/Wing.webp`)}
        />
      );
    case `sac`:
      return (
        <Image
          style={styles.InventoryIcon}
          source={require(`../assets/images/materials/Sac.webp`)}
        />
      );
    case `mud`:
      return (
        <Image
          style={styles.InventoryIcon}
          source={require(`../assets/images/materials/Dung.webp`)}
        />
      );
    case `scale`:
      return (
        <Image
          style={styles.InventoryIcon}
          source={require(`../assets/images/materials/Scale.webp`)}
        />
      );
    case `gem`:
      return (
        <Image
          style={styles.InventoryIcon}
          source={require(`../assets/images/materials/Gem.webp`)}
        />
      );
    case `tail`:
      return (
        <Image
          style={styles.InventoryIcon}
          source={require(`../assets/images/materials/Tail.webp`)}
        />
      );
    case `claw`:
      return (
        <Image
          style={styles.InventoryIcon}
          source={require(`../assets/images/materials/Claw.webp`)}
        />
      );
    case `ridge`:
      return (
        <Image
          style={styles.InventoryIcon}
          source={require(`../assets/images/materials/Ridge.webp`)}
        />
      );
    case `hide`:
      return (
        <Image
          style={styles.InventoryIcon}
          source={require(`../assets/images/materials/Hide.webp`)}
        />
      );
    default:
      return <View />;
  }
};
export default function InventoryIcon({ type, name }: InventoryIconProps) {
  const [key] = name?.split(` `) || [];
  return (
    <View
      style={[
        styles.InventoryIconWrapper,
        {
          backgroundColor: key ? ColorMap[key] ?? `#888` : `#888`,
          borderWidth: 1,
          borderColor: `#3333`,
        },
      ]}
    >
      <InventoryIcon_ type={type} />
    </View>
  );
}

type MonsterIconProps = {
  type: MonsterKind;
  rank?: RankType;
  style?: StyleProp<ImageStyle>;
};

const MonsterIcon_: React.FC<MonsterIconProps> = ({ type }) => {
  switch (type) {
    case `Barroth`:
      return <Image style={styles.MonsterIcon} source={Barroth} />;
    case `Pukei-Pukei`:
      return <Image style={styles.MonsterIcon} source={PukeiPukei} />;
    case `Jyuratodus`:
      return <Image style={styles.MonsterIcon} source={Jyuratodus} />;
    case `Diablos`:
      return <Image style={styles.MonsterIcon} source={Diablos} />;
    case `Black Diablos`:
      return <Image style={styles.MonsterIcon} source={BlackDiablos} />;
    default:
      return <View />;
  }
};

const TRANSPARENCY_MOD = `88`;
const BORDER_MAP: Record<RankType, string> = {
  "Low Rank": `#3333`,
  "High Rank": `#8888`,
  "Master Rank": `#FC68`,
};
export const MonsterIcon = (props: MonsterIconProps) => {
  const { rank, type } = props;
  const borderColor = BORDER_MAP[rank ?? `Low Rank`];
  return (
    <View
      style={[
        styles.MonsterIconWrapper,
        {
          backgroundColor: type ? ColorMap[type] + TRANSPARENCY_MOD ?? `#8888` : `#8888`,
          borderWidth: 3,
          borderColor,
        },
        props.style,
      ]}
    >
      <MonsterIcon_ {...props} />
    </View>
  );
};

const ICON_SIZES = {
  small: 40,
  medium: 50,
  large: 60,
} as const;

const styles = StyleSheet.create({
  InventoryIconWrapper: {
    alignItems: `center`,
    justifyContent: `center`,
    width: ICON_SIZES.small,
    height: ICON_SIZES.small,
    borderRadius: 60,
    marginRight: 16,
  },
  InventoryIcon: {
    width: ICON_SIZES.small - 16,
    height: ICON_SIZES.small - 16,
  },
  MonsterIconWrapper: {
    alignItems: `center`,
    justifyContent: `center`,
    width: ICON_SIZES.medium,
    height: ICON_SIZES.medium,
    borderRadius: 60,
    marginRight: 16,
    padding: 8,
    backgroundColor: `#888`,
  },
  MonsterIcon: {
    width: ICON_SIZES.medium - 8,
    height: ICON_SIZES.medium - 8,
  },
});
