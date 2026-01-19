import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { setRollPool } from "../../util/redux/RollSlice";
import { RootState } from "../../util/redux/store";
import Divider from "../Divider";
import NumberInput from "../Rolls/DiceNumberInput";
import { View, Text, Button } from "../Themed";

export const RollPoolModal = () => {
  const [d1, d2, d3, d4] = useSelector((state: RootState) => state.rolls.rollPool);
  const dispatch = useDispatch();
  const [dice1, setDice1] = useState(d1);
  const [dice2, setDice2] = useState(d2);
  const [dice3, setDice3] = useState(d3);
  const [dice4, setDice4] = useState(d4);
  const saveRollPool = () => {
    dispatch(setRollPool([dice1, dice2, dice3, dice4]));
    router.back();
  };
  return (
    <View style={styles.container}>
      <NumberInput setValue={setDice1}>
        <View style={{ alignItems: "center" }}>
          <Text variant="button"># of dices of 1:</Text>
          <Text variant="subtitle">{dice1}</Text>
        </View>
      </NumberInput>
      <NumberInput setValue={setDice2}>
        <View style={{ alignItems: "center" }}>
          <Text variant="button"># of dices of 2:</Text>
          <Text variant="subtitle">{dice2}</Text>
        </View>
      </NumberInput>
      <NumberInput setValue={setDice3}>
        <View style={{ alignItems: "center" }}>
          <Text variant="button"># of dices of 3:</Text>
          <Text variant="subtitle">{dice3}</Text>
        </View>
      </NumberInput>
      <NumberInput setValue={setDice4}>
        <View style={{ alignItems: "center" }}>
          <Text variant="button"># of dices of 4:</Text>
          <Text variant="subtitle">{dice4}</Text>
        </View>
      </NumberInput>
      <Divider />
      <View style={{ flex: 1 }}>
        <Button title="Save" onPress={saveRollPool} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
