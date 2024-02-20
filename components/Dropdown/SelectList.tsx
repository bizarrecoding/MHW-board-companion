import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import type { Dispatch } from "react";
import { StyleSheet, Pressable, StyleProp, TextStyle, ListRenderItem } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { ArrowOptions, updateScrollArrows } from "./helpers";
import { View, Text } from "../Themed";

const ITEM_HEIGHT = 72;

export type ItemData = { label: string; value: string };

type ItemProps = {
  item: ItemData;
  onPressItem?: () => void;
  backgroundColor: StyleProp<TextStyle>;
  textColor: StyleProp<TextStyle>;
};
const Item = ({ item, backgroundColor, textColor, onPressItem }: ItemProps) => {
  return (
    <View style={styles.item}>
      <Pressable onPress={onPressItem} style={[styles.option, backgroundColor]}>
        <Text style={[styles.optionText, textColor]}>{item.label}</Text>
      </Pressable>
    </View>
  );
};

export type SelectedItemReturnType = (ItemData & { indexArray: number }) | null;

type SelectListArgs = {
  options?: ItemData[];
  selectedValue?: string;
  onPressItem?: () => void;
  setSelectedItem: Dispatch<SelectedItemReturnType>;
};

export const SelectList = ({
  options = [],
  selectedValue,
  onPressItem,
  setSelectedItem,
}: SelectListArgs) => {
  const [scrollArrows, setScrollArrows] = React.useState<ArrowOptions>(ArrowOptions.BOTH);
  const displayArrowDown = [ArrowOptions.DOWN, ArrowOptions.BOTH].includes(scrollArrows);
  const displayArrowUp = [ArrowOptions.UP, ArrowOptions.BOTH].includes(scrollArrows);

  const selectedIndex =
    selectedValue && options.length > 0
      ? options.findIndex((option) => option.value === selectedValue)
      : undefined;

  const renderItem: ListRenderItem<ItemData> = React.useCallback(
    ({ item }) => {
      const backgroundColor: any = item.value === selectedValue ? `#6e3b6e` : `#f9c2ff`;
      const color: any = item.value === selectedValue ? `white` : `black`;
      return (
        <Item
          item={item}
          onPressItem={onPressItem}
          backgroundColor={backgroundColor}
          textColor={color}
        />
      );
    },
    [selectedValue, onPressItem]
  );

  return (
    <>
      <FlatList<ItemData>
        data={options}
        renderItem={renderItem}
        style={styles.optionList}
        snapToOffsets={options.map((_value, index) => index * ITEM_HEIGHT)}
        onMomentumScrollEnd={(event) => {
          const scrollEndPosY = event.nativeEvent.contentOffset.y;
          const snapIndex = Math.round(scrollEndPosY / ITEM_HEIGHT);
          if (options[snapIndex].value !== selectedValue) {
            setSelectedItem({ ...options[snapIndex], indexArray: snapIndex });
          }
          updateScrollArrows({
            itemIndex: snapIndex,
            listLength: options.length,
            setScrollArrows,
            scrollArrows,
          });
        }}
        keyExtractor={(item) => item.value}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        initialScrollIndex={selectedIndex}
      />
      <View style={styles.arrows}>
        {displayArrowUp && <FontAwesome name="arrow-up" size={18} color="#25292e" />}
        {displayArrowDown && <FontAwesome name="arrow-down" size={18} color="#25292e" />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  arrows: {
    position: `absolute`,
    right: `3%`,
    backgroundColor: `#eee`,
    height: `50%`,
    justifyContent: `space-between`,
  },
  optionList: {
    overflow: `scroll`,
    width: `80%`,
    // borderWidth: 1,
    marginHorizontal: `10%`,
    backgroundColor: `#eee`,
  },
  item: {
    padding: 12,
    borderWidth: 1,
    marginVertical: 1,
  },
  option: {
    backgroundColor: `#3333`,
    // Item Height - (Item Vertical Styling Sum) *2
    height: ITEM_HEIGHT - (12 + 1 + 1) * 2,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  optionText: {
    textAlignVertical: `center`,
    fontSize: 20,
    width: `100%`,
    height: `100%`,
    padding: 2,
    textAlign: `center`,
    color: `black`,
    fontWeight: `500`,
  },
});
