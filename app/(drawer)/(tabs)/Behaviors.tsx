import React, { useEffect, useState } from "react";
import { ScrollView, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { useSelector } from "react-redux";

import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BehaviorData } from "../../../assets/data/behaviors";
import { Behavior, MonsterKind, RankType } from "../../../assets/data/types";
import { BehaviorCard } from "../../../components/Behaviors/Cards/FaceUpCard";
import { Text } from "../../../components/Themed";
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

const shuffleDeck = (monster: MonsterKind, rank: RankType) => {
  const baseBehaviors = getBehaviors(monster, rank);
  return [null, ...shuffleArray<Behavior | null>(baseBehaviors)];
};

type BehaviorsProps = {
  style?: StyleProp<ViewStyle>;
}

const Behaviors: React.FC<BehaviorsProps> = ({ style }) => {
  const paddingTop = useSafeAreaInsets().top;
  const { monster, rank } = useSelector((state: RootState) => state.hunt);
  const [index, setIndex] = useState(0);
  const [deck, setDeck] = useState<(Behavior | null)[]>([]);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  useEffect(() => {
    setDeck(shuffleDeck(monster, rank));
    setIndex(0);
  }, [monster, rank]);

  const rollback = () => {
    setDirection("prev");
    setIndex((index) => (index - 1 + deck.length) % deck.length);
  };

  const discard = () => {
    setDirection("next");
    if (index === deck.length - 1) {
      setDeck(shuffleDeck(monster, rank));
      setIndex(0);
    } else {
      setIndex((index) => index + 1);
    }
  };

  const remaining = deck.length - index - 1;

  return (
    <ScrollView style={[styles.container, { paddingTop }, style]}>
      <View style={styles.content}>
        <Animated.View
          key={index}
          entering={direction === "next" ? SlideInRight : SlideInLeft}
          exiting={direction === "next" ? SlideOutLeft : SlideOutRight}
        >
          <TouchableOpacity activeOpacity={0.9} onLongPress={rollback}>
            <BehaviorCard behavior={deck[index]} />
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.counterWrapper}>
          <Text style={styles.remainingText}>
            {remaining >= 0 ? remaining : 0}
          </Text>
          <Text style={styles.remainingLabel}>CARDS REMAINING</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={discard}
        style={styles.nextCardArea}
      >
        <Text style={styles.nextCardLabel}>TAP TO DISCARD</Text>
        <BehaviorCard hidden behavior={deck[(index + 1) % deck.length]} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  counterWrapper: {
    alignItems: "center",
    marginTop: 18,
  },
  remainingText: {
    fontSize: 36,
    fontWeight: "900",
    opacity: 0.5,
  },
  remainingLabel: {
    fontSize: 10,
    letterSpacing: 2,
    opacity: 0.5,
    marginTop: -4,
  },
  nextCardArea: {
    alignItems: "center",
    gap: 12,
  },
  nextCardLabel: {
    fontSize: 9,
    letterSpacing: 2,
    opacity: 0.5,
    fontWeight: "bold",
  }
});

export default Behaviors;
