import React, { useMemo } from "react";
import { ImageBackground, View, ScrollView, StyleSheet, useWindowDimensions } from "react-native";

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

const RollDisplay: React.FC<RollDisplayProps> = ({ roll = [] }) => {
  const width = useWindowDimensions().width * 0.8;
  const totalDamage = getTotalDamage(roll);
  const cardColor = useThemeColor({}, `card`);
  const cardBorderColor = useThemeColor({}, `cardBorder`);
  const cardStyle = {
    backgroundColor: cardColor,
    borderColor: cardBorderColor,
  };


  const cardSize = useMemo(() => {
    if (roll.length === 0) return 0;
    if (roll.length === 1) return 160;
    const padding = 16;
    const gap = 12;
    const cols = roll.length <= 4 ? 2 : 3;
    return (width - padding * 2 - gap * (cols - 1)) / cols - 24;
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
    alignItems: `center`,
    marginHorizontal: 16,
    marginBottom: 20,
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
    fontSize: 48,
    fontWeight: `900`,
    fontVariant: [`tabular-nums`],
  },
  grid: {
    flex: 1,
    flexDirection: `row`,
    flexWrap: `wrap`,
    justifyContent: `center`,
    gap: 12,
  },
});
