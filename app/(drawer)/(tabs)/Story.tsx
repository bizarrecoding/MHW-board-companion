import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";

import { MonsterKind, Ranks, RankType } from "../../../assets/data/types";
import { IconButton, Text } from "../../../components/Themed";
import StoryContent from "../../../components/Story/StoryContent";
import StoryPicker from "../../../components/Story/StoryPick";
import { setRank, setMonster } from "../../../util/redux/HuntSlice";
import { RootState } from "../../../util/redux/store";
import { story } from "../../../assets/data/story";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Slider } from "../../../components/themed/inputs/Slider";

const Story = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const paddingTop = useSafeAreaInsets().top;
  const [needToPick, setNeedToPick] = useState(true);
  const { monster, rank } = useSelector((state: RootState) => state.hunt);

  const dispatchMonster = (monster: MonsterKind) => {
    dispatch(setMonster(monster));
    setNeedToPick(false);
  };
  const dispatchRank = (rank: RankType) => {
    dispatch(setRank(rank));
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (!monster) return null;
        return (
          <IconButton
            icon="refresh"
            style={{ marginRight: 16 }}
            onPress={() => setNeedToPick(true)}
          />
        );
      },
    });
  }, [navigation, monster]);

  const availableMonsters = Object.entries(story)
    .filter(([_, v]) => v.length > 0)
    .map(([k]) => k) as MonsterKind[];

  return (
    <View style={{ flex: 1, paddingTop }}>
      {needToPick ? (
        <StoryPicker
          setMonster={dispatchMonster}
        allowedChoices={availableMonsters}
        >
          <Text style={styles.title}>Choose a monster to start your story:</Text>
          <Slider
            data={Ranks}
            value={rank}
            onValueChange={(rank) => dispatchRank(rank as RankType)}
            renderLabel={(rank) => rank.split(" ")[0]}
          />
        </StoryPicker>
      ) : (
        <StoryContent monster={monster} rank={rank} onReset={() => setNeedToPick(true)} />
      )}
    </View>
  );
};

export default Story;

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