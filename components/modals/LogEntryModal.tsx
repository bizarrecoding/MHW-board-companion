import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { MonsterKind, Monsters, RankType, Ranks } from "../../assets/data/types";
import { addLogEntry } from "../../util/redux/LogSlice";
import Divider from "../Divider";
import NumberInput from "../NumberInput";
import { SelectInput } from "../SelectInput";
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
  },
  title: {
    marginTop: 48,
  },
});
