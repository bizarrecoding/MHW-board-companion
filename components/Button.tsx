import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";

export interface ButtonProps {
  label: string;
  theme?: `primary` | string;
  onPress?: (...args: any[]) => void;
  children?: any;
}

function Button({ label, theme = `primary`, onPress, children }: ButtonProps) {
  if (theme === `primary`) {
    return (
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={onPress ?? (() => alert(`clicked button`))}>
          {children ?? <Text style={[styles.buttonLabel, { color: `#25292e` }]}>{label}</Text>}
        </Pressable>
      </View>
    );
  }
}

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 80,
    height: 48,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: `#eee`,
    // marginHorizontal: 20,
    borderWidth: 1,
    // borderRadius: 10,
  },
  button: {
    width: `100%`,
    height: `100%`,
    alignItems: `center`,
    justifyContent: `center`,
    flexDirection: `row`,
  },
  buttonLabel: {
    color: `#fff`,
    fontSize: 16,
  },
});
