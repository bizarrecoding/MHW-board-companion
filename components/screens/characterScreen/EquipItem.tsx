import React from "react";
import { StyleSheet } from "react-native";

import { ICharacterArgs } from "./ICharacter";
import { SelectButton } from "../../Dropdown";
import { View, Text } from "../../Themed";

export default function EquipItem({
  label,
  isActiveSelect,
  selectedLabel,
  showSelectModal,
  equipType,
}: ICharacterArgs.IEquipItem) {
  const onSelectModal = () => {
    showSelectModal(equipType);
  };

  return (
    <View style={styles.itemRow}>
      <Text>{label ?? `Armor Item`}</Text>
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
});
