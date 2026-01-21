import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { View, StyleSheet, SectionList, SectionListRenderItemInfo } from "react-native";

import { ItemList } from "../../assets/data/items";
import { ItemEntry } from "../../assets/data/types";
import { useInventory } from "../../hooks/useInventory";
import { Text, Button } from "../Themed";
import SearchInput from "../themed/inputs/SearchInput";
import Divider from "../Divider";
import InventoryItem from "../inventory/InventoryItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// default non-filtered data
const sortedData = ItemList.sort((a, b) => a.type.localeCompare(b.type));

export const InventoryEntryModal = () => {
  const { addEntry } = useInventory();
  const paddingBottom = useSafeAreaInsets().bottom;
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

  const renderItem = useCallback(
    ({ item, section }: SectionListRenderItemInfo<ItemEntry>) => {
      const add = section.title !== "To be added";
      return <InventoryItem add={add} item={item} onPress={toggleInventoryEntry} />;
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
  const sections = [
    { title: "To be added", data: toAdd },
    { title: "List", data }
  ];

  return (
    <View style={[styles.container, { paddingBottom: 0 }]}>
      <SearchInput onChangeText={filterBy} placeholder="Search materials..." />
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => {
          if (section.title === "To be added") return <Text variant="caption" style={{ fontWeight: 600, textAlign: `center` }}>{toAdd.length} {section.title}</Text>;
          return <Divider separation={12} style={{ borderColor: `#8883`, borderWidth: 1 }} />
        }}
        keyExtractor={keyExtractor}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ paddingBottom: paddingBottom + 64 }}
      />
      <Button title="Add to inventory" onPress={commitInventory} style={styles.btnCommit} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  title: {
    marginTop: 12,
  },
  btnCommit: {
    position: `absolute`,
    bottom: 24,
    margin: 16,
    width: `92%`,
    marginBottom: 32,
  },
});
