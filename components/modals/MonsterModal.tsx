import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet } from "react-native";

import { MonsterHuntData } from "../../assets/data/hunt";
import { MonsterKind, RankType } from "../../assets/data/types";
import { setHunt } from "../../util/redux/HuntSlice";
import StoryPicker from "../Story/StoryPick";
import { Text } from "../Themed";
import { RankSlider } from "../RankSlider";

const allowedChoices = Object.keys(MonsterHuntData).filter(
  (key) => MonsterHuntData[key as MonsterKind] !== null
) as MonsterKind[];

export const MonsterModal: React.FC = () => {
  const dispatch = useDispatch();
  const [rank, setRank] = useState<RankType>(`Low Rank`);
  const setMonster = useCallback(
    (monster: MonsterKind) => {
      dispatch(setHunt({ monster, rank }));
      setTimeout(() => {
        router.back();
      }, 1000);
    },
    [dispatch, rank]
  );

  return (
    <StoryPicker
      setMonster={setMonster}
      allowedChoices={allowedChoices}
    >
      <Text style={styles.title}>Choose a monster to see its details:</Text>
      <RankSlider value={rank} onValueChange={setRank} />
    </StoryPicker>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 2,
    opacity: 0.7,
    marginBottom: 8,
    textAlign: "center",
  },
});