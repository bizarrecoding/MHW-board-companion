import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Equipment from "./Equipment";
import { HunterProfile } from "./ICharacter";
import ProfilePicker from "./ProfilePicker";
import { RootState } from "../../../util/redux/store";
import { View } from "../../Themed";

const testProfile: HunterProfile = require(`../../../storage/hunter.json`);

export default function CharacterScreen() {
  const character = useSelector((state: RootState) => state.character);
  const initPlayerCharacter = character ? ({ ...character } as HunterProfile) : null;
  const [playerProfile, setPlayerProfile] = useState<HunterProfile | null>(initPlayerCharacter);

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
        <Equipment {...{ data: character.equipment }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: `100%`,
    left: 10,
    backgroundColor: `black`,
  },
});
