import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import MonsterScreen from "../../../components/monster/MonsterScreen";
import { commonStyles } from "../../../components/themed/styles";
import Behaviors from "./Behaviors";

const getLayout = (width: number) => {
  let layoutWidth = width;
  if (width >= 1024) layoutWidth = Math.min(width * 0.8, 1200);
  return layoutWidth;
} 

const Monster = () => {
  const screenWidth = useWindowDimensions().width;
  const width = getLayout(screenWidth);

  return (
    <View style={styles.container}>
      {screenWidth < 600 ? (
        <MonsterScreen />
      ) : (
          <View style={[styles.MasterDetailScreen, { width }]}>
            <MonsterScreen style={[styles.masterFragment, { flex: 3 }]} />
            <Behaviors style={[styles.detailFragment, { flex: 2 }]} />
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
    flex: 3,
  },
  detailFragment: {
    marginTop: 16,
    flex: 2,
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
