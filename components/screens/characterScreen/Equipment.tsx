import { StyleSheet } from "react-native";

import EquipItem from "./EquipItem";
import {
  ICharacterArgs,
  ArmorTypes,
  CharacterModalSelectOptions as SelectOptions,
} from "./ICharacter";
import { View, Text } from "../../Themed";

export default function Equipment({
  data,
  isSelectingType,
  showSelectModal,
}: ICharacterArgs.IEquipment) {
  const {
    head: equippedHead,
    chest: equippedChest,
    arms: equippedArms,
    waist: equippedWaist,
    legs: equippedLegs,
  } = data ?? {};

  const isSelectingHead = isSelectingType === SelectOptions.HEAD;
  const isSelectingChest = isSelectingType === SelectOptions.CHEST;
  const isSelectingArms = isSelectingType === SelectOptions.ARMS;
  const isSelectingWaist = isSelectingType === SelectOptions.WAIST;
  const isSelectingLegs = isSelectingType === SelectOptions.LEGS;

  return (
    <>
      <View style={styles.equipmentContainer}>
        <Text>Equipment</Text>
        <View style={styles.equipItemsContainer}>
          <EquipItem
            label="Head"
            isActiveSelect={isSelectingHead}
            selectedLabel={equippedHead?.name}
            showSelectModal={showSelectModal}
            armorType={ArmorTypes.HEAD}
          />
          <EquipItem
            label="Chest"
            isActiveSelect={isSelectingChest}
            selectedLabel={equippedChest?.name}
            showSelectModal={showSelectModal}
            armorType={ArmorTypes.CHEST}
          />
          <EquipItem
            label="Arms"
            isActiveSelect={isSelectingArms}
            selectedLabel={equippedArms?.name}
            showSelectModal={showSelectModal}
            armorType={ArmorTypes.ARMS}
          />
          <EquipItem
            label="Waist"
            isActiveSelect={isSelectingWaist}
            selectedLabel={equippedWaist?.name}
            showSelectModal={showSelectModal}
            armorType={ArmorTypes.WAIST}
          />
          <EquipItem
            label="Legs"
            isActiveSelect={isSelectingLegs}
            selectedLabel={equippedLegs?.name}
            showSelectModal={showSelectModal}
            armorType={ArmorTypes.LEGS}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  equipmentContainer: {
    width: `90%`,
    marginTop: 10,
  },
  equipItemsContainer: {},
});
