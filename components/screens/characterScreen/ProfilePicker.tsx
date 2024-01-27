import React from "react";
import { StyleSheet } from "react-native";

// import { HunterProfile } from "./character";
import type { ProfilePickerArgs } from "./ICharacter";
import { SelectButton } from "../../Dropdown";
import { View, Text } from "../../Themed";

export default function ProfilePicker({
  profileName,
  isActiveSelect,
  showSelectModal,
}: ProfilePickerArgs) {
  return (
    <View style={styles.container}>
      <View>
        <Text>Hunter Name</Text>
        <View style={styles.loader}>
          <SelectButton
            modalVisible={isActiveSelect}
            selectedLabel={profileName}
            showSelectModal={showSelectModal}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: `90%`,
  },
  loader: {
    flexDirection: `row`,
    justifyContent: `space-between`,
  },
  input: {
    backgroundColor: `#eee`,
    padding: 5,
    width: `70%`,
  },
});
