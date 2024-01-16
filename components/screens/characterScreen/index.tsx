import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "../../Themed";

import ProfilePicker from "./ProfilePicker";
import Equipment from "./Equipment";
import { HunterProfile } from "./character";

const testProfile: HunterProfile = require("../../../storage/hunter.json");

export default function CharacterScreen() {
  const [playerProfile, setPlayerProfile] = useState<HunterProfile | null>(
    null
  );

  const onProfileSelection = () => {
    // alert(`Selected Profile: \n ${testProfile.name}`);
    setPlayerProfile(testProfile);
  };

  return (
    <View style={styles.container}>
      <View>
        <ProfilePicker
          {...{
            playerProfile,
            setPlayerProfile,
            onProfileSelection,
          }}
        />
      </View>
      <View>
        <Equipment {...{ playerProfile, setPlayerProfile }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    left: 10,
    backgroundColor: "black",
  },
});
