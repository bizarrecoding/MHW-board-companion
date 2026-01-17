import React from "react";

import { PartCard } from "./PartCard";
import { PartsData } from "../../../assets/data/hunt";
import { View } from "react-native";

type MonsterPartsProps = {
  data: PartsData;
  onBreak: (part: keyof PartsData) => void;
};
const MonsterParts: React.FC<MonsterPartsProps> = ({ data, onBreak }) => {
  const { Head, Back, Legs, Tail } = data ?? {};
  return (
    <View style={{ flexDirection: `row`, paddingTop: 12 }}>
      <View style={{ flex: 1 }}>
        <PartCard type="Head" def={Head?.def ?? 0} breakRes={Head?.breakRes ?? 0} onBreak={onBreak} />
        <PartCard type="Back" def={Back?.def ?? 0} breakRes={Back?.breakRes ?? 0} onBreak={onBreak} />
      </View>
      <View style={{ flex: 1 }}>
        <PartCard type="Legs" def={Legs?.def ?? 0} breakRes={Legs?.breakRes ?? 0} onBreak={onBreak} />
        <PartCard type="Tail" def={Tail?.def ?? 0} breakRes={Tail?.breakRes ?? 0} onBreak={onBreak} />
      </View>
    </View>
  );
};

export default MonsterParts;
