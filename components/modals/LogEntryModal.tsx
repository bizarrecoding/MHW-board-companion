import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

import { MonsterKind, Monsters, Ranks, RankType } from "../../assets/data/types";
import { useHunterLog } from "../../hooks/useHunterLog";
import { Button, Text, View } from "../Themed";
import { MonsterIcon } from "../InventoryIcon";
import { Slider } from "../themed/inputs/Slider";

export const LogEntryModal = () => {
  const width = useWindowDimensions().width - 32;
  const [monster, setMonster] = useState<MonsterKind>(`Barroth`);
  const [rank, setRank] = useState<RankType>(`Low Rank`);
  const [carts, setCarts] = useState(0);
  const { addLogEntry } = useHunterLog();

  const saveLogEntry = () => {
    if (!monster || !rank || carts < 0) return;
    addLogEntry({ monster, rank, carts });
    router.back();
  }; 
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Hunt Entry` }} />
      <Text style={styles.title}>
        Log the details of your completedhunt
      </Text> 
      <View style={{ flex: 1, width: `100%`, paddingHorizontal: 16 }}>
        <View style={{ width, alignItems: `center`, justifyContent: `center` }}>
          <MonsterIcon type={monster} noRank style={{ width: 96, height: 96 }} />
          <Text bold style={styles.categoryLabel}>
            {monster}
          </Text>
          <Slider
            data={Monsters}
            value={monster}
            onValueChange={(value) => setMonster(value as MonsterKind)}
            renderLabel={(_value) => ""}
          />
        </View>
        <Text bold style={styles.categoryLabel}>
          {rank}
        </Text>
        <Slider
          data={Ranks}
          value={rank}
          onValueChange={(value) => setRank(value as RankType)}
          renderLabel={(value) => value.split(` `)[0]}
        />
        <Text bold style={styles.categoryLabel}>Carts: {carts}</Text>
        <Slider
          data={[0, 1, 2, 3]}
          value={carts}
          onValueChange={(value) => setCarts(value as number)}
          renderLabel={(_value) => ""}
        /> 
        <Button title="Save hunt" onPress={saveLogEntry} />
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
    marginVertical: 32,
    fontSize: 16,
    textAlign: `center`,
  },
  categoryLabel: {
    textAlign: `center`,
    fontSize: 24,
    marginTop: 12,
    paddingHorizontal: 16,
  },
});
