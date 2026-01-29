import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import MonsterScreen from "../../../components/monster/MonsterScreen";
import { commonStyles } from "../../../components/themed/styles";
import { useResponsiveWidth } from "../../../hooks/useResponsiveWidth";
import { RootState } from "../../../util/redux/store";
import Behaviors from "./Behaviors";

const Monster = () => {
  const width = useResponsiveWidth().width;
  const { monster, rank } = useSelector((state: RootState) => state.hunt);

  return (
    <View style={styles.container}>
      <Tabs.Screen
        options={{
          headerTitle: `${monster.toUpperCase()} | ${rank}`,
          headerTitleStyle: { fontSize: 16, letterSpacing: 1 },
        }}
      />
      {width < 700 ? (
        <MonsterScreen />
      ) : (
        <View style={[styles.MasterDetailScreen, { width }]}>
          <MonsterScreen style={styles.masterFragment} />
          <Behaviors style={styles.detailFragment} />
        </View>
      )}
    </View>
  );
};

export default Monster;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  MasterDetailScreen: {
    flex: 1,
    flexDirection: "row",
    margin: "auto",
    gap: 16,
  },
  masterFragment: {
    flex: 1,
  },
  detailFragment: {
    marginTop: 16,
    maxWidth: 500,
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  mainCard: {
    ...commonStyles.row,
    ...commonStyles.card,
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 16,
  },
  sectionHeader: {
    marginBottom: 12,
    borderLeftWidth: 3,
    paddingLeft: 12,
  },
  sectionTitle: {
    fontSize: 14,
    letterSpacing: 2, 
  },
  effectsCard: { 
    ...commonStyles.card,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  effectsLabel: {
    fontSize: 10,
    marginBottom: 8,
    letterSpacing: 1,
  },
  effectsText: {
    lineHeight: 20,
  },
});
