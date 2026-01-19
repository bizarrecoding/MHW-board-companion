import React from "react";
import { View, StyleSheet } from "react-native";

import { Text, Button } from "../Themed";
import { FontAwesome5 } from "@expo/vector-icons";

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
    flexDirection: `row`,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: "#8883",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#888A",
    paddingVertical: 6,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  buttons: {
    padding: 6,
    minWidth: 60,
    borderRadius: 12,
  },
});
