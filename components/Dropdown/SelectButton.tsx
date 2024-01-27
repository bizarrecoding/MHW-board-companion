import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Pressable } from "react-native";

import { Text, View } from "../Themed";

interface SelectButtonArgs {
  modalVisible: boolean;
  showSelectModal: () => void;
  selectedLabel?: string;
  placeholder?: string;
}

export const SelectButton = ({
  modalVisible,
  showSelectModal,
  selectedLabel,
  placeholder = ``,
}: SelectButtonArgs) => {
  const iconName = modalVisible ? `caret-up` : `caret-down`;
  const iconColor = `#333`;

  return (
    <Pressable onPress={showSelectModal}>
      <View style={styles.button}>
        <View style={styles.buttonOpen}>
          <Text style={styles.textStyle}>{selectedLabel ?? placeholder}</Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome name={iconName} size={18} color={iconColor} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    // borderRadius: 20,
    // elevation: 1,
    flexDirection: `row`,
    justifyContent: `space-between`,
    width: `70%`,
  },
  buttonOpen: {
    // backgroundColor: `#F194FF`,
    backgroundColor: `#eee`,
    padding: 10,
    width: `100%`,
  },
  iconContainer: {
    // width: `5%`,
    backgroundColor: `#add8e6`,
    padding: 10,
    // elevation: 2,
  },
  textStyle: {
    color: `black`,
    fontWeight: `bold`,
    textAlign: `center`,
  },
});
