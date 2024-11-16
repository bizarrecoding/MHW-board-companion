import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

import { PartsData } from "../../../assets/data/hunt";
import { InventoryKind } from "../../../assets/data/types";
import InventoryIcon from "../../InventoryIcon";
import { View, Text } from "../../Themed";
import { useThemeColor } from "../../themed/useThemeColor";

type PartCardProps = {
  type: keyof PartsData;
  def: number;
  breakRes: number;
  onBreak: (part: keyof PartsData) => void;
};

const map: Record<string, InventoryKind> = {
  Head: `head`,
  Back: `ridge`,
  Legs: `claw`,
  Tail: `tail`,
};

const caret_map: Record<string, `caret-up` | `caret-down` | `caret-left`> = {
  Head: `caret-up`,
  Back: `caret-left`,
  Legs: `caret-left`,
  Tail: `caret-down`,
};

export const PartCard: React.FC<PartCardProps> = ({ type, def, breakRes, onBreak }) => {
  const textColor = useThemeColor({}, `text`);
  const [breakDmg, setBreakDmg] = useState(breakRes);
  const damagePart = () => {
    setBreakDmg((hp) => (hp > 0 ? hp - 1 : breakRes));
    if (breakDmg === 0) onBreak(type);
    if (breakDmg === 1) onBreak(type);
  };

  const backgroundColor = breakDmg === 0 ? `#F336` : `#FB7A`;
  return (
    <>
      <View style={{ flexDirection: `row`, alignItems: `center`, gap: 5 }}>
        <Text variant="caption">{type}</Text>
        <FontAwesome name={caret_map[type]} color={textColor} size={16} />
        {caret_map[type] === `caret-left` ? (
          <FontAwesome name="caret-right" color={textColor} size={16} />
        ) : null}
      </View>
      <View style={styles.partCard}>
        <InventoryIcon
          type={map[type]}
          style={[styles.part, styles.partIcon, { backgroundColor }]}
        />

        <ImageBackground
          source={require(`../../../assets/images/Defense.png`)}
          style={[styles.part, styles.partDef]}
        >
          <Text bold style={[styles.title, { color: `#EEE` }]}>
            {def}
          </Text>
        </ImageBackground>
        <TouchableOpacity onPress={damagePart}>
          <ImageBackground
            source={require(`../../../assets/images/break.png`)}
            style={[styles.part, styles.partBreak]}
          >
            <Text bold style={[styles.title, { color: `#333` }]}>
              {breakDmg}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  partCard: {
    flexDirection: `row`,
    paddingVertical: 8,
    marginBottom: 8,
  },
  part: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 0,
  },
  partIcon: {
    borderWidth: 2,
    borderRadius: 24,
    borderColor: `#FB7`,
  },
  partDef: {
    alignItems: `center`,
    justifyContent: `center`,
  },
  partBreak: {
    alignItems: `center`,
    justifyContent: `center`,
    marginTop: 3,
    width: 42,
    height: 42,
  },
});
