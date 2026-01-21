import React from "react";
import { View, StyleSheet } from "react-native";

import { Button } from "../Themed";
import { commonStyles } from "../themed/styles";

type NumberInputProps = {
  setValue: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
  min?: number;
  max?: number;
};

export default function NumberInput({
  setValue,
  children,
  min = 0,
  max = 10,
}: NumberInputProps) {
  const increment = () => setValue((n) => (n < max ? n + 1 : n));
  const decrement = () => setValue((n) => (n > min ? n - 1 : 0));
  return (
    <View style={styles.content}> 
      <Button title="-" style={styles.buttons} onPress={decrement} />
      {children}
      <Button title="+" style={styles.buttons} onPress={increment} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    ...commonStyles.row,
    ...commonStyles.card,
    justifyContent: `center`,
    paddingVertical: 6,
    marginVertical: 6,
    marginHorizontal: 16,
  },
  buttons: {
    padding: 6,
    minWidth: 60,
    borderRadius: 12,
  },
});
