import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

import { Text } from "../Themed";
import { tintColor, alertColor } from "../../constants/Colors";

export const HPCounter: React.FC<{ max: number }> = ({ max }) => {
  const [HP, setHP] = useState<number>(max);
  const [sign, setSign] = useState<-1 | 1>(-1);

  const ColorMap = {
    red: alertColor,
    green: tintColor,
  };

  const editHp = () => {
    if (sign === 1) setHP((hp) => Math.min(hp + 1, max));
    else setHP((hp) => Math.max(hp - 1, 0));
  };

  useEffect(() => {
    if (max) setHP(max);
  }, [max]);

  const onLongPress = () => sign === 1 && setHP(max);

  const hpPercentage = (HP / max) * 100;
  const barColor = HP / max > 0.5 ? ColorMap.green : HP / max > 0.2 ? `#FB0` : ColorMap.red;

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => setSign(-1)}
          style={[styles.toggleBtn, sign === -1 && { backgroundColor: ColorMap.red + `44` }]}
        >
          <Text style={[styles.toggleText, sign === -1 && { color: ColorMap.red, fontWeight: `bold` }]}>
            Damage
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSign(1)}
          style={[styles.toggleBtn, sign === 1 && { backgroundColor: ColorMap.green + `44` }]}
        >
          <Text style={[styles.toggleText, sign === 1 && { color: ColorMap.green, fontWeight: `bold` }]}>
            Heal
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={editHp} onLongPress={onLongPress} style={styles.hpDisplay}>
        <Text style={styles.hpLabel}>
          {HP}
          <Text style={styles.hpMax}> / {max}</Text>
        </Text>
        <View style={styles.barContainer}>
          <View
            style={[
              styles.barFill,
              { width: `${hpPercentage}%`, backgroundColor: barColor },
            ]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    paddingHorizontal: 8,
  },
  controls: {
    flexDirection: `row`,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `#555`,
    overflow: `hidden`,
    marginBottom: 12,
  },
  toggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: `center`,
    minWidth: 80,
  },
  toggleText: {
    fontSize: 14,
    color: `#888`,
  },
  hpDisplay: {
    alignItems: `center`,
    width: `100%`,
  },
  hpLabel: {
    fontSize: 42,
    fontWeight: `900`,
    fontVariant: [`tabular-nums`],
    marginBottom: 4,
  },
  hpMax: {
    fontSize: 20,
    color: `#777`,
    fontWeight: `normal`,
  },
  barContainer: {
    height: 8,
    width: `100%`,
    backgroundColor: `#222`,
    borderRadius: 4,
    overflow: `hidden`,
    borderWidth: 1,
    borderColor: `#444`,
  },
  barFill: {
    height: `100%`,
    borderRadius: 3,
  },
});
