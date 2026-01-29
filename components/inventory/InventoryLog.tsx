import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, Platform, StyleSheet, TouchableOpacity, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { InventoryEntry, useInventory } from "../../hooks/useInventory";
import { useResponsiveWidth } from "../../hooks/useResponsiveWidth";
import InventoryIcon from "../InventoryIcon";
import { IconButton, Text } from "../Themed";
import NumberInput from "../themed/inputs/NumberInput";
import SearchInput from "../themed/inputs/SearchInput";
import { commonStyles } from "../themed/styles";

const stickyIndex = [0];

export default function InventoryLog() {
  const paddingBottom = useSafeAreaInsets().bottom;
  const { inventory, updateEntry, deleteEntry } = useInventory();
  const [edit, setEdit] = useState<number | null>(null);
  const [amount, setAmount] = useState(0);
  const { width, numColumns } = useResponsiveWidth();

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
          <Text variant="caption" style={styles.itemLabel}>{item.name}</Text>
          {edit === index ? (
            <IconButton icon="check" variant="clear" onPress={save} />
          ) : (
            <Text style={styles.itemAmount}> x {item.amount}</Text>
          )}
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
    <View style={[styles.container, { width, paddingBottom }]}>
      <FlatList<InventoryEntry>
        data={filterableInventory}
        ListHeaderComponent={
          <SearchInput onChangeText={filterBy} />
        }
        // key is needed to force re-render when window size changes
        key={`inventory:${numColumns}`}
        numColumns={numColumns}
        stickyHeaderIndices={stickyIndex}
        renderItem={renderItem}
        keyExtractor={keyExtractor} 
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "auto"
  },
  list: {
    paddingBottom: 96,
  },
  itemWrapper: {
    //ensure items stretch to full width on web
    flex: Platform.OS === "web" ? 1 : undefined,
    ...commonStyles.card,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  row: commonStyles.row,
  itemLabel: {
    flex: 1,
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
