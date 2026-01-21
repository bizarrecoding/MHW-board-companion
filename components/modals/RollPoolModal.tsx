import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { setRollPool } from "../../util/redux/RollSlice";
import { RootState } from "../../util/redux/store";
import Divider from "../Divider";
import NumberInput from "../Rolls/DiceNumberInput";
import { View, Text, Button } from "../Themed";
import { commonStyles } from "../themed/styles";
import { useThemeColor } from "../themed/useThemeColor";

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
      <Text style={styles.caption}>The pool is used to calculate the number of times a value will appear in the roll</Text>
      <View style={styles.totalDrawsContainer}>
        <Text style={styles.caption}>Total draws until sharpen: </Text>
        <Text bold style={styles.totalDraws}>{dice1 + dice2 + dice3 + dice4}</Text>
      </View>
      <View style={styles.configRow}>
        <DiceController dice={dice1} face={1} setDice={setDice1} />
        <DiceController dice={dice2} face={2} setDice={setDice2} />
      </View>
      <View style={styles.configRow}>
        <DiceController dice={dice3} face={3} setDice={setDice3} />
        <DiceController dice={dice4} face={4} setDice={setDice4} />
      </View>
      <Divider />
      <View style={{ flex: 1 }}>
        <Button title="Save changes" onPress={saveRollPool} />
      </View>
    </View>
  );
};

const DiceController = ({ dice, setDice, face }: { dice: number, setDice: React.Dispatch<React.SetStateAction<number>>, face: number }) => {
  const accentColor = useThemeColor({}, `accent`);
  const backgroundColor = useThemeColor({}, `card`);
  const borderColor = useThemeColor({}, `cardBorder`);
  const bgAdd = `${accentColor}88`;
  const bgSub = `#8884`;
  return (
    <View style={[styles.configCard, { backgroundColor, borderColor }]}>
      <Text variant="subtitle" style={styles.faceAmount}>{dice}</Text>
      <Text variant="button">Face {face}:</Text>
      <View style={styles.controlRow}>
        <TouchableOpacity onPress={() => setDice(dice - 1)} style={[styles.controlButton, { backgroundColor: bgSub }]}>
          <Text variant="button">-</Text>
        </TouchableOpacity>
        <View style={{ width: 1, height: '100%', backgroundColor: '#8884' }} />
        <TouchableOpacity onPress={() => setDice(dice + 1)} style={[styles.controlButton, { backgroundColor: bgAdd }]}>
          <Text variant="button">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  totalDrawsContainer: {
    ...commonStyles.row,
    ...commonStyles.card,
    justifyContent: 'center',
    margin: 16,
  },
  totalDraws: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  caption: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  configRow: {
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
  configCard: {
    ...commonStyles.card,
    ...commonStyles.shadows,
    overflow: "hidden",
    padding: 0,
    alignItems: "center",
    flex: 1,
  },
  faceAmount: {
    fontSize: 48,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  controlRow: {
    ...commonStyles.row,
    borderTopWidth: 1,
    borderTopColor: `#8883`,
    marginTop: 12,
  },
  controlButton: {
    ...commonStyles.center,
    minHeight: 32
  },
});
