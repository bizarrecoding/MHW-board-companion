import React, { useMemo } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";

import { Text } from "../Themed";
import { useThemeColor } from "../themed/useThemeColor";
import DamageDice from "./DamageDice";

type RollDisplayProps = {
  roll: number[];
};

const getTotalDamage = (roll: number[]) => {
  let total = 0;
  for (let i = 0; i < roll.length; i++) {
    total += roll[i];
  }
  return total;
};

const getFitAmount = (length: number) => {
  if (length > 6) return 4;
  if (length > 4) return 3;
  return 2;
};

const ROLL_GAP = 12;
const ROLL_PADDING = 16;

const RollDisplay: React.FC<RollDisplayProps> = ({ roll = [] }) => {
  const width = useWindowDimensions().width;
  const totalDamage = getTotalDamage(roll);
  const cardColor = useThemeColor({}, `card`);
  const cardBorderColor = useThemeColor({}, `cardBorder`);
  const cardStyle = {
    backgroundColor: cardColor,
    borderColor: cardBorderColor,
  }; 

  const cardSize = useMemo(() => {
    if (roll.length === 0) return 0;
    if (roll.length < 3) return 145;
    if (roll.length < 5) return 100;
    const perRow = getFitAmount(roll.length);
    const negativeSpacing = (ROLL_GAP + ROLL_PADDING * 2) * (perRow - 1);
    const itemWidth = (width - negativeSpacing) / perRow - ROLL_PADDING;
    return itemWidth;
  }, [width, roll.length]);

  if (roll.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={[styles.header, cardStyle]}>
        <Text bold style={styles.totalLabel}>TOTAL DAMAGE</Text>
        <Text bold style={styles.totalValue}>{totalDamage}</Text>
      </View>

      <View style={styles.grid}>
        {roll.map((rollValue, index) => (
          <DamageDice key={index} cardSize={cardSize} rollValue={rollValue} />
        ))}
      </View>
    </View>
  );
};

export default RollDisplay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  header: {
    minWidth: 300,
    alignItems: `center`,
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  totalLabel: {
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 36,
    fontWeight: `900`,
    fontVariant: [`tabular-nums`],
  },
  grid: {
    flex: 1,
    flexDirection: `row`,
    flexWrap: `wrap`,
    justifyContent: `center`,
    gap: ROLL_GAP,
  },
});
