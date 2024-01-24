import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState, Dispatch } from 'react';
import { StyleSheet, Pressable, StyleProp, TextStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { View, Text } from '../Themed';

const ITEM_HEIGHT = 72;

type ItemData = { label: string; value: string };

type SelectListArgs = {
  options?: ItemData[];
  selectedItem: any;
  setSelectedItem: Dispatch<any>;
};

interface RenderItemArgs {
  item: ItemData;
  selectedItem: any;
  setSelectedItem: Dispatch<any>;
}

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

const renderItem = ({
  item,
  selectedItem,
  setSelectedItem,
}: RenderItemArgs) => {
  const backgroundColor: any =
    item.value === selectedItem ? `#6e3b6e` : `#f9c2ff`;
  const color: any = item.value === selectedItem ? `white` : `black`;

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

export const SelectList = ({
  options = [],
  selectedItem,
  setSelectedItem,
}: SelectListArgs) => {
  const [isArrowUpVisible, setIsArrowUpVisible] = useState(false);
  const [isArrowDownVisible, setIsArrowDownVisible] = useState(true);

  return (
    <>
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
          if (snapIndex === 0) setIsArrowDownVisible(true);
          if (snapIndex >= options.length) setIsArrowUpVisible(true);
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
    width: `80%`,
    height: `100%`,
    padding: 2,
    marginHorizontal: `10%`,
    textAlign: `center`,
    color: `black`,
    fontWeight: `500`,
  },
});
