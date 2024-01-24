import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { View, Text } from "../../Themed";

export interface EquipItemArgs {
  label: string;
  item: any;
}
export default function EquipItem({ label, item }: EquipItemArgs) {
  return (
    <View style={styles.itemRow}>
      <Text>{label ?? `Armor Item`}</Text>
      <TextInput style={styles.input} value={item} />
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: `row`,
    marginTop: 10,
    justifyContent: `space-between`,
    alignItems: `center`,
  },
  input: {
    backgroundColor: `#eee`,
    padding: 5,
    width: `70%`,
  },
});
