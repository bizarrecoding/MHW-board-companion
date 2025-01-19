import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";

import { MonsterKind, RankType } from "../../../assets/data/types";
import { IconButton } from "../../../components/Themed";
import StoryContent from "../../../components/screens/StoryLog/StoryContent";
import StoryPicker from "../../../components/screens/StoryLog/StoryPick";

const Story = () => {
  const navigation = useNavigation();
  const [monster, setMonster] = useState<MonsterKind>();
  const [rank, setRank] = useState<RankType>(`Low Rank`);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (!monster) return null;
        return (
          <IconButton
            icon="refresh"
            style={{ marginRight: 16 }}
            onPress={() => setMonster(undefined)}
          />
        );
      },
    });
  }, [navigation, monster]);
  if (!monster) return <StoryPicker setMonster={setMonster} setRank={setRank} />;

  return <StoryContent monster={monster} rank={rank} />;
};

export default Story;
