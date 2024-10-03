import React from "react";

import type { ICharacterArgs } from "./ICharacter";
import { SelectButton } from "../../Dropdown";
import { Text } from "../../Themed";

export default function ProfilePicker({
  profileName,
  isActiveSelect,
  showSelectModal,
  selectType,
}: ICharacterArgs.IProfilePicker) {
  const onSelectModal = () => {
    showSelectModal(selectType);
  };

  return (
    <>
      <Text variant="title" style={{ marginBottom: 12 }}>
        Hunter Name
      </Text>
      <SelectButton
        modalVisible={isActiveSelect}
        selectedLabel={profileName}
        showSelectModal={onSelectModal}
      />
    </>
  );
}
