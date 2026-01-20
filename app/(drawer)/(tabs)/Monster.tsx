import { Tabs } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, useWindowDimensions, View, ScrollView, TouchableOpacity, useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { MonsterHuntData, PartsData } from "../../../assets/data/hunt";
import { MonsterIcon } from "../../../components/InventoryIcon";
import { Text } from "../../../components/Themed";
import { HPCounter } from "../../../components/monster/HPCounter";
import MonsterParts from "../../../components/monster/MonsterParts";
import ResistanceTabs from "../../../components/monster/ResistanceTabs";
import { setRank } from "../../../util/redux/HuntSlice";
import { RootState } from "../../../util/redux/store";
import { useThemeColor } from "../../../components/themed/useThemeColor";
import { commonStyles } from "../../../components/themed/styles";

const Monster = () => {
  const dispatch = useDispatch(); 
  const accentColor = useThemeColor({}, `accent`);

  const { monster, rank } = useSelector((state: RootState) => state.hunt);
  const baseHunt = MonsterHuntData[monster ?? `Barroth`];
  const width = useWindowDimensions().width;
  const [effects, setEffects] = useState<(keyof PartsData)[]>([]);
  const onBreak = useCallback((part: keyof PartsData) => {
    setEffects((effects) => {
      if (effects.includes(part)) return effects.filter((e) => e !== part);
      return [...effects, part];
    });
  }, []);

  const toggle = () => {
    if (rank === `Low Rank`) dispatch(setRank(`High Rank`));
    if (rank === `High Rank`) dispatch(setRank(`Master Rank`));
    if (rank === `Master Rank`) dispatch(setRank(`Low Rank`));
    //reset visible effects
    setEffects([]);
  };

  const effectsText = useMemo(() => {
    let msg = baseHunt?.[rank]?.effects;
    effects.forEach((effect) => {
      const partEffect = baseHunt?.[rank]?.parts[effect]?.effect;
      if (msg && partEffect) msg = `${msg}\n - ${partEffect}`;
      else if (partEffect) msg = partEffect;
    });
    return msg;
  }, [baseHunt, effects, rank]);

  return (
    <View style={styles.container}>
      <Tabs.Screen
        options={{
          headerTitle: `${monster.toUpperCase()} | ${rank}`,
          headerTitleStyle: { fontSize: 16, letterSpacing: 1 },
        }}
      />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainCard}>
          <TouchableOpacity onPress={toggle}>
            <MonsterIcon
              rank={rank}
              type={monster}
              style={{ width: width / 3.5, height: width / 3.5 }}
            />
          </TouchableOpacity>
          <HPCounter max={baseHunt?.[rank]?.maxHP ?? 60} />
        </View>

        <View style={styles.sectionHeader}>
          <Text bold style={[styles.sectionTitle, { borderLeftColor: accentColor, color: accentColor }]}>MONSTER PARTS</Text>
        </View>
        <MonsterParts data={baseHunt?.[rank]?.parts!} onBreak={onBreak} />

        <View style={[styles.effectsCard]}>
          <Text bold style={[styles.effectsLabel, { color: accentColor }]}>HUNT EFFECTS</Text>
          <Text style={styles.effectsText}>{effectsText}</Text>
        </View>

        <View style={[styles.sectionHeader, { marginTop: 16 }]}>
          <Text bold style={[styles.sectionTitle, { borderLeftColor: accentColor, color: accentColor }]}>RESISTANCES</Text>
        </View>
        {baseHunt?.weakness ? <ResistanceTabs key={monster} data={baseHunt.weakness} /> : null}
      </ScrollView>
    </View>
  );
};

export default Monster;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  mainCard: {
    ...commonStyles.row,
    ...commonStyles.card,
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 16,
  },
  sectionHeader: {
    marginBottom: 12,
    borderLeftWidth: 3,
    paddingLeft: 12,
  },
  sectionTitle: {
    fontSize: 14,
    letterSpacing: 2, 
  },
  effectsCard: { 
    ...commonStyles.card,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  effectsLabel: {
    fontSize: 10,
    marginBottom: 8,
    letterSpacing: 1,
  },
  effectsText: {
    lineHeight: 20,
  },                                              
  effects: {
    display: `none`,
  },
});
