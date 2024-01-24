import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { DropdownInput } from './DropdownInput';
import { DropdownModal } from './DropdownModal';
import { SelectList } from './SelectList';
import { View } from '../Themed';

type ItemData = { label: string; value: string };

interface DropdownArgs {
  title?: string;
  options?: ItemData[];
  onPressConfirm?: (item: ItemData) => void;
  onPressCancel?: (item: ItemData) => void;
}

export const Dropdown = ({
  title,
  options,
  // onPressConfirm,
  // onPressCancel,
}: DropdownArgs) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <View style={styles.viewInvoker}>
      <DropdownModal
        title={title}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onPressConfirm={undefined}
        onPressCancel={undefined}
      >
        <SelectList
          options={options}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </DropdownModal>
      <DropdownInput
        value={selectedItem?.label}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
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
