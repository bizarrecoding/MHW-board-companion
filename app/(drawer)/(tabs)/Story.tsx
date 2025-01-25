import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MonsterKind, RankType } from "../../../assets/data/types";
import { IconButton } from "../../../components/Themed";
import StoryContent from "../../../components/screens/StoryLog/StoryContent";
import StoryPicker from "../../../components/screens/StoryLog/StoryPick";
import { setRank, setMonster } from "../../../util/redux/HuntSlice";
import { RootState } from "../../../util/redux/store";

const Story = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
  if (needToPick)
    return (
      <StoryPicker
        setMonster={dispatchMonster}
        setRank={dispatchRank}
        allowedChoices={[`Barroth`]}
      />
    );

  return <StoryContent monster={monster} rank={rank} />;
};

export default Story;
