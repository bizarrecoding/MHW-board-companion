import { router } from "expo-router";
import React, { useState } from "react";
import { ListRenderItem, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import { MonsterKind, Monsters, RankType, Ranks } from "../../assets/data/constants";
import { addLogEntry } from "../../util/redux/LogSlice";
import Divider from "../Divider";
import NumberInput from "../NumberInput";
import { Button, Text, View } from "../Themed";

export const LogEntryModal = () => {
  const dispatch = useDispatch();
  const [monster, setMonster] = useState<MonsterKind>(`Barroth`);
  const [rank, setRank] = useState<RankType>(`Low Rank`);
  const [carts, setCarts] = useState(0);

  console.log({ monster, rank, carts });
  const saveLogEntry = () => {
    dispatch(addLogEntry({ id: Date.now() + ``, monster, rank, carts }));
    router.back();
  };
  return (
    <View style={styles.container}>
      <Text variant="title" style={styles.title}>
        Hunt Entry
      </Text>
      <Divider variant="title" />
      <View style={{ flex: 1, width: `100%`, paddingHorizontal: 16 }}>
        <SelectInput<MonsterKind> data={Monsters} label="Monster" setValue={setMonster} />
        <Divider separation={4} />
        <SelectInput<RankType> data={Ranks} label="Rank" setValue={setRank} />
        <Divider separation={4} />
        <NumberInput label="Carts:" setValue={setCarts} max={3}>
          <Text variant="subtitle" style={{ flex: 1, textAlign: `center` }}>
            {carts}
          </Text>
        </NumberInput>
        <Divider />
        <Button title="Save" onPress={saveLogEntry} />
      </View>
    </View>
  );
};

type SelectInputProps<T> = {
  label: string;
  data: T[];
  setValue: React.Dispatch<React.SetStateAction<T>>;
};

const SNAP_WIDTH = 360;

const SelectInput = <T extends string | number>({ label, data, setValue }: SelectInputProps<T>) => {
  const renderItem: ListRenderItem<T> = ({ item }) => {
    return (
      <View style={{ paddingHorizontal: 16, width: SNAP_WIDTH }}>
        <Text variant="caption">{item as string}</Text>
      </View>
    );
  };
  return (
    <View style={{ marginBottom: 16 }}>
      <Text variant="subtitle" style={{ paddingHorizontal: 16, marginBottom: 8 }}>
        {label}:
      </Text>
      <FlatList<T>
        horizontal
        data={data}
        renderItem={renderItem}
        snapToOffsets={data.map((_, i) => i * SNAP_WIDTH)}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / SNAP_WIDTH);
          setValue(data[index]);
        }}
      />
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
