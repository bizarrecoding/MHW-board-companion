import React from "react";
import { StyleSheet } from "react-native";

import { View, Text, Button } from "./Themed";

type NumberInputProps = {
  label?: string;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
  min?: number;
  max?: number;
};

export default function NumberInput({
  label,
  setValue,
  children,
  min = 0,
  max = 10,
}: NumberInputProps) {
  const increment = () => setValue((n) => (n < max ? n + 1 : n));
  const decrement = () => setValue((n) => (n > min ? n - 1 : 0));
  return (
    <>
      {label ? (
        <Text variant="button" style={styles.inputLabel}>
          {label}
        </Text>
      ) : null}
      <View style={[styles.center_row, { marginVertical: 16 }]}>
        <Button title="-" style={styles.buttons} onPress={decrement} />
        {children}
        <Button title="+" style={styles.buttons} onPress={increment} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  center_row: {
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  inputLabel: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  buttons: {
    padding: 6,
  },
});
