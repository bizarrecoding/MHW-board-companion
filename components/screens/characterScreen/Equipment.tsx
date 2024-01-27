import { useState } from "react";
import { StyleSheet } from "react-native";

import EquipItem from "./EquipItem";
import { PlayerCharacterArgs, IsArmorType } from "./character";
import useGetArmorOptions from "./helpers/useGetArmorOptions";
import useManageEquipment from "./helpers/useManageEquipment";
import { SelectModal, SelectList } from "../../Dropdown";
import { View, Text } from "../../Themed";

export default function Equipment({ playerProfile }: PlayerCharacterArgs) {
  console.log(`🚀 ~ Equipment ~ playerProfile:`, playerProfile);
  const {
    optionsHead,
    optionsChest,
    optionsArms,
    optionsWaist,
    optionsLegs,
    armorListHead,
    armorListChest,
    armorListArms,
    armorListWaist,
    armorListLegs,
  } = useGetArmorOptions();
  const [isSelectingType, setIsSelectingType] = useState(IsArmorType.NONE);
  const isSelectingNONE = isSelectingType === IsArmorType.NONE;
  const isSelectingHead = isSelectingType === IsArmorType.HEAD;
  const isSelectingChest = isSelectingType === IsArmorType.CHEST;
  const isSelectingArms = isSelectingType === IsArmorType.ARMS;
  const isSelectingWaist = isSelectingType === IsArmorType.WAIST;
  const isSelectingLegs = isSelectingType === IsArmorType.LEGS;

  const {
    equippedHead,
    setEquippedHead,
    equippedChest,
    setEquippedChest,
    equippedArms,
    setEquippedArms,
    equippedWaist,
    setEquippedWaist,
    equippedLegs,
    setEquippedLegs,
    isFocusedHead,
    setIsFocusedHead,
    isFocusedChest,
    setIsFocusedChest,
    isFocusedArms,
    setIsFocusedArms,
    isFocusedWaist,
    setIsFocusedWaist,
    isFocusedLegs,
    setIsFocusedLegs,
  } = useManageEquipment();

  const showSelectModal = (armorType: IsArmorType) => {
    setIsSelectingType(armorType);
  };

  const hideSelectModal = () => {
    setIsSelectingType(IsArmorType.NONE);
  };

  const onPressConfirm = () => {
    switch (isSelectingType) {
      case IsArmorType.HEAD:
        if (isFocusedHead) setEquippedHead(armorListHead[isFocusedHead.indexArray]);
        break;
      case IsArmorType.CHEST:
        if (isFocusedChest) setEquippedChest(armorListChest[isFocusedChest.indexArray]);
        break;
      case IsArmorType.ARMS:
        if (isFocusedArms) setEquippedArms(armorListArms[isFocusedArms.indexArray]);
        break;
      case IsArmorType.WAIST:
        if (isFocusedWaist) setEquippedWaist(armorListWaist[isFocusedWaist.indexArray]);
        break;
      case IsArmorType.LEGS:
        if (isFocusedLegs) setEquippedLegs(armorListLegs[isFocusedLegs.indexArray]);
        break;
      // case IsArmorType.WEAPON:
      //   setEquippedHead(armorListHead[isFocusedHead.indexArray]);
      //   break;

      default:
        break;
    }
  };

  return (
    <>
      <SelectModal
        title="Select Equipment"
        modalVisible={!isSelectingNONE}
        setModalVisible={hideSelectModal}
        onPressConfirm={onPressConfirm}
      >
        {isSelectingHead ? (
          <SelectList
            options={optionsHead}
            selectedValue={equippedHead?.id}
            setSelectedItem={setIsFocusedHead}
          />
        ) : null}
        {isSelectingChest ? (
          <SelectList
            options={optionsChest}
            selectedValue={equippedChest?.id}
            setSelectedItem={setIsFocusedChest}
          />
        ) : null}
        {isSelectingArms ? (
          <SelectList
            options={optionsArms}
            selectedValue={equippedArms?.id}
            setSelectedItem={setIsFocusedArms}
          />
        ) : null}
        {isSelectingWaist ? (
          <SelectList
            options={optionsWaist}
            selectedValue={equippedWaist?.id}
            setSelectedItem={setIsFocusedWaist}
          />
        ) : null}
        {isSelectingLegs ? (
          <SelectList
            options={optionsLegs}
            selectedValue={equippedLegs?.id}
            setSelectedItem={setIsFocusedLegs}
          />
        ) : null}
        {/* <SelectList
          options={}
          selectedValue={equippedWeapon?.id}
          setSelectedItem={setIsFocusedWeapon}
        /> */}
      </SelectModal>
      <View style={styles.equipmentContainer}>
        <Text>Equipment</Text>
        <View style={styles.equipItemsContainer}>
          <EquipItem
            label="Head"
            isActiveSelect={isSelectingHead}
            selectedLabel={equippedHead?.name}
            showSelectModal={showSelectModal}
            armorType={IsArmorType.HEAD}
          />
          <EquipItem
            label="Chest"
            isActiveSelect={isSelectingChest}
            selectedLabel={equippedChest?.name}
            showSelectModal={showSelectModal}
            armorType={IsArmorType.CHEST}
          />
          <EquipItem
            label="Arms"
            isActiveSelect={isSelectingArms}
            selectedLabel={equippedArms?.name}
            showSelectModal={showSelectModal}
            armorType={IsArmorType.ARMS}
          />
          <EquipItem
            label="Waist"
            isActiveSelect={isSelectingWaist}
            selectedLabel={equippedWaist?.name}
            showSelectModal={showSelectModal}
            armorType={IsArmorType.WAIST}
          />
          <EquipItem
            label="Legs"
            isActiveSelect={isSelectingLegs}
            selectedLabel={equippedLegs?.name}
            showSelectModal={showSelectModal}
            armorType={IsArmorType.LEGS}
          />
          {/* <EquipItem
            label="Weapon"
            isActiveSelect={modalVisible}
            selectedLabel={equippedWeapon?.name}
            showSelectModal={showSelectModal}
          /> */}
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
  equipItemsContainer: {
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
});
