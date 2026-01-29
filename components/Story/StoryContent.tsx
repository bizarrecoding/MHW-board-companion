import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { story } from "../../assets/data/story";
import { MonsterKind, RankType, StoryEntry, StoryOption } from "../../assets/data/types";
import EventModal from "../Dropdown/EventModal";
import { MonsterIcon } from "../InventoryIcon";
import { Button, IconButton, Text } from "../Themed";
import { commonStyles } from "../themed/styles";
import { useThemeColor } from "../themed/useThemeColor";
import EntryOptions from "./EntryOptions";
import ItemRewards from "./ItemRewards";

type StoryProps = {
  monster: MonsterKind;
  rank: RankType;
  onReset: () => void;
};

const getMonsterStory = (monster: MonsterKind) => {
  return story[monster] ?? story.Barroth;
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

const StoryContent: React.FC<StoryProps> = ({ monster, rank, onReset }) => {
  const router = useRouter();
  const story = getMonsterStory(monster);
  const accentColor = useThemeColor({}, "accent")
  const cardColor = useThemeColor({}, "card");
  const cardBorderColor = useThemeColor({}, "cardBorder");
  const [currentEntry, setCurrentEntry] = useState<StoryEntry>(getMonsterEntry(story, rank));
  const [option, setOption] = useState<StoryOption>();
  const onOptionDismiss = () => {
    const nextEntry = story.find((entry) => entry.entry === option?.next);
    if (nextEntry) setCurrentEntry(nextEntry);
    setOption(undefined);
  };

  return (
    <View style={styles.container}>
      <IconButton size={32} icon="refresh" onPress={onReset} style={{ position: `absolute`, top: 16, right: 16 }} />
      {currentEntry?.monster ? (
        <MonsterIcon noRank type={currentEntry.monster} style={styles.monsterIcon} />
      ) : null}
      <View style={[styles.content, { backgroundColor: cardColor, borderColor: cardBorderColor }]}>
        <Text style={[styles.entryTitle, { color: accentColor }]}>
          Entry #{currentEntry.entry}
        </Text>
        <Text>{currentEntry.content}</Text>
      </View>
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
          style={{ width: "100%", borderRadius: 16 }}
          onPress={() => {
            setCurrentEntry(story[0]);
            router.replace(`/(tabs)/rolls`);
          }}
        />
      ) : null}
      <EventModal visible={!!option} content={option} onClose={onOptionDismiss}>
        <ItemRewards rewards={option?.get} roll={option?.roll} />
      </EventModal>
    </View>
  );
};

export default StoryContent;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "auto",
    maxWidth: 800,
    padding: 16,
    justifyContent: `center`,
    alignItems: `center`
  },
  monsterIcon: {
    width: 150,
    height: 150,
    marginVertical: 16,
  },
  content: {
    ...commonStyles.card,
    ...commonStyles.shadows,
    padding: 16,
    paddingVertical: 32,
    marginBottom: 16,
  },
  entryTitle: {
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: `bold`,
    marginBottom: 12,
  },
});
