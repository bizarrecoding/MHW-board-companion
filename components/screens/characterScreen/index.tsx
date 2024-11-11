import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

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
    <View style={styles.container}>
      <ModalCharacter
        isSelectingType={isSelectingType}
        hideSelectModal={hideSelectModal}
        onPressConfirm={onPressConfirm}
        renderListValues={renderListValues}
      />
      <ScrollView>
        <ProfilePicker
          profileName={character.profile.name}
          isActiveSelect={isSelectingType === SelectOptions.PROFILE}
          showSelectModal={showSelectModal}
          selectType={SelectOptions.PROFILE}
        />
        <Equipment
          data={character.profile.equipment}
          isSelectingType={isSelectingType}
          showSelectModal={showSelectModal}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
