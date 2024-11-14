/*
 - HeaderRight: icon - select hunt monster and behavior patterns
 - body
   - center: display main behavior
   - bottom right: display next behavior 
 - footer: deck info 
*/

//import { useSegments } from "expo-router";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

import { MonsterKind } from "../../../assets/data/types";
import { MonsterIcon } from "../../../components/InventoryIcon";
import { View, Text } from "../../../components/Themed";
import { PartCard } from "../../../components/monster/PartCard";
import ResistanceTabs from "../../../components/monster/ResistanceTabs";

const Monster = () => {
  //const data = useSegments();
  const [monster, _setMonster] = useState<MonsterKind>(`Barroth`);
  const [HP, _setHP] = useState(60);
  const width = useWindowDimensions().width;

  return (
    <View style={styles.container}>
      <Tabs.Screen
        options={{
          headerTitle: monster,
        }}
      />
      <View style={{ flexDirection: `row`, alignItems: `center` }}>
        <MonsterIcon
          rank="Low Rank"
          type={monster}
          style={{ width: width / 3, height: width / 3, alignSelf: `center` }}
        />
        <Text style={styles.hp}>{HP}</Text>
      </View>
      <View style={{ flexDirection: `row`, padding: 12, paddingVertical: 12 }}>
        <View style={{ flex: 1 }}>
          <PartCard type="Head" def={1} breakRes={0} />
          <PartCard type="Back" def={0} breakRes={0} />
        </View>
        <View style={{ flex: 1 }}>
          <PartCard type="Legs" def={0} breakRes={0} />
          <PartCard type="Tail" def={0} breakRes={0} />
        </View>
      </View>
      <ResistanceTabs />
    </View>
  );
};

export default Monster;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  hp: {
    flex: 1,
    textAlign: `center`,
    fontSize: 48,
    marginVertical: 2,
  },
});
