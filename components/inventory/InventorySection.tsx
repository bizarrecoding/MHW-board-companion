import React, { useMemo } from "react";
import { FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet, View } from "react-native";

import { InventoryEntry } from "../../assets/data/types";
import { commonStyles } from "../themed/styles";
import InventoryHeader from "./InventoryHeader";

type EntrySection = {
  id: string;
  title: string;
  data: InventoryEntry[];
};

type InventorySectionProps = {
  section: EntrySection;
  renderItem: ListRenderItem<InventoryEntry>;
};

type DataWithDummies = InventoryEntry | { id: string };

export const InventorySection: React.FC<InventorySectionProps> = ({ section, renderItem }) => {
  const _renderItem = (props: ListRenderItemInfo<DataWithDummies>) => {
    if (props.item.id.includes("Dummy")) return <View style={styles.dummyItemWrapper} />;
    return renderItem(props as ListRenderItemInfo<InventoryEntry>);
  };

  const paddedList = useMemo(() => {
    const arr: DataWithDummies[] = [...section.data];
    const missing = 3 - (section.data.length % 3);
    if (missing !== 3) {
      for (let index = missing; index > 0; index--) {
        arr.push({ id: `Dummy ${index}` });
      }
    }
    return arr;
  }, [section.data]);

  return (
    <View>
      <InventoryHeader title={section.title} />
      <FlatList<DataWithDummies>
        data={paddedList}
        key={section.title}
        numColumns={3}
        keyExtractor={(i) => i.id}
        renderItem={_renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dummyItemWrapper: {
    ...commonStyles.row,
    padding: commonStyles.card.padding,
    marginHorizontal: 16,
    marginVertical: 6,
    flex: 1,
  },
});
