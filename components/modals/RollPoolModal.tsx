import React, { useState } from "react";
import { StyleSheet } from "react-native";

import Divider from "../Divider";
import { View, Text, Button } from "../Themed";

export const RollPoolModal = () => {
  const [dice1, setDice1] = useState(5);
  const [dice2, setDice2] = useState(5);
  const [dice3, setDice3] = useState(0);
  const [dice4, setDice4] = useState(0);
  return (
    <View style={styles.container}>
      <NumberInput label="1" setValue={setDice1}>
        <Text variant="subtitle" style={styles.counter}>
          {dice1}
        </Text>
      </NumberInput>
      <NumberInput label="2" setValue={setDice2}>
        <Text variant="subtitle" style={{ flex: 1, textAlign: `center` }}>
          {dice2}
        </Text>
      </NumberInput>
      <NumberInput label="3" setValue={setDice3}>
        <Text variant="subtitle" style={{ flex: 1, textAlign: `center` }}>
          {dice3}
        </Text>
      </NumberInput>
      <NumberInput label="4" setValue={setDice4}>
        <Text variant="subtitle" style={{ flex: 1, textAlign: `center` }}>
          {dice4}
        </Text>
      </NumberInput>
      <Divider />
      <Button title="Save" />
    </View>
  );
};

type NumberInputProps = {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
};

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  setValue,
  children,
}) => {
  const increment = () => setValue((n) => (n < 10 ? n + 1 : n));
  const decrement = () => setValue((n) => (n > 0 ? n - 1 : 0));
  return (
    <>
      <Text variant="button" style={styles.inputLabel}>
        # of dices of {label}:
      </Text>
      <View style={[styles.center_row, { marginVertical: 16 }]}>
        <Button title="-" style={styles.buttons} onPress={decrement} />
        {children}
        <Button title="+" style={styles.buttons} onPress={increment} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center_row: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  inputLabel: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  counter: {
    flex: 1,
    textAlign: `center`,
  },
  buttons: {
    padding: 6,
  },
});