import React from "react";
import { ImageStyle, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";

import { MonsterKind, Ranks, RankType } from "../../../assets/data/types";
import { MonsterIcon } from "../../InventoryIcon";
import { SelectInput } from "../../SelectInput";
import { Text, View } from "../../Themed";

const Monsters: MonsterKind[] = [
  `Barroth`,
  `Pukei-Pukei`,
  `Jyuratodus`,
  `Diablos`,
  `Black Diablos`,
];

type StoryPickerProps = {
  setMonster: React.Dispatch<React.SetStateAction<MonsterKind | undefined>>;
  setRank: React.Dispatch<React.SetStateAction<RankType>>;
};

const StoryPicker: React.FC<StoryPickerProps> = ({ setMonster, setRank }) => {
  const width = useWindowDimensions().width;
  const columnSize = width / 2 - 16;
  const styleOverride: ImageStyle = {
    width: width / 3,
    height: width / 3,
    borderColor: `#0000`,
  };
  return (
    <View style={styles.container}>
      <Text>Choose a monster to start your story in:</Text>
      <SelectInput<RankType> data={Ranks} setValue={setRank} />
      <View style={{ flexDirection: `row`, flexWrap: `wrap` }}>
        {Monsters.map((monster) => (
          <TouchableOpacity
            key={monster}
            onPress={() => setMonster(monster)}
            disabled={monster !== `Barroth`}
            style={{ width: columnSize, alignItems: `center`, marginVertical: 20 }}
          >
            <MonsterIcon
              noRank={monster === `Barroth`}
              rank={monster === `Barroth` ? undefined : `failed`}
              type={monster}
              style={styleOverride}
              disabled={monster !== `Barroth`}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default StoryPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: `center`,
    justifyContent: `center`,
  },
});
