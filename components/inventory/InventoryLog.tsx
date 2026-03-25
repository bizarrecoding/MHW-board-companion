import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ListRenderItem, Platform, SectionList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { InventoryEntry } from "../../assets/data/types";
import { findCategory, useInventory } from "../../hooks/useInventory";
import { useResponsiveWidth } from "../../hooks/useResponsiveWidth";
import InventoryIcon from "../InventoryIcon";
import { IconButton, Text } from "../Themed";
import NumberInput from "../themed/inputs/NumberInput";
import SearchInput from "../themed/inputs/SearchInput";
import { commonStyles } from "../themed/styles";
import InventoryHeader from "./InventoryHeader";
import { InventorySection } from "./InventorySection";

type EntrySection = {
  id: string;
  title: string;
  data: InventoryEntry[];
};

export default function InventoryLog() {
  const paddingBottom = useSafeAreaInsets().bottom;
  const { inventory, updateEntry, deleteEntry } = useInventory();
  const [edit, setEdit] = useState<string | null>(null);
  const [amount, setAmount] = useState(0);
  const { width, numColumns } = useResponsiveWidth();

  const [filterableInventory, setFilterableInventory] = useState(inventory);
  const renderItem: ListRenderItem<InventoryEntry> = useCallback(
    ({ item }) => {
      const setupEdit = () => {
        setEdit(item.id);
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
            <Text variant="caption" style={styles.itemLabel}>
              {item.name}
            </Text>
            {edit === item.id ? (
              <IconButton icon="check" variant="clear" onPress={save} />
            ) : (
              <Text style={styles.itemAmount}> x {item.amount}</Text>
            )}
          </TouchableOpacity>
          {edit === item.id ? (
            <View key="edit" style={[styles.row, { marginVertical: 12, justifyContent: "space-around" }]}>
              <NumberInput setValue={setAmount} value={amount} style={styles.countEditor} />
            </View>
          ) : null}
        </View>
      );
    },
    [amount, deleteEntry, edit, updateEntry]
  );
  const keyExtractor = (i: InventoryEntry) => i.name;

  const filterBy = (text: string) => {
    const newData = inventory.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()));
    setFilterableInventory(newData);
  };
  useEffect(() => {
    // update filterableInventory when inventory changes
    setFilterableInventory(inventory);
  }, [inventory]);

  const sections = useMemo(() => {
    const data = filterableInventory.reduce(
      (rec, current) => {
        if (!current) return rec;
        const category = current.category ?? findCategory(current);
        const exist = Object.keys(rec).includes(category);
        if (!exist) rec[category] = { id: category, title: category, data: [] };
        rec[category].data.push(current);
        return rec;
      },
      {} as Record<string, EntrySection>
    );

    return Object.values(data);
  }, [filterableInventory]);

  return (
    <View style={[styles.container, { width, paddingBottom }]}>
      {Platform.OS === "web" && numColumns > 1 ? (
        sections.map((s) => <InventorySection key={s.id} section={s} renderItem={renderItem} />)
      ) : (
        <SectionList<InventoryEntry, EntrySection>
          sections={sections}
          ListHeaderComponent={<SearchInput onChangeText={filterBy} />}
          renderSectionHeader={(info) => <InventoryHeader title={info.section.title} />}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "auto",
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
    opacity: 0.75,
  },
  countEditor: {
    flex: 4,
  },
  icon: {
    marginRight: 12,
  },
});
