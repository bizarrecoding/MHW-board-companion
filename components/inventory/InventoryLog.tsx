import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, StyleProp, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View, ViewStyle } from "react-native";

import { InventoryEntry, useInventory } from "../../hooks/useInventory";
import InventoryIcon from "../InventoryIcon";
import NumberInput from "../themed/inputs/NumberInput";
import { IconButton, Text } from "../Themed";
import { useThemeColor } from "../themed/useThemeColor";
import { FontAwesome } from "@expo/vector-icons";
import SearchInput from "../themed/inputs/SearchInput";
import { commonStyles } from "../themed/styles";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const stickyIndex = [0];

export default function InventoryLog() {
  const paddingBottom = useSafeAreaInsets().bottom;
  const { inventory, updateEntry, deleteEntry } = useInventory();
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
    <View style={[styles.container, { paddingBottom }]}>
      <FlatList<InventoryEntry>
        data={filterableInventory}
        ListHeaderComponent={
          <SearchInput onChangeText={filterBy} />
        }
        stickyHeaderIndices={stickyIndex}
        renderItem={renderItem}
        keyExtractor={keyExtractor} 
        contentContainerStyle={{ paddingBottom: 96 }}
      />

      <FloatingActionButton icon="plus" size={56} style={[styles.fabPosition, { paddingBottom }]} onPress={() => {
        router.push(`/modal?type=item`);
      }} />
    </View>
  );
}

type FloatingActionButtonProps = {
  icon: "plus";
  size: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ icon, size, style, onPress }) => {
  const accentColor = useThemeColor({}, `textSecondary`);
  const backgroundColor = useThemeColor({}, `accent`);
  const customStyles = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor,
  };
  return (
    <View style={style}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={[styles.fab, commonStyles.shadows, customStyles]}>
          <FontAwesome
            name={icon}
            size={size / 2}
            color={accentColor}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabPosition: {
    position: `absolute`,
    bottom: 16,
    right: 16,
  },
  fab: {
    justifyContent: `center`,
    alignItems: `center`,
  },
  itemWrapper: {
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
