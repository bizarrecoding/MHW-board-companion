import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { ListRenderItem, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { ItemList } from "../../assets/data/items";
import { ItemEntry } from "../../assets/data/types";
import { useInventory } from "../../hooks/useInventory";
import Divider from "../Divider";
import InventoryIcon from "../InventoryIcon";
import { Text, View, TextInput, IconButton, Button } from "../Themed";

// default non-filtered data
const sortedData = ItemList.sort((a, b) => a.type.localeCompare(b.type));
const stickyIndex = [0];

const within = (value: number, min: number = 0, max: number = 0) => {
  if (min > value) return min;
  if (max < value) return max;
  else return value;
};

export const InventoryEntryModal = () => {
  const { addEntry } = useInventory();
  const [data, setData] = useState(sortedData);
  const [toAdd, setToAdd] = useState<ItemEntry[]>([] as ItemEntry[]);

  const toggleInventoryEntry = useCallback((item: ItemEntry, add?: boolean) => {
    // add/remove from toAdd
    setToAdd((prev) => {
      if (add) return [...prev, item];
      const index = prev.findIndex((i) => i.name === item.name);
      return prev.slice(0, index).concat(prev.slice(index + 1));
    });
    //remove/add from data, inverse of toAdd
    setData((prev) => {
      if (!add) return [...prev, item];
      const index = prev.findIndex((i) => i.name === item.name);
      return prev.slice(0, index).concat(prev.slice(index + 1));
    });
  }, []);

  const renderAddedItem: ListRenderItem<ItemEntry> = useCallback(
    ({ item }) => {
      return <InventoryItem item={item} onPress={toggleInventoryEntry} />;
    },
    [toggleInventoryEntry]
  );

  const renderItem: ListRenderItem<ItemEntry> = useCallback(
    ({ item }) => {
      return <InventoryItem add item={item} onPress={toggleInventoryEntry} />;
    },
    [toggleInventoryEntry]
  );

  const keyExtractor = (i: ItemEntry) => i.name;

  const filterBy = (text: string) => {
    const newData = sortedData.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()));
    setData(newData);
  };

  const commitInventory = () => {
    toAdd.forEach((item) => {
      addEntry({ name: item.name, type: item.type, amount: 1 });
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text variant="subtitle" style={styles.title}>
        {toAdd.length ? `Selected ${toAdd.length} item(s)` : `Select an item to add`}
      </Text>
      <Divider variant="title" separation={16} />
      <View style={{ flex: 1, width: `100%`, paddingHorizontal: 16 }}>
        <FlatList<ItemEntry>
          data={toAdd}
          renderItem={renderAddedItem}
          keyExtractor={keyExtractor}
          style={{ maxHeight: within(toAdd.length * 72, 0, 200) }}
        />
        <FlatList<ItemEntry>
          ListHeaderComponent={
            <TextInput contentContainerStyle={{ padding: 16 }} onChangeText={filterBy} placeholder="Filter by..." />
          }
          stickyHeaderIndices={stickyIndex}
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={{ flex: 1 }}
          ListFooterComponent={<View style={{ height: 36 }} />}
        />
      </View>
      <Button
        title="Add to inventory"
        disabled={!toAdd.length}
        onPress={commitInventory}
        style={styles.btnCommit}
      />
    </View>
  );
};

type InventoryItemProps = {
  item: ItemEntry;
  onPress: (item: ItemEntry, add?: boolean) => void;
  add?: boolean;
};

const InventoryItem: React.FC<InventoryItemProps> = ({ item, onPress, add }) => {
  const _onPress = () => onPress(item, add);
  return (
    <View style={{ flexDirection: `row`, padding: 16, alignItems: `center` }}>
      <InventoryIcon type={item.type} name={item.name} />
      <Text variant="caption" style={{ flex: 1 }}>
        {item.name}
      </Text>
      <IconButton icon={add ? `plus` : `minus`} variant="clear" onPress={_onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
  },
  title: {
    marginTop: 12,
  },
  btnCommit: {
    margin: 16,
    width: `92%`,
    marginBottom: 32,
  },
});
