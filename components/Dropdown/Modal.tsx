import React from "react";
import { StyleSheet } from "react-native";

import Button from "../Button";
import { View } from "../Themed";

/**
 * TODO: convert into General-use Modal, or delete
 */
interface ModalArgs {
  title?: string;
  onPressCancel?: ({ ...args }: any) => void;
  onPressConfirm?: ({ ...args }: any) => void;
  children?: any;
}
const Modal = ({ title, onPressCancel, onPressConfirm, children }: ModalArgs) => {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>{title}</View>
        <View style={styles.content}>{children}</View>
        <View style={styles.footer}>
          <View style={styles.controls}>
            <Button
              label="Cancel"
              onPress={
                onPressCancel ??
                (() => {
                  console.log(`Cancel`);
                })
              }
            />
            <Button
              label="Confirm"
              onPress={
                onPressConfirm ??
                (() => {
                  console.log(`Confirm`);
                })
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  background: {
    position: `absolute`,
    top: 0,
    left: 0,
    width: `100%`,
    height: `100%`,
    opacity: 1,
    backgroundColor: `black`,
  },
  container: {
    width: 120,
    height: 300,
    backgroundColor: `#eee`,
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
    position: `relative`,
  },
  header: {
    color: `#333`,
    position: `absolute`,
    top: 0,
    left: 10,
  },
  content: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
  },
  footer: {
    position: `absolute`,
    bottom: 0,
    right: 0,
  },
  controls: {
    flexDirection: `row`,
  },
});
