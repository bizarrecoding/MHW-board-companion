import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { Button, View, Text } from "../../components/Themed";

const defaultValues = [5, 5];

/**
 *  Create a pool of numbers
 * @param {number[]} values i+1: multiplier value, values[i]: number of dices with that multiplier
 * @returns {number[]} unshuffled pool of damage counters - [1,2] => [1,2,2]
 */
const createDamagePool = (values: number[]) => {
  return values.reduce((acc, repetitions, damage) => {
    if (!repetitions) return acc;
    for (let i = 0; i < repetitions; i++) {
      // fill it with index+1, and push it to the accumulator
      acc.push(damage + 1);
    }
    return acc;
  }, [] as number[]);
};

export default function TabTwoScreen() {
  const [numberToRoll, setnumberToRoll] = useState(1);
  const [pool, setPool] = useState<number[]>([]);
  const [roll, setRoll] = useState<number[]>([]);
  const increment = () => setnumberToRoll((n) => (n < 10 ? n + 1 : n));
  const decrement = () => setnumberToRoll((n) => (n > 0 ? n - 1 : 0));

  const reset = () => {
    const pool = createDamagePool(defaultValues);
    // Shuffle the pool
    setPool(pool.sort(() => Math.random() - 0.5));
    setRoll([]);
  };

  const rollDamage = () => {
    if (pool.length < numberToRoll) {
      setRoll(pool);
      setPool([]);
    } else {
      // Take the first n elements from the pool
      setRoll(pool.slice(0, numberToRoll));
      // Remove the first n elements from the pool
      setPool(pool.slice(numberToRoll));
    }
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[styles.center_row, { minHeight: 500, flexDirection: `column` }]}
      >
        <Text variant="title">Rolls until Sharpen: {pool.length}</Text>
        <Text variant="title">roll:{JSON.stringify(roll)}</Text>
      </View>
      <View style={[styles.center_row, { marginVertical: 16 }]}>
        <Button title="-" style={styles.buttons} onPress={decrement} />
        <Text variant="subtitle">{numberToRoll}</Text>
        <Button title="+" style={styles.buttons} onPress={increment} />
      </View>
      <View style={{ flexDirection: `row` }}>
        <Button title="Roll" style={{ flex: 4 }} onPress={rollDamage} />
        <Button title="Sharpen" style={{ flex: 1 }} onPress={reset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center_row: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  buttons: {
    padding: 6,
  },
});