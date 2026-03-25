import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../Themed";

type EquipEffectsProps = {
  effects: string;
};

const EquipEffects: React.FC<EquipEffectsProps> = ({ effects }) => {
  const lines = effects.split("\n");
  return (
    <>
      <Text bold style={styles.titleLabel}>
        EFFECTS
      </Text>
      <View>
        {lines.map((line) => {
          if (!line) return null;
          const [skill, rest] = line.split(":");
          return (
            <Text key={skill} style={styles.effects}>
              <Text bold style={styles.effects}>
                {skill}
              </Text>
              :{rest}
            </Text>
          );
        })}
      </View>
    </>
  );
};

export default EquipEffects;

const styles = StyleSheet.create({
  titleLabel: {
    textAlign: "center",
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 4,
    marginTop: 12,
  },
  effects: {
    fontSize: 14,
    marginBottom: 4,
  },
});
