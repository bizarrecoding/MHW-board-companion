import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import RollDisplay from "../../../components/Rolls/RollDisplay";
import SharpnessIndicator from "../../../components/Rolls/SharnessIndicator";
import { RootState } from "../../../util/redux/store";
import { RollControls } from "../../../components/Rolls/RollControls";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const { rollPool, total } = useSelector((state: RootState) => state.rolls);
  const paddingTop = useSafeAreaInsets().top;
  const [pool, setPool] = useState<number[]>([]);
  const [roll, setRoll] = useState<number[]>([]); 

  const reset = useCallback(() => {
    const pool = createDamagePool(rollPool);
    // Shuffle the pool
    setPool(pool.sort(() => Math.random() - 0.5));
    setRoll([]);
  }, [rollPool]);

  const rollDamage = (numberToRoll: number) => {
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
    <View style={[styles.container, { paddingTop }]}>
      <View style={{ flex: 1 }}>
        <SharpnessIndicator sharpness={pool.length} total={total} reset={reset} />
        <RollDisplay roll={roll} />
      </View>
      <RollControls rollDamage={rollDamage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
