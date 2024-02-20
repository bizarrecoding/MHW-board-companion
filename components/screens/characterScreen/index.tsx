import React from "react";
import { StyleSheet } from "react-native";

import Equipment from "./Equipment";
import { CharacterModalSelectOptions as SelectOptions } from "./ICharacter";
import ModalCharacter from "./ModalCharacter";
import ProfilePicker from "./ProfilePicker";
import { useManageCharacter } from "./helpers/useManageCharacter";
import { View } from "../../Themed";

export default function CharacterScreen() {
  const {
    character,
    isSelectingType,
    showSelectModal,
    hideSelectModal,
    onPressConfirm,
    renderListValues,
  } = useManageCharacter();

  return (
    <>
      <ModalCharacter
        isSelectingType={isSelectingType}
        hideSelectModal={hideSelectModal}
        onPressConfirm={onPressConfirm}
        renderListValues={renderListValues}
      />
      <View style={styles.container}>
        <View>
          <ProfilePicker
            profileName={character.profile.name}
            isActiveSelect={isSelectingType === SelectOptions.PROFILE}
            showSelectModal={showSelectModal}
            selectType={SelectOptions.PROFILE}
          />
        </View>
        <View>
          <Equipment
            data={character.profile.equipment}
            isSelectingType={isSelectingType}
            showSelectModal={showSelectModal}
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
