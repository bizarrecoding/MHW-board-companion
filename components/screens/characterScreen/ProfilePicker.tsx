import React from "react";
import { StyleSheet, TextInput } from "react-native";

// import { HunterProfile } from "./character";
import type { ProfilePickerArgs } from "./character";
import Button from "../../Button";
import { View, Text } from "../../Themed";

export default function ProfilePicker({ playerProfile, onProfileSelection }: ProfilePickerArgs) {
  return (
    <View style={styles.container}>
      <View>
        <Text>Hunter Name</Text>
        <View style={styles.loader}>
          <TextInput style={styles.input} value={playerProfile?.name ?? ``} />
          <Button label="test" onPress={onProfileSelection}>
            <Text>Load</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: `90%`,
  },
  loader: {
    flexDirection: `row`,
    justifyContent: `space-between`,
  },
  input: {
    backgroundColor: `#eee`,
    padding: 5,
    width: `70%`,
  },
});
