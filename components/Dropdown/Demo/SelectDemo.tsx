import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../Themed';
import { SelectButton } from '../SelectButton';
import { SelectList } from '../SelectList';
import type { SelectedItemReturnType } from '../SelectList';
import { SelectModal } from '../SelectModal';

type ItemData = { label: string; value: string };

interface DropdownArgs {
  title?: string;
  options?: ItemData[];
  onPressConfirm?: (item: ItemData) => void;
  onPressCancel?: (item: ItemData) => void;
}

export const SelectDemo = ({
  title,
  options,
  // onPressConfirm,
  // onPressCancel,
}: DropdownArgs) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItemReturnType>({
    label: ``,
    value: ``,
    indexArray: -1,
  });

  const showSelectModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.viewInvoker}>
      <SelectModal
        title={title}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onPressConfirm={undefined}
        onPressCancel={undefined}
      >
        <SelectList
          options={options}
          selectedValue={selectedItem?.value}
          setSelectedItem={setSelectedItem}
        />
      </SelectModal>
      <SelectButton
        selectedLabel={selectedItem?.label}
        modalVisible={modalVisible}
        showSelectModal={showSelectModal}
        placeholder={undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewInvoker: {
    marginTop: 22,
  },
});
