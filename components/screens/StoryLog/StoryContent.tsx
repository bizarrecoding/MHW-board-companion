import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { ItemList } from "../../../assets/data/items";
import barrothStory, { StoryEntry, StoryOption } from "../../../assets/data/story-barroth";
import { ItemEntry, MonsterKind, RankType } from "../../../assets/data/types";
import EventModal from "../../Dropdown/EventModal";
import InventoryIcon, { MonsterIcon } from "../../InventoryIcon";
import { View, Text, Button } from "../../Themed";

type StoryProps = {
  monster: MonsterKind;
  rank: RankType;
};

const getMonsterStory = (monster?: MonsterKind) => {
  if (monster === `Barroth`) return barrothStory;
  if (monster === `Pukei-Pukei`) return barrothStory;
  //TODO: Add more monsters story entries
  return barrothStory;
};

const random = (start: number, end: number) => {
  // Random number between start and end, +1 to include end
  const range = end - start + 1;
  return Math.floor(start + Math.random() * range);
};

const getMonsterEntry = (story: StoryEntry[], rank: RankType = `Low Rank`) => {
  // High and master Rank: Randomize the entry to any of 2,3,4 or 5
  const entryIndex = rank === `Low Rank` ? 1 : random(2, 5);
  const entry = story.find((e) => e.entry === entryIndex);
  return entry ?? story[0];
};

const StoryContent: React.FC<StoryProps> = ({ monster, rank }) => {
  const router = useRouter();
  const story = getMonsterStory(monster);
  const [currentEntry, setCurrentEntry] = useState<StoryEntry>(getMonsterEntry(story, rank));
  const [option, setOption] = useState<StoryOption>();
  const onOptionDismiss = () => {
    const nextEntry = story.find((entry) => entry.entry === option?.next);
    if (nextEntry) setCurrentEntry(nextEntry);
    setOption(undefined);
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: `center`, alignItems: `center` }}>
      {currentEntry?.monster ? (
        <MonsterIcon noRank type={currentEntry.monster} style={{ width: 100, height: 100 }} />
      ) : null}
      <Text style={{ marginVertical: 30 }}>{currentEntry.content}</Text>
      <ItemRewards rewards={currentEntry.get} />
      <EntryOptions
        story={story}
        options={currentEntry?.options}
        setOption={setOption}
        setNext={setCurrentEntry}
      />
      {currentEntry.monster ? (
        <Button
          title="Hunt"
          onPress={() => {
            setCurrentEntry(story[0]);
            router.replace(`/(tabs)/rolls`);
          }}
        />
      ) : null}
      <EventModal visible={!!option} content={option} onClose={onOptionDismiss}>
        <ItemRewards rewards={option?.get} roll={option?.roll} style={styles.rewards} />
      </EventModal>
    </View>
  );
};

export default StoryContent;

const getFromRoll = (roll: string[]) => {
  const rand = Math.floor(Math.random() * roll.length);
  return roll[rand];
};

type ItemRewardsProps = {
  rewards?: string[];
  roll?: string[];
  style?: StyleProp<ViewStyle>;
};

const ItemRewards: React.FC<ItemRewardsProps> = ({ rewards, roll, style }) => {
  if (!rewards?.length && !roll?.length) return null;

  const rewardsList = rewards?.length ? [...rewards] : [];
  if (roll?.length) rewardsList.push(getFromRoll(roll));
  return (
    <>
      <Text variant="caption" style={{ marginVertical: 10 }}>
        Rewards:
      </Text>
      <View transparent style={[styles.row, styles.center, style]}>
        {rewardsList.map((item, _index) => {
          const entry = ItemList.find((entry) => entry.name === item);
          if (!entry) return null;
          const { type, name } = entry as ItemEntry;
          return (
            <View transparent key={item} style={[styles.center, { marginHorizontal: 10 }]}>
              <InventoryIcon type={type} name={name} style={{ marginHorizontal: 16 }} />
              <Text style={{ marginTop: 10 }}>{item}</Text>
            </View>
          );
        })}
      </View>
    </>
  );
};

type EntryOptionsProps = {
  story: StoryEntry[];
  options: StoryEntry[`options`];
  setOption: React.Dispatch<React.SetStateAction<StoryOption | undefined>>;
  setNext: React.Dispatch<React.SetStateAction<StoryEntry>>;
};

const EntryOptions: React.FC<EntryOptionsProps> = ({ story, options, setNext, setOption }) => {
  if (!options?.length) return null;
  return (
    <>
      {options.map((option, index) => {
        const onPress = () => {
          if (option.effect) return setOption(option);
          const nextEntry = story.find((entry) => entry.entry === option.next);
          if (nextEntry) setNext(nextEntry);
        };
        return <Button key={index} title={option.text} onPress={onPress} />;
      })}
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: `center`,
    alignItems: `center`,
  },
  row: {
    flexDirection: `row`,
  },
  rewards: {
    marginVertical: 20,
    paddingVertical: 10,
    height: 100,
  },
});
