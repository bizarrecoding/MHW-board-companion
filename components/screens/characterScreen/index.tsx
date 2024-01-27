import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Equipment from "./Equipment";
import { ArmorTypes, CharacterModalSelectOptions as SelectOptions } from "./ICharacter";
import ProfilePicker from "./ProfilePicker";
import useGetArmorOptions from "./helpers/useGetArmorOptions";
import useGetProfileOptions from "./helpers/useGetProfileOptions";
import useManageCharacter from "./helpers/useManageCharacter";
import useManageEquipment from "./helpers/useManageEquipment";
import { RootState } from "../../../util/redux/store";
import { SelectModal, SelectList } from "../../Dropdown";
import { View } from "../../Themed";

export default function CharacterScreen() {
  const character = useSelector((state: RootState) => state.character);

  const {
    head: equippedHead,
    chest: equippedChest,
    arms: equippedArms,
    waist: equippedWaist,
    legs: equippedLegs,
  } = character.profile.equipment.armor;

  const { optionsHead, optionsChest, optionsArms, optionsWaist, optionsLegs } =
    useGetArmorOptions();
  const { optionsProfile } = useGetProfileOptions();
  const {
    setIsFocusedHead,
    setIsFocusedChest,
    setIsFocusedArms,
    setIsFocusedWaist,
    setIsFocusedLegs,
  } = useManageEquipment();
  const { isSelectingType, setIsFocusedProfile, showSelectModal, hideSelectModal, onPressConfirm } =
    useManageCharacter();

  const renderSelectList = () => {
    switch (isSelectingType) {
      case SelectOptions.PROFILE:
        return (
          <SelectList
            options={optionsProfile}
            selectedValue={character.profile.profile_id}
            setSelectedItem={setIsFocusedProfile}
          />
        );
      case ArmorTypes.HEAD:
        return (
          <SelectList
            options={optionsHead}
            selectedValue={equippedHead?.id}
            setSelectedItem={setIsFocusedHead}
          />
        );
      case ArmorTypes.CHEST:
        return (
          <SelectList
            options={optionsChest}
            selectedValue={equippedChest?.id}
            setSelectedItem={setIsFocusedChest}
          />
        );
      case ArmorTypes.ARMS:
        return (
          <SelectList
            options={optionsArms}
            selectedValue={equippedArms?.id}
            setSelectedItem={setIsFocusedArms}
          />
        );
      case ArmorTypes.WAIST:
        return (
          <SelectList
            options={optionsWaist}
            selectedValue={equippedWaist?.id}
            setSelectedItem={setIsFocusedWaist}
          />
        );
      case ArmorTypes.LEGS:
        return (
          <SelectList
            options={optionsLegs}
            selectedValue={equippedLegs?.id}
            setSelectedItem={setIsFocusedLegs}
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
          <Equipment
            {...{ data: character.profile.equipment.armor, isSelectingType, showSelectModal }}
          />
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
