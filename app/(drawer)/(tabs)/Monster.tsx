import { Tabs } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity } from "react-native";

import { MonsterHuntData, PartsData } from "../../../assets/data/hunt";
import { MonsterKind, RankType } from "../../../assets/data/types";
import { MonsterIcon } from "../../../components/InventoryIcon";
import { View, Text } from "../../../components/Themed";
import { HPCounter } from "../../../components/screens/monster/HPCounter";
import MonsterParts from "../../../components/screens/monster/MonsterParts";
import ResistanceTabs from "../../../components/screens/monster/ResistanceTabs";

const baseHunt = MonsterHuntData[`Barroth`];

const Monster = () => {
  const [monster, _setMonster] = useState<MonsterKind>(`Barroth`);
  const [rank, setRank] = useState<RankType>(`Low Rank`);
  const width = useWindowDimensions().width;
  const [effects, setEffects] = useState<(keyof PartsData)[]>([]);
  const onBreak = useCallback((part: keyof PartsData) => {
    setEffects((effects) => {
      if (effects.includes(part)) return effects.filter((e) => e !== part);
      return [...effects, part];
    });
  }, []);

  const toggle = () => {
    if (rank === `Low Rank`) setRank(`High Rank`);
    if (rank === `High Rank`) setRank(`Master Rank`);
    if (rank === `Master Rank`) setRank(`Low Rank`);
    //reset visible effects
    setEffects([]);
  };

  const effectsText = useMemo(() => {
    let msg = baseHunt?.effects;
    effects.forEach((effect) => {
      const partEffect = baseHunt?.[rank]?.parts[effect]?.effect;
      if (msg && partEffect) msg = `${msg}\n - ${partEffect}`;
    });
    return msg;
  }, [effects, rank]);
  return (
    <View style={styles.container}>
      <Tabs.Screen
        options={{
          headerTitle: monster + ` - ` + rank,
        }}
      />
      <ScrollView style={{ padding: 16 }}>
        <View style={{ flexDirection: `row`, alignItems: `center` }}>
          <TouchableOpacity onPress={toggle}>
            <MonsterIcon
              rank={rank}
              type={monster}
              style={{ width: width / 3, height: width / 3, alignSelf: `center`, marginLeft: 20 }}
            />
          </TouchableOpacity>
          <HPCounter max={baseHunt?.[rank]?.maxHP ?? 60} />
        </View>
        <MonsterParts data={baseHunt?.[rank]?.parts!} onBreak={onBreak} />
        <View style={styles.effects}>
          <Text variant="caption">Effects</Text>
          <Text>{effectsText}</Text>
        </View>
        {baseHunt?.weakness ? <ResistanceTabs data={baseHunt.weakness} /> : null}
      </ScrollView>
    </View>
  );
};

export default Monster;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  effects: {
    marginTop: 10,
    marginBottom: 15,
  },
});
