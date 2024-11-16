import React, { useState } from "react";
import { TouchableOpacity, Button, useColorScheme, StyleSheet } from "react-native";

import { View, Text } from "../../Themed";

const ColorMap: Record<`light` | `dark`, Record<`red` | `green`, string>> = {
  light: {
    red: `#F33D`,
    green: `#373D`,
  },
  dark: {
    red: `#F338`,
    green: `#3F36`,
  },
};

export const HPCounter: React.FC<{ max: number }> = ({ max }) => {
  const [HP, setHP] = useState<number>(max);
  const [sign, setSign] = useState(-1);
  const scheme = useColorScheme() ?? `light`;
  const editHp = () => {
    if (sign === 1) setHP((hp) => (hp < max ? hp + 1 : max));
    else setHP((hp) => (hp > 0 ? hp - 1 : 0));
  };

  const onLongPress = () => (sign === 1 ? setHP(max) : null);

  const color = ColorMap[scheme][sign === -1 ? `red` : `green`];
  return (
    <View style={{ flex: 1, alignItems: `center` }}>
      <Button
        color={color}
        title={sign === -1 ? `Damage` : `Heal`}
        onPress={() => setSign((s) => -1 * s)}
      />
      <TouchableOpacity onPress={editHp} onLongPress={onLongPress} style={styles.hp}>
        <>
          <Text style={styles.hpLabel}>
            {HP}/{max}
          </Text>
        </>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  hp: {
    flex: 1,
    marginVertical: 2,
  },
  hpLabel: {
    fontSize: 48,
    textAlign: `center`,
  },
});
