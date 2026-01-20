import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ImageBackground, View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import { PartsData } from "../../assets/data/hunt";
import { InventoryKind } from "../../assets/data/types";
import { RootState } from "../../util/redux/store";
import InventoryIcon from "../InventoryIcon";
import { Text } from "../Themed";
import { useThemeColor } from "../themed/useThemeColor";
import { commonStyles } from "../themed/styles";

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

const caret_map: Record<string, `caret-up` | `caret-down` | `caret-left` | `caret-right`> = {
  Head: `caret-up`,
  Back: `caret-left`,
  Legs: `caret-left`,
  "Left Leg": `caret-left`,
  "Right Leg": `caret-right`,
  Tail: `caret-down`,
};

const ICON_SIZE = 50;

const getPartLabel = (monster: string, type: string) => {
  if (monster === `Jyuratodus` && type === `Back`) return `Right Leg`;
  if (monster === `Jyuratodus` && type === `Legs`) return `Left Leg`;
  return type;
};

export const PartCard: React.FC<PartCardProps> = ({ type, def, breakRes, onBreak }) => {
  const textColor = useThemeColor({}, `text`);
  const textSecondaryColor = useThemeColor({ light: `#666`, dark: `#AAA` }, `textSecondary`);

  const { monster } = useSelector((state: RootState) => state.hunt);
  const [breakDmg, setBreakDmg] = useState(breakRes);
  const isBroken = breakDmg === 0;

  const damagePart = () => {
    setBreakDmg((hp) => (hp > 0 ? hp - 1 : breakRes));
    if (breakDmg === 1) onBreak(type);
    if (breakDmg === 0) onBreak(type); // Toggle back
  };

  useEffect(() => {
    if (breakRes) setBreakDmg(breakRes);
  }, [breakRes]);

  if (monster === `Pukei-Pukei` && type === `Back`) return null;

  const partLabel = getPartLabel(monster, type);
  const caretIcon = caret_map[partLabel];
  const partIcon = map[partLabel.includes(`Leg`) ? `Legs` : type];

  const partIconBorderColor = isBroken ? `#F33` : `#D95`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text bold variant="body" style={[styles.label, { color: textSecondaryColor }]}>
          {partLabel.toUpperCase()}
        </Text>
        <FontAwesome name={caretIcon} color={textColor} size={14} /> 
        {[`Legs`, `Back`].includes(partLabel) ? (
          <FontAwesome name="caret-right" color={textColor} size={14} />
        ) : null}
      </View>

      <View style={[styles.content, commonStyles.cardBackground]}>
        <View style={[styles.iconWrapper, { borderColor: partIconBorderColor }]}>
          <InventoryIcon
            type={partIcon}
            style={[styles.partIcon, isBroken && { opacity: 0.5 }]}
          />
          {isBroken && (
            <View style={styles.brokenOverlay}>
              <FontAwesome name="close" color="#F33" size={32} />
            </View>
          )}
        </View>

        <View style={styles.stats}>
          <ImageBackground
            source={require(`../../assets/images/Defense.png`)}
            style={styles.statBox}
          >
            <Text bold style={styles.statText}>
              {def}
            </Text>
          </ImageBackground>

          <TouchableOpacity onPress={damagePart}>
            <ImageBackground
              source={require(`../../assets/images/break.png`)}
              style={styles.statBox}
            >
              <Text bold style={[styles.statText, { color: `#333` }]}>
                {breakDmg}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  header: {
    flexDirection: `row`,
    alignItems: `center`,
    gap: 6,
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    letterSpacing: 1,
  },
  content: {
    ...commonStyles.row,
    ...commonStyles.card, 
  },
  iconWrapper: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    borderWidth: 2,
    alignItems: `center`,
    justifyContent: `center`,
    overflow: `hidden`,
  },
  partIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  brokenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `rgba(255,0,0,0.1)`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  stats: {
    flex: 1,
    flexDirection: `row`,
    justifyContent: `flex-end`,
    gap: 8,
  },
  statBox: {
    width: ICON_SIZE - 6,
    height: ICON_SIZE - 6,
    alignItems: `center`,
    justifyContent: `center`,
  },
  statText: {
    fontSize: 18,
    color: `#EEE`,
  },
});
