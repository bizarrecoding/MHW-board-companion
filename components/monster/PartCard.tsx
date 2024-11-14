import React from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "../Themed";

type PartCardProps = {
  type: string;
  def: number;
  breakRes: number;
  location?: string;
};

export const PartCard: React.FC<PartCardProps> = ({ type, def, breakRes }) => {
  return (
    <>
      <Text style={[styles.title, { paddingLeft: 12 }]}>{type}</Text>
      <View style={styles.partCard}>
        <View style={[styles.part, styles.partIcon]} />

        <View style={[styles.part, styles.partDef]}>
          <Text style={styles.title}>{def}</Text>
        </View>
        <View style={[styles.part, styles.partBreak]}>
          <Text style={styles.title}>{breakRes}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  partCard: {
    flexDirection: `row`,
    padding: 12,
  },
  part: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  partIcon: {
    backgroundColor: `#F333`,
  },
  partDef: {
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: `#3F33`,
  },
  partBreak: {
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: `#33F3`,
  },
});
