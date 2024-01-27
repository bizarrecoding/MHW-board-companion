import React from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";

import { ItemEntry, ItemList } from "../../assets/data/items";
import { Text, View } from "../../components/Themed";

const ColorMap: Record<string, string> = {
  ore: `#888888`,
  shell: `#FF6666`,
  bone: `#66ff66`,
  wing: `#6666ff`,
  sac: `#6ff6f6`,
  mud: `#f66ff6`,
  fang: `#f6f66f`,
  horn: `#f88666`,
  scale: `#66f886`,
  fin: `#6686f8`,
  gem: `#EACA00`,
  tail: `#66f8f8`,
  claw: `#f88666`,
};
const sortedData = ItemList.sort((a, b) => a.type.localeCompare(b.type));

export default function Inventory() {
  const renderItem: ListRenderItem<ItemEntry> = ({ item }) => {
    return (
      <View style={{ flexDirection: `row`, padding: 16, alignItems: `center` }}>
        <View style={[styles.typeIcon, { backgroundColor: ColorMap[item.type] ?? `#888` }]} />
        <Text variant="caption">{item.name}</Text>
      </View>
    );
  };
  const keyExtractor = (i: ItemEntry) => i.name;
  return (
    <FlatList<ItemEntry>
      data={sortedData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 60,
    marginRight: 16,
  },
});
