import React, { Dispatch } from 'react';
import { Modal, StyleSheet } from 'react-native';

import Button from '../Button';
import { View, Text } from '../Themed';

interface DropdownModalArgs {
  title?: string;
  onPressConfirm?: () => void;
  onPressCancel?: () => void;
  modalVisible: boolean;
  setModalVisible: Dispatch<boolean>;
  children: any;
}
/**
 * Modal to be used in conjunction with the Dropdown component
 */

export const DropdownModal = ({
  title,
  modalVisible,
  setModalVisible,
  onPressConfirm,
  onPressCancel,
  children,
}: DropdownModalArgs) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalView}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>{title}</Text>
          </View>
          <View style={styles.body}>{children}</View>
          <View style={styles.footer}>
            <View style={styles.controls}>
              <Button
                label="Cancel"
                onPress={() => {
                  console.log(`Cancel`);
                  setModalVisible(false);
                  if (onPressCancel) onPressCancel();
                }}
              />
              <Button
                label="Confirm"
                onPress={() => {
                  console.log(`Confirm`);
                  setModalVisible(false);
                  if (onPressConfirm) onPressConfirm();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: `center`,
    backgroundColor: `rgba(0,0,0,0.5);`,
  },
  modalContent: {
    backgroundColor: `#eee`,
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`,
    marginHorizontal: 15,
    borderRadius: 15,
    shadowColor: `#000`,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    marginVertical: 5,
    width: `90%`,
    backgroundColor: `#eee`,
  },
  modalTitle: {},
  body: {
    position: `relative`,
    backgroundColor: `#eee`,
    justifyContent: `center`,
    alignItems: `center`,
    width: `100%`,
    marginVertical: 20,
    paddingVertical: 10,
    height: 100,
  },
  footer: {
    marginBottom: 10,
    width: `100%`,
  },
  controls: {
    backgroundColor: `#eee`,
    width: `100%`,
    flexDirection: `row`,
    justifyContent: `space-around`,
  },
});
