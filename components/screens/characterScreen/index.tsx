import React from "react";
import { StyleSheet } from "react-native";

import Equipment from "./Equipment";
import { ArmorTypes, CharacterModalSelectOptions as SelectOptions } from "./ICharacter";
import ProfilePicker from "./ProfilePicker";
import useGetArmorOptions from "./helpers/useGetArmorOptions";
import useGetProfileOptions from "./helpers/useGetProfileOptions";
import useManageCharacter from "./helpers/useManageCharacter";
import { SelectModal, SelectList } from "../../Dropdown";
import { View } from "../../Themed";

export default function CharacterScreen() {
  const {
    character,
    isSelectingType,
    showSelectModal,
    hideSelectModal,
    onPressConfirm,
    setIsFocusedItem,
    weaponTypeOptions,
    weaponOptions,
  } = useManageCharacter();
  const {
    armor: {
      head: equippedHead,
      chest: equippedChest,
      arms: equippedArms,
      waist: equippedWaist,
      legs: equippedLegs,
    },
    weapon: { type: equippedTypeWeapon, equipped: equippedWeapon },
  } = character.profile.equipment;

  const { optionsHead, optionsChest, optionsArms, optionsWaist, optionsLegs } =
    useGetArmorOptions();
  const { optionsProfile } = useGetProfileOptions();

  const renderSelectList = () => {
    switch (isSelectingType) {
      case SelectOptions.PROFILE:
        return (
          <SelectList
            options={optionsProfile}
            selectedValue={character.profile.profile_id}
            setSelectedItem={setIsFocusedItem}
          />
        );
      case ArmorTypes.HEAD:
        return (
          <SelectList
            options={optionsHead}
            selectedValue={equippedHead?.id}
            setSelectedItem={setIsFocusedItem}
          />
        );
      case ArmorTypes.CHEST:
        return (
          <SelectList
            options={optionsChest}
            selectedValue={equippedChest?.id}
            setSelectedItem={setIsFocusedItem}
          />
        );
      case ArmorTypes.ARMS:
        return (
          <SelectList
            options={optionsArms}
            selectedValue={equippedArms?.id}
            setSelectedItem={setIsFocusedItem}
          />
        );
      case ArmorTypes.WAIST:
        return (
          <SelectList
            options={optionsWaist}
            selectedValue={equippedWaist?.id}
            setSelectedItem={setIsFocusedItem}
          />
        );
      case ArmorTypes.LEGS:
        return (
          <SelectList
            options={optionsLegs}
            selectedValue={equippedLegs?.id}
            setSelectedItem={setIsFocusedItem}
          />
        );
      case SelectOptions.TYPE_WEAPON:
        return (
          <SelectList
            options={weaponTypeOptions}
            selectedValue={equippedTypeWeapon ?? undefined}
            setSelectedItem={setIsFocusedItem}
          />
        );
      case SelectOptions.WEAPON:
        return (
          <SelectList
            options={weaponOptions}
            selectedValue={equippedWeapon?.id}
            setSelectedItem={setIsFocusedItem}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SelectModal
        title="Select Profile"
        modalVisible={isSelectingType !== SelectOptions.NONE}
        setModalVisible={hideSelectModal}
        onPressConfirm={onPressConfirm}
      >
        {renderSelectList()}
      </SelectModal>
      <View style={styles.container}>
        <View>
          <ProfilePicker
            {...{
              profileName: character.profile.name,
              isActiveSelect: isSelectingType === SelectOptions.PROFILE,
              showSelectModal,
              selectType: SelectOptions.PROFILE,
            }}
          />
        </View>
        <View>
          <Equipment {...{ data: character.profile.equipment, isSelectingType, showSelectModal }} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: `100%`,
    left: 10,
    backgroundColor: `black`,
  },
});
