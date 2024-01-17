import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Pressable } from "react-native";

import { View, Text } from "./Themed";
import Button from "./Button";

import { FlatList } from "react-native-gesture-handler";
import TouchableOpacity from "react-native-gesture-handler";
import { StyleProp, TextStyle } from "react-native";

type ItemData = { label: string; value: string };
type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};
const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => {
  return (
    <View>
      <Pressable onPress={onPress} style={[styles.option, backgroundColor]}>
        <Text style={[styles.optionText, textColor as StyleProp<TextStyle>]}>
          {item.label}
        </Text>
      </Pressable>
    </View>
  );
};

interface DropdownArgs {
  title?: string;
  onPressCancel?: ({ ...args }: any) => void;
  onPressConfirm?: ({ ...args }: any) => void;
  options?: ItemData[];
  onChange?: (item: ItemData) => void;
}

export const Dropdown = ({
  title,
  onPressCancel,
  onPressConfirm,
  options,
  onChange,
}: DropdownArgs) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  // console.log("🚀 ~ selectedItem:", selectedItem);
  useEffect(
    function onValueChange() {
      console.log("🚀 ~ onValueChange ~ onValueChange:");
      if (onChange) onChange(selectedItem);
    },
    [selectedItem]
  );

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.value === selectedItem ? "#6e3b6e" : "#f9c2ff";
    const color = item.value === selectedItem ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedItem(item);
          setModalVisible(false);
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <View style={styles.viewInvoker}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>{title}</Text>
          </View>
          <View style={styles.content}>
            <FlatList
              data={options}
              renderItem={renderItem}
              // keyExtractor={}
              // extraData={}
            />
          </View>
          <View style={styles.footer}>
            <View style={styles.controls}>
              <Button
                label="Cancel"
                onPress={
                  onPressCancel ??
                  (() => {
                    console.log("Cancel");
                    setModalVisible(false);
                  })
                }
              />
              <Button
                label="Confirm"
                onPress={
                  onPressConfirm ??
                  (() => {
                    console.log("Confirm");
                    setModalVisible(false);
                  })
                }
              />
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>
          {selectedItem?.label ?? "Show Modal"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  viewInvoker: {
    marginTop: 22,
  },
  modalView: {
    flexDirection: "column",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",

    marginHorizontal: 15,
    // height: 200,
    backgroundColor: "#eee",
    borderRadius: 0,
    // paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    // color: "#333",
    paddingVertical: 5,
    width: "100%",
  },
  modalTitle: {
    marginLeft: 10,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
    paddingVertical: 10,
  },
  footer: {
    marginBottom: 10,
  },
  controls: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  option: {
    paddingVertical: 5,
    backgroundColor: "#3333",
    borderWidth: 1,
    boxShadow: 1,
    shadowColor: "#000",
    width: "90%",
  },
  optionText: {
    padding: 2,
    marginHorizontal: 5,
    backgroundColor: "white",
    textAlign: "center",
    color: "black",
    fontWeight: "500",
    fontSize: 16,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
