import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { MonsterHuntData } from "../../assets/data/hunt";
import { MonsterKind, RankType } from "../../assets/data/types";
import { setHunt } from "../../util/redux/HuntSlice";
import StoryPicker from "../screens/StoryLog/StoryPick";

type MonsterModalProps = object;

const allowedChoices = Object.keys(MonsterHuntData).filter(
  (key) => MonsterHuntData[key as MonsterKind] !== null
) as MonsterKind[];

export const MonsterModal: React.FC<MonsterModalProps> = () => {
  const dispatch = useDispatch();
  const [rank, setRank] = useState<RankType>(`Low Rank`);
  const setMonster = useCallback(
    (
      // had to match React.Dispatch<React.SetStateAction<MonsterKind | undefined>> signature to avoid type errors
      monster?: MonsterKind | ((prev?: MonsterKind) => MonsterKind | undefined)
    ) => {
      if (typeof monster === `string`) {
        //set monster and rank
        dispatch(setHunt({ monster, rank }));
        setTimeout(() => {
          router.back();
        }, 1000);
      }
    },
    [dispatch, rank]
  );

  return (
    <StoryPicker
      setMonster={setMonster}
      setRank={setRank}
      allowedChoices={allowedChoices}
      title="Choose a monster to see its details:"
      style={{ justifyContent: `flex-start` }}
    />
  );
};
