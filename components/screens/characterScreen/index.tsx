import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import Equipment from './Equipment';
import ProfilePicker from './ProfilePicker';
import { HunterProfile } from './character';
import { Dropdown } from '../../Dropdown/Dropdown';
import { View } from '../../Themed';

const testProfile: HunterProfile = require(`../../../storage/hunter.json`);

const dummyData = [
  { label: `test`, value: `0` },
  { label: `test1`, value: `1` },
  { label: `test2`, value: `2` },
  { label: `test3`, value: `3` },
  { label: `test4`, value: `4` },
  { label: `test5`, value: `5` },
];

export default function CharacterScreen() {
  const [playerProfile, setPlayerProfile] = useState<HunterProfile | null>(
    null,
  );

  const onProfileSelection = () => {
    // alert(`Selected Profile: \n ${testProfile.name}`);
    setPlayerProfile(testProfile);
  };

  const onDropdownSelect = (item: (typeof dummyData)[number]) => {
    console.log(`🚀 ~ onDropdownSelect ~ item:`, item);
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
      <Dropdown
        title="Modal title"
        options={dummyData}
        onPressCancel={undefined}
        onPressConfirm={onDropdownSelect}
      />
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
