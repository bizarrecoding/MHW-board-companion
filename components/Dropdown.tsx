import React, { useState, useEffect, Dispatch } from "react";
import { Alert, Modal, StyleSheet, Pressable } from "react-native";

import { View, Text } from "./Themed";
import Button from "./Button";

import { FlatList } from "react-native-gesture-handler";
import { StyleProp, TextStyle, ScrollView } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ITEM_HEIGHT = 72;

type ItemData = { label: string; value: string };

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: StyleProp<TextStyle>;
  textColor: StyleProp<TextStyle>;
};
const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => {
  return (
    <View style={styles.item}>
      <Pressable onPress={onPress} style={[styles.option, backgroundColor]}>
        <Text style={[styles.optionText, textColor]}>{item.label}</Text>
      </Pressable>
    </View>
  );
};

interface RenderItemArgs {
  item: ItemData;
  selectedItem: any;
  setSelectedItem: Dispatch<any>;
}

const renderItem = ({
  item,
  selectedItem,
  setSelectedItem,
}: RenderItemArgs) => {
  const backgroundColor: any =
    item.value === selectedItem ? "#6e3b6e" : "#f9c2ff";
  const color: any = item.value === selectedItem ? "white" : "black";

  return (
    <Item
      item={item}
      onPress={() => {
        setSelectedItem(item);
      }}
      backgroundColor={backgroundColor}
      textColor={color}
    />
  );
};

interface DropdownArgs {
  title?: string;
  options?: ItemData[];
  onChange?: (item: ItemData) => void;
}

interface ModalViewContainerArgs extends DropdownArgs {
  selectedItem: any;
  setSelectedItem: Dispatch<any>;
  setModalVisible: Dispatch<boolean>;
}

type ListContainerArgs = {
  options?: ItemData[];
  selectedItem: any;
  setSelectedItem: Dispatch<any>;
};

const ListContainer = ({
  options = [],
  selectedItem,
  setSelectedItem,
}: ListContainerArgs) => {
  const [isArrowUpVisible, setIsArrowUpVisible] = useState(false);
  const [isArrowDownVisible, setIsArrowDownVisible] = useState(true);

  return (
    <View style={styles.body}>
      <FlatList
        data={options}
        renderItem={(itemData) =>
          renderItem({
            item: itemData.item,
            selectedItem,
            setSelectedItem,
          })
        }
        style={styles.optionList}
        snapToOffsets={options?.map((_value, index) => index * ITEM_HEIGHT)}
        onMomentumScrollEnd={(event) => {
          const scrollEndPosY = event.nativeEvent.contentOffset.y;
          const snapIndex = Math.round(scrollEndPosY / ITEM_HEIGHT);
          setSelectedItem(options[snapIndex]);
        }}
        keyExtractor={(item) => item.value}
      />
      <View style={styles.arrows}>
        {isArrowUpVisible && (
          <FontAwesome name="arrow-up" size={18} color="#25292e" />
        )}
        {isArrowDownVisible && (
          <FontAwesome name="arrow-down" size={18} color="#25292e" />
        )}
      </View>
    </View>
  );
};

const ModalViewContainer = ({
  title,
  options,
  selectedItem,
  setSelectedItem,
  setModalVisible,
  onChange,
}: ModalViewContainerArgs) => {
  console.log("🚀 ~ ModalViewContainerArgs:");
  return (
    <View style={styles.modalView}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.modalTitle}>{title}</Text>
        </View>
        <ListContainer
          options={options}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        <View style={styles.footer}>
          <View style={styles.controls}>
            <Button
              label="Cancel"
              onPress={() => {
                console.log("Cancel");
                setModalVisible(false);
              }}
            />
            <Button
              label="Confirm"
              onPress={() => {
                console.log("Confirm");
                setModalVisible(false);
                if (onChange) onChange(selectedItem);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export const Dropdown = ({ title, options, onChange }: DropdownArgs) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <View style={styles.viewInvoker}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ModalViewContainer
          title={title}
          options={options}
          onChange={onChange}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setModalVisible={setModalVisible}
        />
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
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5);",
  },
  modalContent: {
    backgroundColor: "#eee",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    borderRadius: 15,
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
    marginVertical: 5,
    width: "90%",
    backgroundColor: "#eee",
  },
  modalTitle: {},
  body: {
    position: "relative",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
    paddingVertical: 10,
    height: 100,
  },
  arrows: {
    position: "absolute",
    right: "3%",
    backgroundColor: "#eee",
    height: "50%",
    justifyContent: "space-between",
  },
  optionList: {
    overflow: "scroll",
    width: "80%",
    borderWidth: 2,
    marginHorizontal: "10%",
    // paddingHorizontal: "10%",
    backgroundColor: "#eee",
  },
  item: {
    padding: 12,
  },
  option: {
    backgroundColor: "#3333",
    height: ITEM_HEIGHT - 12 * 2,
    // paddingVertical: 5,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  optionText: {
    textAlignVertical: "center",
    fontSize: 20,
    width: "80%",
    height: "100%",
    padding: 2,
    marginHorizontal: "10%",
    textAlign: "center",
    color: "black",
    fontWeight: "500",
  },
  separator: {
    padding: 1,
  },
  footer: {
    marginBottom: 10,
    width: "100%",
  },
  controls: {
    backgroundColor: "#eee",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
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
});
