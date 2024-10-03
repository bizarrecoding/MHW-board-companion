import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useRef } from "react";
import type { Dispatch } from "react";
import { FlatList, StyleSheet, ListRenderItem, TouchableOpacity } from "react-native";

import { ArrowOptions, updateScrollArrows } from "./helpers";
import { View, Text } from "../Themed";
import { useThemeColor } from "../themed/useThemeColor";

const ITEM_HEIGHT = 64;

export type ItemData = { label: string; value: string };

export type SelectedItemReturnType = (ItemData & { indexArray: number }) | null;

type ItemProps = {
  item: ItemData;
  onPressItem?: () => void;
  selected?: boolean;
};
const Item = ({ item, onPressItem }: ItemProps) => {
  const textColor = useThemeColor(undefined, `text`);

  return (
    <TouchableOpacity onPress={onPressItem} style={styles.option}>
      <Text variant="button" bold style={[styles.optionText, { color: textColor }]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

type SelectListArgs = {
  options?: ItemData[];
  selectedValue?: string;
  onPressItem?: (n: number) => void;
  setSelectedItem: Dispatch<SelectedItemReturnType>;
};

export const SelectList = ({
  options = [],
  selectedValue,
  onPressItem,
  setSelectedItem,
}: SelectListArgs) => {
  const listRef = useRef<FlatList>(null);
  const accentColor = useThemeColor(undefined, `accent`);
  const [scrollArrows, setScrollArrows] = React.useState<ArrowOptions>(ArrowOptions.BOTH);
  const displayArrowDown = [ArrowOptions.DOWN, ArrowOptions.BOTH].includes(scrollArrows);
  const displayArrowUp = [ArrowOptions.UP, ArrowOptions.BOTH].includes(scrollArrows);

  const selectedIndex =
    selectedValue && options.length > 0
      ? options.findIndex((option) => option.value === selectedValue)
      : undefined;

  const renderItem: ListRenderItem<ItemData> = React.useCallback(
    ({ item, index }) => {
      const _onPress = () => {
        onPressItem?.(index);
        // listRef.current?.scrollToIndex({
        //   animated: true,
        //   index,
        // });
        listRef.current?.scrollToOffset({
          animated: true,
          offset: ITEM_HEIGHT * index,
        });
      };
      return <Item item={item} onPressItem={_onPress} selected={item.value === selectedValue} />;
    },
    [selectedValue, onPressItem]
  );

  return (
    <>
      <FlatList<ItemData>
        ref={listRef}
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
        {displayArrowUp && <FontAwesome name="arrow-up" size={18} color={accentColor} />}
        {displayArrowDown && <FontAwesome name="arrow-down" size={18} color={accentColor} />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  arrows: {
    position: `absolute`,
    right: `3%`,
    height: `50%`,
    justifyContent: `space-between`,
    backgroundColor: `transparent`,
  },
  optionList: {
    width: `80%`,
  },
  option: {
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: `#8888`,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    height: ITEM_HEIGHT,
  },
  optionText: {
    padding: 2,
    fontWeight: `500`,
  },
});
