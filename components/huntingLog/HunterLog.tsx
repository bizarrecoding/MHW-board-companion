import React, { useEffect } from "react";
import { Alert, FlatList, ListRenderItem, StyleSheet } from "react-native";

import { HunterLogEntry, useHunterLog } from "../../hooks/useHunterLog";
import { MonsterIcon } from "../InventoryIcon";
import { IconButton, Text, View } from "../Themed";
import { useThemeColor } from "../themed/useThemeColor";
import { useNavigation } from "expo-router";
import { commonStyles } from "../themed/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.toISOString().split(`T`)[0]}`;
};

export const HunterLog: React.FC = () => {
  const navigation = useNavigation();
  const paddingBottom = useSafeAreaInsets().bottom;
  const backgroundColor = useThemeColor({}, `background`);
  const { logs = [], deleteLogEntry } = useHunterLog();

  const deleteItem = (item: HunterLogEntry) => {
    Alert.alert(`Delete Hunt ${item.monster}?`, `This action cannot be undone.`, [
      {
        text: `Cancel`,
        onPress: () => null,
        style: `cancel`,
      },
      {
        text: `OK`,
        onPress: () => deleteLogEntry(item.id),
        style: `destructive`,
      },
    ]);
  };

  const renderItem: ListRenderItem<HunterLogEntry> = ({ item }) => {
    return (
      <View style={styles.itemCard}>
        <MonsterIcon type={item.monster} rank={item.carts === 3 ? `failed` : item.rank} />
        <View style={{ flex: 1, marginHorizontal: 12, gap: 12 }}>
          <View style={[styles.row, {}]}>
            <Text bold variant="caption" style={{ fontSize: 18, letterSpacing: 1 }}>{item.monster}</Text>
          </View>
          <View style={styles.row}>
            <Text variant="body" style={styles.subTitle}>{formatTimestamp(item.timestamp)}</Text>
            {item?.carts ? (
              <Text variant="body" style={styles.subTitle}>Carted: {item.carts}</Text>
            ) : null}
          </View>
        </View>
        <IconButton icon="times-circle" size={24} onPress={() => deleteItem(item)} />
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      title: (
        <Text style={styles.title}>
          TOTAL HUNTS: {logs.length}
        </Text>
      ),
    });
  }, [logs]);

  return (
    <FlatList<HunterLogEntry>
      data={logs}
      style={[styles.container, { backgroundColor }]}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 6, paddingBottom }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `space-between`,
    gap: 8,
  },
  title: {
    fontWeight: `bold`,
    letterSpacing: 1,
    padding: 16,
  },
  subTitle: {},
  itemCard: {
    ...commonStyles.row,
    ...commonStyles.card, 
    marginHorizontal: 12,
    marginVertical: 6,
  },
});
