import React from "react";
import { StyleSheet } from "react-native";

import { View } from "../../../components/Themed";
import CharacterScreen from "../../../components/screens/characterScreen";

export default function TabCharacterScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <CharacterScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: `80%`,
  },
});
