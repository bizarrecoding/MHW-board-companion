import React from "react";
import { StyleSheet } from "react-native";

import { IsArmorType } from "./ICharacter";
import { SelectButton } from "../../Dropdown";
import { View, Text } from "../../Themed";

export interface EquipItemArgs {
  label: string;
  isActiveSelect: boolean;
  selectedLabel?: string;
  showSelectModal: (armorType: IsArmorType) => void;
  armorType: IsArmorType;
}
export default function EquipItem({
  label,
  isActiveSelect,
  selectedLabel,
  showSelectModal,
  armorType,
}: EquipItemArgs) {
  const onSelectModal = () => {
    showSelectModal(armorType);
  };

  return (
    <View style={styles.itemRow}>
      <Text>{label ?? `Armor Item`}</Text>
      {/* <TextInput style={styles.input} value={item} /> */}
      <SelectButton
        modalVisible={isActiveSelect}
        selectedLabel={selectedLabel}
        showSelectModal={onSelectModal}
      />
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
