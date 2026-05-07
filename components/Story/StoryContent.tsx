import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { story } from "../../assets/data/story";
import { MonsterKind, RankType, StoryEntry, StoryOption } from "../../assets/data/types";
import Colors from "../../constants/Colors";
import EventModal from "../Dropdown/EventModal";
import { MonsterIcon } from "../InventoryIcon";
import { Button, Text } from "../Themed";
import { useThemeColor } from "../themed/useThemeColor";
import EntryOptions from "./EntryOptions";
import ItemRewards from "./ItemRewards";
import PaperPanel, { PaperText } from "./PaperPanel";

type StoryProps = {
  monster: MonsterKind;
  rank: RankType;
};

const getMonsterStory = (monster: MonsterKind) => {
  return story[monster] ?? story.Barroth;
};

const random = (start: number, end: number) => {
  const range = end - start + 1;
  return Math.floor(start + Math.random() * range);
};

const getMonsterEntry = (story: StoryEntry[], rank: RankType = `Low Rank`) => {
  const entryIndex = rank === `Low Rank` ? 1 : random(2, 5);
  const entry = story.find((e) => e.entry === entryIndex);
  return entry ?? story[0];
};

const StoryContent: React.FC<StoryProps> = ({ monster, rank }) => {
  const router = useRouter();
  const monsterStory = getMonsterStory(monster);

  const accentColor = useThemeColor({}, "primary");
  const dividerColor = useThemeColor({}, "outlineVariant");

  const [currentEntry, setCurrentEntry] = useState<StoryEntry>(getMonsterEntry(monsterStory, rank));
  const [option, setOption] = useState<StoryOption>();

  const onOptionDismiss = () => {
    const nextEntry = monsterStory.find((entry) => entry.entry === option?.next);
    if (nextEntry) setCurrentEntry(nextEntry);
    setOption(undefined);
  };

  const onHunt = () => {
    setCurrentEntry(monsterStory[0]);
    router.replace(`/(tabs)/rolls`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Story Panel - the "journal page" */}
      <PaperPanel>
        <View style={styles.header}>
          {currentEntry?.monster ? <MonsterIcon noRank type={currentEntry.monster} style={styles.monsterIcon} /> : null}
          <Text style={[styles.monsterName, { color: accentColor }]}>{monster}</Text>
          <Text style={styles.rankBadge}>{rank} </Text>
        </View>
        <PaperText>{currentEntry.content ?? ""}</PaperText>
      </PaperPanel>

      {/* Rewards Section */}
      <ItemRewards rewards={currentEntry.get} />

      {/* Divider between journal content and game mechanics */}
      <View style={[styles.divider, { borderColor: dividerColor }]} />

      {/* Choice Buttons - "Leather Strap" style decisions */}
      <EntryOptions story={monsterStory} options={currentEntry?.options} setOption={setOption} setNext={setCurrentEntry} />

      {/* Hunt Button - primary action to start tracking */}
      {currentEntry.monster ? (
        <Button darkColor={Colors.dark.onPrimaryFixedVariant} title="Start Hunt" style={styles.huntButton} onPress={onHunt} />
      ) : null}

      {/* Event Modal for choice outcomes */}
      <EventModal visible={!!option} content={option} onClose={onOptionDismiss}>
        <ItemRewards rewards={option?.get} roll={option?.roll} />
      </EventModal>
    </ScrollView>
  );
};

export default StoryContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "auto",
  },
  scrollContent: {
    maxWidth: 800,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  monsterIcon: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  monsterName: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "NewsreaderBold",
    marginBottom: 4,
  },
  rankBadge: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },
  divider: {
    width: "60%",
    borderTopWidth: 1,
    borderStyle: "dashed",
    marginVertical: 24,
  },
  huntButton: {
    width: "100%",
    borderRadius: 16,
    marginTop: 8,
  },
});
