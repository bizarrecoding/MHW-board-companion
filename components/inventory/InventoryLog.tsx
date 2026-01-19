import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, TouchableOpacity, View } from "react-native";

import { InventoryEntry, useInventory } from "../../hooks/useInventory";
import InventoryIcon from "../InventoryIcon";
import NumberInput from "../themed/inputs/NumberInput";
import { IconButton, Text, TextInput } from "../Themed";
import { useThemeColor } from "../themed/useThemeColor";
import { FontAwesome } from "@expo/vector-icons";
import SearchInput from "../themed/inputs/SearchInput";

const stickyIndex = [0];

export default function InventoryLog() {
  const { inventory, updateEntry, deleteEntry } = useInventory();
  const backgroundColor = useThemeColor({}, `background`);
  const [edit, setEdit] = useState<number | null>(null);
  const [amount, setAmount] = useState(0);

  const [filterableInventory, setFilterableInventory] = useState(inventory);
  const renderItem: ListRenderItem<InventoryEntry> = ({ item, index }) => {
    const setupEdit = () => {
      setEdit(index);
      setAmount(item.amount);
    };
    const save = () => {
      if (amount === 0) {
        deleteEntry(item.id);
      } else if (amount !== item.amount) {
        updateEntry(item.id, amount);
      } 
      setEdit(null);
    };
    return (
      <View style={styles.itemWrapper}>
        <TouchableOpacity style={styles.row} onPress={setupEdit}> 
          <InventoryIcon type={item.type} name={item.name} style={styles.icon} />
          <View style={{ flex: 1 }}>
            <Text variant="caption" style={styles.itemLabel}>{item.name}</Text>
            <Text style={styles.itemAmount}>x {item.amount}</Text>
          </View>
          {edit === index ? <IconButton icon="check" variant="clear" onPress={save} /> : null}
        </TouchableOpacity>
        {edit === index ? (
          <View key="edit" style={[styles.row, { marginVertical: 12, justifyContent: "space-around" }]}>
            <NumberInput setValue={setAmount} value={amount} style={styles.countEditor} />
          </View>
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
        <SearchInput onChangeText={filterBy} />
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
  itemWrapper: {
    padding: 12,
    backgroundColor: `#8883`,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  row: {
    flexDirection: `row`,
    alignItems: `center`,
  },
  itemLabel: {
    fontWeight: 600,
  },
  itemAmount: {
    fontSize: 16,
    opacity: 0.75
  },
  countEditor: {
    flex: 4,
  },
  icon: {
    marginRight: 12,
  },
});
