import React from "react";

import { PartCard } from "./PartCard";
import { PartsData } from "../../../assets/data/hunt";
import { View } from "../../Themed";

type MonsterPartsProps = {
  data: PartsData;
  onBreak: (part: keyof PartsData) => void;
};
const MonsterParts: React.FC<MonsterPartsProps> = ({ data, onBreak }) => {
  const { Head, Back, Legs, Tail } = data;
  console.log(`🚀 ~ data:`, data);
  return (
    <View style={{ flexDirection: `row`, paddingHorizontal: 12, paddingTop: 12 }}>
      <View style={{ flex: 1 }}>
        <PartCard type="Head" def={Head.def} breakRes={Head.breakRes} onBreak={onBreak} />
        <PartCard type="Back" def={Back.def} breakRes={Back.breakRes} onBreak={onBreak} />
      </View>
      <View style={{ flex: 1 }}>
        <PartCard type="Legs" def={Legs.def} breakRes={Legs.breakRes} onBreak={onBreak} />
        <PartCard type="Tail" def={Tail.def} breakRes={Tail.breakRes} onBreak={onBreak} />
      </View>
    </View>
  );
};

export default MonsterParts;
