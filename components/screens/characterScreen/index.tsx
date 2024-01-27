import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Equipment from "./Equipment";
import ProfilePicker from "./ProfilePicker";
import useGetProfileOptions from "./helpers/useGetProfileOptions";
import { changeProfile, enableSaveProfile } from "../../../util/redux/CharacterSlice";
import { RootState } from "../../../util/redux/store";
import { SelectModal, SelectList } from "../../Dropdown";
import type { SelectedItemReturnType } from "../../Dropdown";
import { View } from "../../Themed";

export default function CharacterScreen() {
  const dispatch = useDispatch();
  const character = useSelector((state: RootState) => state.character);
  console.log(`🚀 ~ CharacterScreen ~ character.edit:`, character.hasProfileBeenEdit);

  const { profileList, optionsProfile } = useGetProfileOptions();
  const [isFocusedProfile, setIsFocusedProfile] = useState<SelectedItemReturnType>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onProfileSelection = () => {
    if (isFocusedProfile) {
      dispatch(changeProfile(profileList[isFocusedProfile.indexArray]));
      dispatch(enableSaveProfile(false));
    }
  };

  const showSelectModal = () => {
    // setIsSelectingType(armorType);
    setIsModalVisible(true);
  };

  const hideSelectModal = () => {
    // setIsSelectingType(IsArmorType.NONE);
    setIsModalVisible(false);
  };
  const renderSelectList = () => {
    return (
      <SelectList
        options={optionsProfile}
        selectedValue={character.profile.profile_id}
        setSelectedItem={setIsFocusedProfile}
      />
    );
  };

  return (
    <>
      <SelectModal
        title="Select Profile"
        modalVisible={isModalVisible}
        setModalVisible={hideSelectModal}
        onPressConfirm={onProfileSelection}
      >
        {renderSelectList()}
      </SelectModal>
      <View style={styles.container}>
        <View>
          <ProfilePicker
            {...{
              profileName: character.profile.name,
              onProfileSelection,
              isActiveSelect: isModalVisible,
              showSelectModal,
            }}
          />
        </View>
        <View>
          <Equipment {...{ data: character.profile.equipment.armor }} />
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
