import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import InventoryIcon from "../../components/InventoryIcon";
import NumberInput from "../../components/NumberInput";
import { IconButton, Text, TextInput, View } from "../../components/Themed";
import { useThemeColor } from "../../components/themed/useThemeColor";
import {
  InventoryEntry,
  deleteInventoryEntry,
  replaceInventoryEntry,
} from "../../util/redux/InventorySlice";
import { RootState } from "../../util/redux/store";

const stickyIndex = [0];

export default function Inventory() {
  const dispatch = useDispatch();
  const backgroundColor = useThemeColor({}, `background`);
  const [edit, setEdit] = useState<number | null>(null);
  const [amount, setAmount] = useState(0);
  const inventory = useSelector((state: RootState) => state.inventory.inventory);
  const [filterableInventory, setFilterableInventory] = useState(inventory);
  const renderItem: ListRenderItem<InventoryEntry> = ({ item, index }) => {
    const setupEdit = () => {
      setEdit(index);
      setAmount(item.amount);
    };
    const save = () => {
      if (amount === 0) {
        dispatch(deleteInventoryEntry(item.name));
      } else if (amount !== item.amount) {
        dispatch(replaceInventoryEntry({ ...item, amount }));
      }
      setEdit(null);
    };
    return (
      <View style={{ padding: 16, alignItems: `center` }}>
        <View style={{ flexDirection: `row` }}>
          <InventoryIcon type={item.type} name={item.name} />
          <View style={{ flex: 1 }}>
            <Text variant="caption">{item.name}</Text>
            <Text variant="body">x {item.amount}</Text>
          </View>
          {edit === index ? (
            <IconButton icon="save" variant="clear" onPress={save} />
          ) : (
            <IconButton icon="edit" variant="clear" onPress={setupEdit} />
          )}
        </View>
        {edit === index ? (
          <NumberInput setValue={setAmount}>
            <Text variant="body" style={styles.counter}>
              {amount}
            </Text>
          </NumberInput>
        ) : null}
      </View>
    );
  };
  const keyExtractor = (i: InventoryEntry) => i.name;

  const filterBy = (text: string) => {
    const newData = inventory.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()));
    setFilterableInventory(newData);
  };
  useEffect(() => {
    // update filterableInventory when inventory changes
    setFilterableInventory(inventory);
  }, [inventory]);
  return (
    <FlatList<InventoryEntry>
      data={filterableInventory}
      ListHeaderComponent={
        <TextInput
          style={{ padding: 16, margin: 16 }}
          onChangeText={filterBy}
          placeholder="Filter by..."
        />
      }
      stickyHeaderIndices={stickyIndex}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={[styles.container, { backgroundColor }]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  counter: {
    flex: 1,
    textAlign: `center`,
  },
});
