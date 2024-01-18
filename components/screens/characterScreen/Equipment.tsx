import React from "react";
import { StyleSheet } from "react-native";

import EquipItem from "./EquipItem";
import { PlayerCharacterArgs } from "./character";
import { View, Text } from "../../Themed";

export default function Equipment({ playerProfile }: PlayerCharacterArgs) {
  return (
    <View style={styles.equipmentContainer}>
      <Text>Equipment</Text>
      <View style={styles.equipItemsContainer}>
        <EquipItem label="Head" item={playerProfile?.equipment.head ?? ``} />
        <EquipItem label="Chest" item={playerProfile?.equipment.chest ?? ``} />
        <EquipItem label="Arms" item={playerProfile?.equipment.arms ?? ``} />
        <EquipItem label="Waist" item={playerProfile?.equipment.waist ?? ``} />
        <EquipItem label="Boots" item={playerProfile?.equipment.boots ?? ``} />
        <EquipItem
          label="Weapon"
          item={playerProfile?.equipment.weapon ?? ``}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  equipmentContainer: {
    width: `90%`,
    marginTop: 10,
  },
  equipItemsContainer: {
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
});
