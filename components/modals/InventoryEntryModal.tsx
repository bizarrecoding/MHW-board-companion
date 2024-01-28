import { router } from "expo-router";
import React, { useState } from "react";
import { ListRenderItem, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import { ItemList } from "../../assets/data/items";
import { ItemEntry } from "../../assets/data/types";
import { addInventoryEntry } from "../../util/redux/InventorySlice";
import Divider from "../Divider";
import InventoryIcon from "../InventoryIcon";
import { Text, View, TextInput, IconButton } from "../Themed";
import { useThemeColor } from "../themed/useThemeColor";

const sortedData = ItemList.sort((a, b) => a.type.localeCompare(b.type));
const stickyIndex = [0];
export const InventoryEntryModal = () => {
  const dispatch = useDispatch();

  const backgroundColor = useThemeColor({}, `background`);
  const [data, setData] = useState(sortedData);

  const renderItem: ListRenderItem<ItemEntry> = ({ item }) => {
    const saveLogEntry = () => {
      dispatch(addInventoryEntry({ name: item.name, type: item.type, amount: 1 }));
      router.back();
    };
    return (
      <View style={{ flexDirection: `row`, padding: 16, alignItems: `center` }}>
        <InventoryIcon type={item.type} name={item.name} />
        <Text variant="caption" style={{ flex: 1 }}>
          {item.name}
        </Text>
        <IconButton icon="plus" variant="clear" onPress={saveLogEntry} />
      </View>
    );
  };
  const keyExtractor = (i: ItemEntry) => i.name;
  const filterBy = (text: string) => {
    const newData = sortedData.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()));
    setData(newData);
  };

  return (
    <View style={styles.container}>
      <Text variant="subtitle" style={styles.title}>
        Select an item to add
      </Text>
      <Divider variant="title" separation={16} />
      <View style={{ flex: 1, width: `100%`, paddingHorizontal: 16 }}>
        <FlatList<ItemEntry>
          ListHeaderComponent={
            <View style={{ backgroundColor }}>
              <TextInput
                style={{ padding: 16 }}
                onChangeText={filterBy}
                placeholder="Filter by..."
              />
            </View>
          }
          stickyHeaderIndices={stickyIndex}
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={{ flex: 1 }}
          ListFooterComponent={<View style={{ height: 36 }} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
  },
  title: {
    marginTop: 48,
  },
});
