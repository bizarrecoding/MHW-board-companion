import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { setRollPool } from "../../util/redux/RollSlice";
import { RootState } from "../../util/redux/store";
import Divider from "../Divider";
import NumberInput from "../NumberInput";
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
      <NumberInput label="# of dices of 1:" setValue={setDice1}>
        <Text variant="subtitle" style={styles.counter}>
          {dice1}
        </Text>
      </NumberInput>
      <NumberInput label="# of dices of 2:" setValue={setDice2}>
        <Text variant="subtitle" style={{ flex: 1, textAlign: `center` }}>
          {dice2}
        </Text>
      </NumberInput>
      <NumberInput label="# of dices of 3:" setValue={setDice3}>
        <Text variant="subtitle" style={{ flex: 1, textAlign: `center` }}>
          {dice3}
        </Text>
      </NumberInput>
      <NumberInput label="# of dices of 4:" setValue={setDice4}>
        <Text variant="subtitle" style={{ flex: 1, textAlign: `center` }}>
          {dice4}
        </Text>
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
  counter: {
    flex: 1,
    textAlign: `center`,
  },
});
