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

const Monster = () => {
  //const data = useSegments();
  const [monster, _setMonster] = useState<MonsterKind>(`Barroth`);
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
          noRank
          type={monster}
          style={{ width: width / 3, height: width / 3, alignSelf: `center` }}
        />
        <View style={{ flexDirection: `row` }}>
          <View>
            <Text style={styles.title}>HP: 65/65</Text>
            <Text style={styles.title}>Head: 1</Text>
            <Text style={styles.title}>Legs: 0</Text>
          </View>
          <View>
            <Text style={styles.title}> </Text>
            <Text style={styles.title}>Front: 0</Text>
            <Text style={styles.title}>Tail: 1</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Monster;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
  },
});
