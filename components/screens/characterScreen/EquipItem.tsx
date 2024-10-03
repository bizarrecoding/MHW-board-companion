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
      <Text variant="caption" style={styles.text}>
        {label ?? `Armor Item`}
      </Text>
      <SelectButton
        style={styles.select}
        modalVisible={isActiveSelect}
        selectedLabel={selectedLabel}
        showSelectModal={onSelectModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flex: 1,
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
    borderWidth: 1,
  },
  text: {
    flex: 0,
    width: `30%`,
    marginLeft: 8,
    borderWidth: 1,
  },
  select: {
    borderWidth: 1,
    minWidth: 210,
    flex: 1,
  },
});
