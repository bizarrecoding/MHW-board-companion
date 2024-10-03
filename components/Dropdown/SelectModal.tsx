import React, { Dispatch } from "react";
import { Modal, StyleSheet } from "react-native";

import { View, Text, Button } from "../Themed";
import { useThemeColor } from "../themed/useThemeColor";

interface SelectModalArgs {
  title?: string;
  onPressConfirm?: () => void;
  onPressCancel?: () => void;
  modalVisible: boolean;
  setModalVisible: Dispatch<boolean>;
  children: any;
}
/**
 * Modal to be used in conjunction with the Select component
 */

export const SelectModal = ({
  title,
  modalVisible,
  setModalVisible,
  onPressConfirm,
  onPressCancel,
  children,
}: SelectModalArgs) => {
  const backgroundColor = useThemeColor(undefined, `card`);
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalView}>
        <View style={[styles.modalContent, { backgroundColor }]}>
          <Text variant="subtitle">{title}</Text>
          <View style={[styles.body, { backgroundColor }]}>{children}</View>
          <View style={[styles.footer, { backgroundColor }]}>
            <Button
              title="Cancel"
              style={styles.controls}
              onPress={() => {
                console.log(`Cancel`);
                setModalVisible(false);
                if (onPressCancel) onPressCancel();
              }}
            />
            <Button
              title="Confirm"
              style={styles.controls}
              onPress={() => {
                console.log(`Confirm`);
                setModalVisible(false);
                if (onPressConfirm) onPressConfirm();
              }}
            />
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
    justifyContent: `center`,
    alignItems: `center`,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: `#000`,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  body: {
    position: `relative`,
    justifyContent: `center`,
    alignItems: `center`,
    width: `100%`,
    marginVertical: 20,
    paddingVertical: 10,
    height: 100,
  },
  footer: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    width: `100%`,
  },
  controls: {
    flex: 1,
  },
});
