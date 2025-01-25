import React from "react";
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ViewStyle,
} from "react-native";

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
  setMonster: (monster: MonsterKind) => void;
  setRank: (rank: RankType) => void;
  allowedChoices?: MonsterKind[];
  title?: string;
  style?: StyleProp<ViewStyle>;
};

const StoryPicker: React.FC<StoryPickerProps> = ({
  setMonster,
  setRank,
  allowedChoices = Monsters,
  title = `Choose a monster to start your story:`,
  style,
}) => {
  const width = useWindowDimensions().width;
  const columnSize = width / 2 - 16;
  const styleOverride: ImageStyle = {
    width: width / 3,
    height: width / 3,
    borderColor: `#0000`,
  };
  return (
    <View style={[styles.container, style]}>
      <Text>{title}</Text>
      <SelectInput<RankType> data={Ranks} setValue={setRank} />
      <View style={{ flexDirection: `row`, flexWrap: `wrap` }}>
        {Monsters.map((monster) => {
          const allowed = allowedChoices.includes(monster);
          return (
            <TouchableOpacity
              key={monster}
              onPress={() => setMonster(monster)}
              disabled={!allowed}
              style={{ width: columnSize, alignItems: `center`, marginVertical: 20 }}
            >
              <MonsterIcon
                noRank={!allowed}
                rank={allowed ? `none` : `failed`}
                type={monster}
                style={styleOverride}
                disabled={!allowed}
              />
            </TouchableOpacity>
          );
        })}
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
