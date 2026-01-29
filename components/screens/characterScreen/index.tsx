import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useResponsiveWidth } from "../../../hooks/useResponsiveWidth";
import { View } from "../../Themed";
import { commonStyles } from "../../themed/styles";
import Equipment from "./Equipment";
import { CharacterModalSelectOptions as SelectOptions } from "./ICharacter";
import ModalCharacter from "./ModalCharacter";
import ProfilePicker from "./ProfilePicker";
import { useManageCharacter } from "./helpers/useManageCharacter";

export default function CharacterScreen() {
  const width = useResponsiveWidth().width;
  const {
    character,
    isSelectingType,
    showSelectModal,
    hideSelectModal,
    onPressConfirm,
    renderListValues,
  } = useManageCharacter();

  return (
    <View style={[styles.container, { width }]}>
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
    ...commonStyles.webCenter,
  },
});
