import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import { Behavior, BehaviorData } from "../../../assets/data/behaviors";
import { MonsterKind, RankType } from "../../../assets/data/types";
import { View, Text } from "../../../components/Themed";
import { BehaviorCard } from "../../../components/screens/behaviors/BehaviorCard";
import { RootState } from "../../../util/redux/store";

/**
 * get monster behaviors based on rank
 * @returns Behavior[]
 */
const getBehaviors = (monster: MonsterKind, rank: RankType) => {
  const base = BehaviorData[monster ?? `Barroth`] ?? [];
  if (rank === `Master Rank`) return [...base];
  return [...base.filter((b) => !b?.rank || b.rank === rank)];
};

const shuffleArray = <T,>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Behaviors: React.FC = () => {
  const { monster, rank } = useSelector((state: RootState) => state.hunt);
  const [index, setIndex] = useState(0);
  const deck = useMemo(() => {
    const baseBehaviors = getBehaviors(monster, rank);
    return shuffleArray<Behavior | null>(baseBehaviors);
  }, [monster, rank]);

  useEffect(() => {
    setIndex(0);
  }, [deck]);

  const rollback = () => setIndex((index) => (index - 1 + deck.length) % deck.length);
  const discard = () => setIndex((index) => (index + 1) % deck.length);

  const remaining = deck.length - index - 1;

  return (
    <View style={styles.container}>
      <TouchableOpacity onLongPress={rollback}>
        <BehaviorCard behavior={deck[index]} />
      </TouchableOpacity>
      <Text variant="caption" style={{ textAlign: `center`, marginTop: 12 }}>
        {remaining >= 0 ? remaining : 0} cards left
      </Text>
      <TouchableOpacity onPress={discard} style={{ marginTop: 24 }}>
        <BehaviorCard hidden behavior={deck[index + (1 % deck.length)]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

export default Behaviors;
