import { StyleSheet } from "react-native";

import EquipItem from "./EquipItem";
import { IEquipment, IsArmorType } from "./ICharacter";
import useGetArmorOptions from "./helpers/useGetArmorOptions";
import useManageEquipment from "./helpers/useManageEquipment";
import { SelectModal, SelectList } from "../../Dropdown";
import { View, Text } from "../../Themed";

export default function Equipment({ data }: IEquipment) {
  const {
    head: equippedHead,
    chest: equippedChest,
    arms: equippedArms,
    waist: equippedWaist,
    legs: equippedLegs,
  } = data ?? {};

  const { optionsHead, optionsChest, optionsArms, optionsWaist, optionsLegs } =
    useGetArmorOptions();

  const {
    showSelectModal,
    hideSelectModal,
    onPressConfirm,
    isSelectingType,
    setIsFocusedHead,
    setIsFocusedChest,
    setIsFocusedArms,
    setIsFocusedWaist,
    setIsFocusedLegs,
  } = useManageEquipment();

  const isSelectingNONE = isSelectingType === IsArmorType.NONE;
  const isSelectingHead = isSelectingType === IsArmorType.HEAD;
  const isSelectingChest = isSelectingType === IsArmorType.CHEST;
  const isSelectingArms = isSelectingType === IsArmorType.ARMS;
  const isSelectingWaist = isSelectingType === IsArmorType.WAIST;
  const isSelectingLegs = isSelectingType === IsArmorType.LEGS;

  const renderSelectList = () => {
    switch (isSelectingType) {
      case IsArmorType.HEAD:
        return (
          <SelectList
            options={optionsHead}
            selectedValue={equippedHead?.id}
            setSelectedItem={setIsFocusedHead}
          />
        );
      case IsArmorType.CHEST:
        return (
          <SelectList
            options={optionsChest}
            selectedValue={equippedChest?.id}
            setSelectedItem={setIsFocusedChest}
          />
        );
      case IsArmorType.ARMS:
        return (
          <SelectList
            options={optionsArms}
            selectedValue={equippedArms?.id}
            setSelectedItem={setIsFocusedArms}
          />
        );
      case IsArmorType.WAIST:
        return (
          <SelectList
            options={optionsWaist}
            selectedValue={equippedWaist?.id}
            setSelectedItem={setIsFocusedWaist}
          />
        );
      case IsArmorType.LEGS:
        return (
          <SelectList
            options={optionsLegs}
            selectedValue={equippedLegs?.id}
            setSelectedItem={setIsFocusedLegs}
          />
        );
      // case IsArmorType.WEAPON:
      //   <SelectList
      //     options={}
      //     selectedValue={equippedWeapon?.id}
      //     setSelectedItem={setIsFocusedWeapon}
      //   />
      //   setEquippedHead(armorListHead[isFocusedHead.indexArray]);
      //   break;
      default:
        return null;
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
        {renderSelectList()}
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
