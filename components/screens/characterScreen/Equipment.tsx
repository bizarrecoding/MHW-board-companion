import { StyleSheet } from "react-native";

import EquipItem from "./EquipItem";
import {
  ICharacterArgs,
  ArmorTypes,
  CharacterModalSelectOptions as SelectOptions,
} from "./ICharacter";
import { parseWeaponValueToLabel } from "./helpers/LoadWeaponOptions";
import { View, Text } from "../../Themed";

export default function Equipment({
  data,
  isSelectingType,
  showSelectModal,
}: ICharacterArgs.IEquipment) {
  const {
    armor: {
      head: equippedHead,
      chest: equippedChest,
      arms: equippedArms,
      waist: equippedWaist,
      legs: equippedLegs,
    },
    weapon: { type, equipped: equippedWeapon },
  } = data;
  const equippedTypeWeapon = parseWeaponValueToLabel(type);

  const isSelectingHead = isSelectingType === SelectOptions.HEAD;
  const isSelectingChest = isSelectingType === SelectOptions.CHEST;
  const isSelectingArms = isSelectingType === SelectOptions.ARMS;
  const isSelectingWaist = isSelectingType === SelectOptions.WAIST;
  const isSelectingLegs = isSelectingType === SelectOptions.LEGS;
  const isSelectingTypeWeapon = isSelectingType === SelectOptions.TYPE_WEAPON;
  const isSelectingWeapon = isSelectingType === SelectOptions.WEAPON;

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
            equipType={ArmorTypes.HEAD}
          />
          <EquipItem
            label="Chest"
            isActiveSelect={isSelectingChest}
            selectedLabel={equippedChest?.name}
            showSelectModal={showSelectModal}
            equipType={ArmorTypes.CHEST}
          />
          <EquipItem
            label="Arms"
            isActiveSelect={isSelectingArms}
            selectedLabel={equippedArms?.name}
            showSelectModal={showSelectModal}
            equipType={ArmorTypes.ARMS}
          />
          <EquipItem
            label="Waist"
            isActiveSelect={isSelectingWaist}
            selectedLabel={equippedWaist?.name}
            showSelectModal={showSelectModal}
            equipType={ArmorTypes.WAIST}
          />
          <EquipItem
            label="Legs"
            isActiveSelect={isSelectingLegs}
            selectedLabel={equippedLegs?.name}
            showSelectModal={showSelectModal}
            equipType={ArmorTypes.LEGS}
          />
          <EquipItem
            label="Weapon Type"
            isActiveSelect={isSelectingTypeWeapon}
            selectedLabel={equippedTypeWeapon}
            showSelectModal={showSelectModal}
            equipType={SelectOptions.TYPE_WEAPON}
          />
          <EquipItem
            label="Weapon"
            isActiveSelect={isSelectingWeapon}
            selectedLabel={equippedWeapon?.name}
            showSelectModal={showSelectModal}
            equipType={SelectOptions.WEAPON}
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
