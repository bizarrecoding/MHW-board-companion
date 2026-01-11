import { useState } from "react";

import { CharacterModalSelectOptions as SelectOptions } from "./ICharacter";
import { SelectModal, SelectList } from "../../Dropdown";
import type { ItemData, SelectedItemReturnType } from "../../Dropdown";

type ModalCharacterArgs = {
  isSelectingType: string;
  hideSelectModal: () => void;
  onPressConfirm: (item: SelectedItemReturnType) => void;
  renderListValues: {
    listOptions?: ItemData[];
    value?: string;
  } | null;
};

const ModalCharacter = ({
  isSelectingType,
  hideSelectModal,
  onPressConfirm,
  renderListValues,
}: ModalCharacterArgs) => {
  const [isFocusedItem, setIsFocusedItem] = useState<SelectedItemReturnType>(null);

  const handleConfirm = () => {
    onPressConfirm(isFocusedItem);
  };

  const onPressItem = (index: number) => {
    if (renderListValues?.listOptions) setIsFocusedItem({
      ...renderListValues.listOptions[index],
      indexArray: index
    });
  };

  return (
    <SelectModal
      title="Select Profile"
      modalVisible={isSelectingType !== SelectOptions.NONE}
      setModalVisible={hideSelectModal}
      onPressConfirm={handleConfirm}
    >
      {!renderListValues ? null : (
        <SelectList
          options={renderListValues?.listOptions}
          selectedValue={renderListValues?.value}
          setSelectedItem={setIsFocusedItem}
          onPressItem={onPressItem}
        />
      )}
    </SelectModal>
  );
};

export default ModalCharacter;
