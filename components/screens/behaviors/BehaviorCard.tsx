// cspell:ignore crosshairs
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  useWindowDimensions,
  StyleSheet,
  useColorScheme,
  StyleProp,
  ViewStyle,
} from "react-native";

import DirectionalIcon from "./DirectionalIcon";
import { Behavior, InventoryKind } from "../../../assets/data/types";
import Colors from "../../../constants/Colors";
import InventoryIcon from "../../InventoryIcon";
import { View, Text } from "../../Themed";
import ResistanceIcon from "../monster/ResistanceIcon";

type BehaviorCardProps = {
  behavior: Behavior | null;
  hidden?: boolean;
};

const getIconFromPart = (part: string): InventoryKind => {
  switch (part) {
    case `Head`:
      return `head`;
    case `Back`:
      return `ridge`;
    case `Legs`:
      return `claw`;
    case `Tail`:
      return `tail`;
    default:
      return `ore`;
  }
};

type TargetIconProps = {
  target: string;
  style?: StyleProp<ViewStyle>;
};

const TargetIcon: React.FC<TargetIconProps> = ({ target, style }) => {
  const icon = target === `Melee` ? `gavel` : `crosshairs`;
  return (
    <View style={[{ flexDirection: `row`, alignItems: `center`, width: 32, height: 32 }, style]}>
      <FontAwesome name={icon} size={32} color="#FFF" />
    </View>
  );
};

export const BehaviorCard: React.FC<BehaviorCardProps> = ({ behavior, hidden }) => {
  const width = useWindowDimensions().width - 32;
  const colorScheme = useColorScheme();
  const { text } = Colors[colorScheme ?? `light`];

  if (!behavior) return <EmptyCard hidden={hidden} />;
  if (hidden) return <HiddenCard behavior={behavior} />;

  const [movement, direction] = behavior.movement ?? [0, null];
  return (
    <View
      style={{
        width,
        height: width,
        borderWidth: 1,
        borderColor: `#888`,
        borderRadius: width / 15,
        padding: 16,
      }}
    >
      <View style={styles.centerRow}>
        <InventoryIcon type={getIconFromPart(behavior.part)} />
        <Text variant="subtitle">{behavior?.name}</Text>
        <TargetIcon target={behavior.target} style={{ marginLeft: 12 }} />
      </View>
      <View style={styles.dataRow}>
        <Text variant="caption">Potential Damage: {behavior.damage}</Text>
        {behavior.effect ? (
          <ResistanceIcon type={behavior.effect} size={32} />
        ) : (
          <View style={{ minHeight: 32 }} />
        )}
      </View>
      <View style={[styles.dataRow2, { justifyContent: `space-between` }]}>
        <Text variant="caption">Dodge: {behavior.dodge}</Text>
        <Text variant="caption">Range: {behavior.range}</Text>
      </View>
      <View style={styles.columns}>
        <View style={{ flex: 1, minHeight: 60 + 16, marginVertical: 12, alignItems: `center` }}>
          <Text variant="caption" numberOfLines={2}>AoE:</Text>
          <DirectionalIcon size={60} directions={behavior.area} />
        </View>
        <View style={{ flex: 1, minHeight: 60 + 16, marginVertical: 12, alignItems: `center` }}>
          <Text variant="caption">Movement: {movement}</Text>
          <DirectionalIcon size={60} directions={direction ? [direction] : null} />
        </View>
      </View>
      <View style={styles.dataRow2}>
        <FontAwesome name="users" color={text} size={16} style={{ marginRight: 4 }} />
        <Text variant="caption">Turns: {behavior.turns}</Text>
        <View style={{ flex: 1 }} />
        <FontAwesome name="crosshairs" color={text} size={16} style={{ marginRight: 4 }} />
        <Text variant="caption">Actions: {behavior.actions}</Text>
      </View>
    </View>
  );
};

const HiddenCard: React.FC<Pick<BehaviorCardProps, `behavior`>> = ({ behavior }) => {
  const width = useWindowDimensions().width;
  const height = (width ?? 0 - 32) / 2;
  const target = behavior?.target ?? `Melee`;
  return (
    <View
      style={[
        {
          height,
          width: width - 32,
          borderRadius: width / 15,
        },
        styles.cardStyle,
      ]}
    >
      <TargetIcon target={target} style={styles.nextCardIcon} />
    </View>
  );
};

const EmptyCard: React.FC<Pick<BehaviorCardProps, `hidden`>> = ({ hidden }) => {
  const width = useWindowDimensions().width - 32;
  const height = hidden ? width / 2 : width;
  const scheme = useColorScheme();
  const { text: borderColor } = Colors[scheme ?? `light`];
  return (
    <View
      style={{
        width,
        height,
        borderColor,
        borderWidth: 1,
        borderStyle: `dashed`,
        borderRadius: width / 15,
      }}
    />
  );
};

const styles = StyleSheet.create({
  centerRow: {
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`,
  },
  dataRow: {
    flexDirection: `row`,
    alignItems: `center`,
    backgroundColor: `#fff3`,
    borderRadius: 30,
    padding: 3,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  columns: {
    flex: 1,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    padding: 8,
  },
  dataRow2: {
    flexDirection: `row`,
    alignItems: `center`,
    backgroundColor: `#fff3`,
    borderRadius: 30,
    padding: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  cardStyle: {
    backgroundColor: `#FCA`,
    justifyContent: `center`,
    alignItems: `center`,
  },
  nextCardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: `center`,
    justifyContent: `center`,
  },
});
