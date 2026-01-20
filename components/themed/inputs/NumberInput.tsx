import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from "react-native";
import Text from "../ThemedText";
import Button from "../ThemedButton";
import { useThemeColor } from "../useThemeColor";
import { commonStyles } from "../styles";
 

type NumberInputProps = {
  value?: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  min?: number;
  max?: number;
  style?: StyleProp<ViewStyle>;
};

export default function NumberInput({
  value=0,
  setValue, 
  min = 0,
  max = 10,
  style,
}: NumberInputProps) {
  const accent = useThemeColor({}, `accent`);
  const increment = () => setValue((n) => (n < max ? n + 1 : n));
  const decrement = () => setValue((n) => (n > min ? n - 1 : 0));
  return ( 
      <View style={[styles.center_row, style]}>
        <TouchableOpacity style={[styles.buttons, styles.left, { backgroundColor: accent, borderColor: accent }]} onPress={decrement}>
          <Text variant="button">-</Text>
        </TouchableOpacity>
        <Text variant="button" style={styles.inputLabel}>
          {value}
        </Text>
        <TouchableOpacity style={[styles.buttons, styles.right, { backgroundColor: accent, borderColor: accent }]} onPress={increment}>
          <Text variant="button">+</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  center_row: {
    ...commonStyles.row,
    ...commonStyles.center,
    backgroundColor: `#8883`,
    borderRadius: 12,
    borderWidth: 0,
  },
  inputLabel: { 
    paddingHorizontal: 12,
    textAlign: `center`,
    fontSize: 16,
    flex:2,
  },
  buttons: { 
    flex:1,
    padding: 6,
    minWidth: 24,
    borderWidth:1, 
    alignItems: `center`,
    justifyContent: `center`,
  },
  left: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  right: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});
