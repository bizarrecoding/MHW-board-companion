import { useState } from "react";
import { StyleSheet } from "react-native";

import EquipItem from "./EquipItem";
import { PlayerCharacterArgs } from "./character";
import type { ArmorPiece } from "./character";
import { SelectModal, SelectList } from "../../Dropdown";
import type { ItemData, SelectedItemReturnType } from "../../Dropdown";
import { View, Text } from "../../Themed";

const armorListHead: ArmorPiece[] = require(`../../../storage/armor-head.json`);
const armorListChest: ArmorPiece[] = require(`../../../storage/armor-chest.json`);
const armorListArms: ArmorPiece[] = require(`../../../storage/armor-arms.json`);
const armorListWaist: ArmorPiece[] = require(`../../../storage/armor-waist.json`);
const armorListLegs: ArmorPiece[] = require(`../../../storage/armor-legs.json`);

// const weaponsList: ArmorPiece[] = require(`../../../storage/armor-legs.json`);

type EquipmentOrNull = ArmorPiece | null;

const mapEquipmentToOptions = (equipmentList: ArmorPiece[]): ItemData[] => {
  return equipmentList.map((item) => ({
    label: item.name,
    value: item.id,
  }));
};

enum IsArmorType {
  NONE = ``,
  HEAD = `head`,
  CHEST = `chest`,
  ARMS = `arms`,
  WAIST = `waist`,
  LEGS = `legs`,
  WEAPON = `weapon`,
}

export default function Equipment({ playerProfile }: PlayerCharacterArgs) {
  console.log(`🚀 ~ Equipment ~ playerProfile:`, playerProfile);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isSelectingType, setIsSelectingType] = useState(IsArmorType.NONE);

  const optionsHead = mapEquipmentToOptions(armorListHead);
  const optionsChest = mapEquipmentToOptions(armorListChest);
  const optionsArms = mapEquipmentToOptions(armorListArms);
  const optionsWaist = mapEquipmentToOptions(armorListWaist);
  const optionsLegs = mapEquipmentToOptions(armorListLegs);

  const [equippedHead, setEquippedHead] = useState<EquipmentOrNull>(null);
  const [equippedChest, setEquippedChest] = useState<EquipmentOrNull>(null);
  const [equippedArms, setEquippedArms] = useState<EquipmentOrNull>(null);
  const [equippedWaist, setEquippedWaist] = useState<EquipmentOrNull>(null);
  const [equippedLegs, setEquippedLegs] = useState<EquipmentOrNull>(null);
  // const [equippedWeapon, setEquippedWeapon] = useState<EquipmentOrNull>(null);

  const [isFocusedHead, setIsFocusedHead] = useState<SelectedItemReturnType>(null);
  const [isFocusedChest, setIsFocusedChest] = useState<SelectedItemReturnType>(null);
  const [isFocusedArms, setIsFocusedArms] = useState<SelectedItemReturnType>(null);
  const [isFocusedWaist, setIsFocusedWaist] = useState<SelectedItemReturnType>(null);
  const [isFocusedLegs, setIsFocusedLegs] = useState<SelectedItemReturnType>(null);

  const showSelectModal = () => {
    setModalVisible(true);
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

  const isSelectingHead = isSelectingType === IsArmorType.HEAD;
  const isSelectingChest = isSelectingType === IsArmorType.CHEST;
  const isSelectingArms = isSelectingType === IsArmorType.ARMS;
  const isSelectingWaist = isSelectingType === IsArmorType.WAIST;
  const isSelectingLegs = isSelectingType === IsArmorType.LEGS;

  return (
    <>
      <SelectModal
        title="Select Equipment"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
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
            isActiveSelect={modalVisible && isSelectingHead}
            selectedLabel={equippedHead?.name}
            showSelectModal={showSelectModal}
            changeFocusedSelection={() => setIsSelectingType(IsArmorType.HEAD)}
          />
          <EquipItem
            label="Chest"
            isActiveSelect={modalVisible && isSelectingChest}
            selectedLabel={equippedChest?.name}
            showSelectModal={showSelectModal}
            changeFocusedSelection={() => setIsSelectingType(IsArmorType.CHEST)}
          />
          <EquipItem
            label="Arms"
            isActiveSelect={modalVisible && isSelectingArms}
            selectedLabel={equippedArms?.name}
            showSelectModal={showSelectModal}
            changeFocusedSelection={() => setIsSelectingType(IsArmorType.ARMS)}
          />
          <EquipItem
            label="Waist"
            isActiveSelect={modalVisible && isSelectingWaist}
            selectedLabel={equippedWaist?.name}
            showSelectModal={showSelectModal}
            changeFocusedSelection={() => setIsSelectingType(IsArmorType.WAIST)}
          />
          <EquipItem
            label="Legs"
            isActiveSelect={modalVisible && isSelectingLegs}
            selectedLabel={equippedLegs?.name}
            showSelectModal={showSelectModal}
            changeFocusedSelection={() => setIsSelectingType(IsArmorType.LEGS)}
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
