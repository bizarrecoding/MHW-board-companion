import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { ListRenderItemInfo, Platform, ScrollView, SectionList, SectionListRenderItemInfo, StyleSheet, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ItemList } from "../../assets/data/items";
import { ItemEntry } from "../../assets/data/types";
import { useInventory } from "../../hooks/useInventory";
import { useResponsiveWidth } from "../../hooks/useResponsiveWidth";
import Divider from "../Divider";
import { useInventoryCategories } from "../inventory/hooks/useInventoryCategories";
import InventoryItem from "../inventory/InventoryItem";
import { InventorySection } from "../inventory/InventorySection";
import { Button, Text } from "../Themed";
import SearchInput from "../themed/inputs/SearchInput";

// default non-filtered data
const sortedData = ItemList.sort((a, b) => a.type.localeCompare(b.type));

export const InventoryEntryModal = () => {
  const { addEntry } = useInventory();
  const { width } = useResponsiveWidth();
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

  const filterBy = (text: string) => {
    const newData = sortedData.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()));
    setData(newData);
  };

  const commitInventory = () => {
    toAdd.forEach((item) => {
      addEntry({ name: item.name, type: item.type, amount: 1, category: item.category });
    });
    router.back();
  };

  return (
    <View style={[styles.container, { width, paddingBottom: 0 }]}>
      <SearchInput onChangeText={filterBy} placeholder="Search materials..." />
      {Platform.OS === "web" && width >= 768 ? (
        <WebSection toAdd={toAdd} data={data} toggle={toggleInventoryEntry} />
      ) : (
        <MobileSection toAdd={toAdd} data={data} toggle={toggleInventoryEntry} />
      )}
      <Button title="Add to inventory" onPress={commitInventory} style={styles.btnCommit} />
    </View>
  );
};

type PlatformSectionProps = {
  toggle: (item: ItemEntry, add?: boolean) => void;
  toAdd: ItemEntry[];
  data: ItemEntry[];
};

const WebSection: React.FC<PlatformSectionProps> = ({ toAdd, data, toggle }) => {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ItemEntry>, add = true) => {
      return <InventoryItem add={add} item={item} onPress={toggle} />;
    },
    [toggle]
  );

  const subSections = useInventoryCategories(data);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
      <InventorySection
        key="adding"
        section={{ id: "To be added", title: "To be added", data: toAdd }}
        renderItem={(props: ListRenderItemInfo<ItemEntry>) => renderItem(props, false)}
      />
      <Text variant="caption" style={{ fontWeight: 600, textAlign: `center` }}>
        {toAdd.length} To be added
      </Text>
      {subSections.map((s) => (
        <InventorySection key={s.id} section={s} renderItem={renderItem} />
      ))}
    </ScrollView>
  );
};

const MobileSection: React.FC<PlatformSectionProps> = ({ toggle, toAdd, data }) => {
  const keyExtractor = (i: ItemEntry) => i.name;
  const paddingBottom = useSafeAreaInsets().bottom;
  const renderItem = useCallback(
    ({ item, section }: SectionListRenderItemInfo<ItemEntry>) => {
      const add = section.title !== "To be added";
      return <InventoryItem add={add} item={item} onPress={toggle} />;
    },
    [toggle]
  );
  const sections = [
    { id: "To be added", title: "To be added", data: toAdd },
    { id: "List", title: "List", data },
  ];

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      showsVerticalScrollIndicator={Platform.OS !== "web"}
      renderSectionHeader={({ section }) => {
        if (section.title === "To be added")
          return (
            <Text variant="caption" style={{ fontWeight: 600, textAlign: `center` }}>
              {toAdd.length} {section.title}
            </Text>
          );
        return <Divider separation={12} style={{ borderColor: `#8883`, borderWidth: 1 }} />;
      }}
      keyExtractor={keyExtractor}
      stickySectionHeadersEnabled={false}
      contentContainerStyle={{ paddingBottom: paddingBottom + 64 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "auto",
  },
  btnCommit: {
    position: `absolute`,
    bottom: 24,
    margin: 16,
    width: `92%`,
    marginBottom: 32,
  },
  scroll: {
    paddingBottom: 140,
  },
});
