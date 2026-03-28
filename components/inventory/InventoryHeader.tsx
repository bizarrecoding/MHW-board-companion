import React from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "../Themed";

type InventoryHeaderProps = {
  title: string;
};

const InventoryHeader: React.FC<InventoryHeaderProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text bold variant="subtitle" style={styles.capitalize}>
        {title.replace("_", " ")}
      </Text>
    </View>
  );
};

export default InventoryHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  capitalize: {
    textTransform: "capitalize",
  },
});
