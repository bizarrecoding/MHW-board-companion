import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { story } from "../../../assets/data/story";
import { MonsterKind, Ranks, RankType } from "../../../assets/data/types";
import StoryContent from "../../../components/Story/StoryContent";
import StoryPicker from "../../../components/Story/StoryPick";
import { IconButton, Text } from "../../../components/Themed";
import { Slider } from "../../../components/themed/inputs/Slider";
import { useResponsiveWidth } from "../../../hooks/useResponsiveWidth";
import { setMonster, setRank } from "../../../util/redux/HuntSlice";
import { RootState } from "../../../util/redux/store";

const Story = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { width } = useResponsiveWidth();
  const [needToPick, setNeedToPick] = useState(true);
  const { monster, rank } = useSelector((state: RootState) => state.hunt);
  console.log("🚀 ~ Story ~ monster:", monster);

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
        if (needToPick) return null;
        return (
          <IconButton
            size={24}
            icon="refresh"
            style={{ marginRight: 16 }}
            onPress={() => setNeedToPick(true)}
          />
        );
      },
    });
  }, [navigation, needToPick]);

  const availableMonsters = Object.entries(story)
    .filter(([_, v]) => v.length > 0)
    .map(([k]) => k) as MonsterKind[];

  return (
    <View style={{ flex: 1, width, margin: "auto" }}>
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
  container: {
    flex: 1,
    margin: "auto",
    justifyContent: `center`,
  },
  title: {
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 2,
    opacity: 0.7,
    marginTop: Platform.OS === "web" ? 0 : 40,
    marginBottom: 8,
    textAlign: "center",
  },
});