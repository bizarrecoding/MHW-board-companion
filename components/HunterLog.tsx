import React from "react";
import { Alert, FlatList, ListRenderItem, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import Divider from "./Divider";
import { MonsterIcon } from "./InventoryIcon";
import { IconButton, Text, View } from "./Themed";
import { useThemeColor } from "./themed/useThemeColor";
import { LogEntry, deleteLogEntry } from "../util/redux/LogSlice";

type HunterLogProps = {
  data: LogEntry[];
};

export const HunterLog: React.FC<HunterLogProps> = ({ data }) => {
  const dispatch = useDispatch();
  const backgroundColor = useThemeColor({}, `background`);
  const renderItem: ListRenderItem<LogEntry> = ({ item }) => {
    const deleteItem = () => {
      Alert.alert(`Delete Hunt ${item.monster}?`, `This action cannot be undone.`, [
        {
          text: `Cancel`,
          onPress: () => console.log(`Cancel Pressed`),
          style: `cancel`,
        },
        {
          text: `OK`,
          onPress: () => dispatch(deleteLogEntry(item.id)),
          style: `destructive`,
        },
      ]);
    };
    return (
      <View style={styles.itemCard}>
        <MonsterIcon type={item.monster} rank={item.rank} />
        <View style={{ flex: 1 }}>
          <Text variant="caption">{item.monster}</Text>
          <View
            style={{
              flexDirection: `row`,
            }}
          >
            <Text variant="body" style={{ flex: 1 }}>
              {item.rank}
            </Text>
            {item?.carts ? (
              <Text variant="body" style={{ flex: 1 }}>
                Carted: {item.carts}
              </Text>
            ) : null}
          </View>
        </View>
        <IconButton icon="times-circle" onPress={deleteItem} />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      style={[styles.container, { backgroundColor }]}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View style={styles.container}>
          <Text variant="subtitle" style={styles.title}>
            Total hunts: {data.length}
          </Text>
          <Divider />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 16,
    paddingBottom: 8,
  },
  itemCard: {
    padding: 16,
    flexDirection: `row`,
    alignItems: `center`,
  },
});
