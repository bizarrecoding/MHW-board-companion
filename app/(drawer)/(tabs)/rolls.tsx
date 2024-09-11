import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { WhetstoneIcon } from "../../../components/InventoryIcon";
import RollDisplay from "../../../components/RollDisplay";
import { Button, View, Text } from "../../../components/Themed";
import { RootState } from "../../../util/redux/store";

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
  const { rollPool } = useSelector((state: RootState) => state.rolls);
  const [numberToRoll, setNumberToRoll] = useState(1);
  const [pool, setPool] = useState<number[]>([]);
  const [roll, setRoll] = useState<number[]>([]);
  const increment = () => setNumberToRoll((n) => (n < 10 ? n + 1 : n));
  const decrement = () => setNumberToRoll((n) => (n > 0 ? n - 1 : 0));

  const reset = useCallback(() => {
    const pool = createDamagePool(rollPool);
    // Shuffle the pool
    setPool(pool.sort(() => Math.random() - 0.5));
    setRoll([]);
  }, [rollPool]);

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
  }, [reset, rollPool]);

  return (
    <View style={styles.container}>
      <View style={{ minHeight: 500, flexDirection: `column` }}>
        <Text variant="title" style={{ padding: 16, textAlign: `center` }}>
          Rolls until Sharpen: {pool.length}
        </Text>
        <View style={[styles.center_row, styles.container]}>
          <RollDisplay roll={roll} />
        </View>
      </View>
      <View style={[styles.center_row, { marginVertical: 16 }]}>
        <Button title="-" style={styles.buttons} onPress={decrement} />
        <Text variant="subtitle">{numberToRoll}</Text>
        <Button title="+" style={styles.buttons} onPress={increment} />
      </View>
      <View style={{ flexDirection: `row` }}>
        <Button title="Roll" style={{ flex: 4 }} onPress={rollDamage} />
        <WhetstoneIcon style={{ flex: 1 }} onPress={reset} />
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
