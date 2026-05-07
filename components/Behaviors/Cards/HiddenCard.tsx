import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../../constants/Colors";
import { commonStyles } from "../../themed/styles";
import { useThemeColor } from "../../themed/useThemeColor";
import TargetIcon from "../TargetIcon";
import { BehaviorCardProps } from "./common";
import { useCardDimensions } from "./useCardDimensions";

const HiddenCard: React.FC<Pick<BehaviorCardProps, `behavior`>> = ({ behavior }) => {
  const { width } = useCardDimensions(true);
  const backgroundColor = useThemeColor({ light: Colors.light.secondaryFixedDim }, "onSecondary");
  const borderColor = useThemeColor({ light: Colors.light.secondaryFixed }, "onSecondaryFixedVariant");

  const target = behavior?.target ?? `Melee`;
  return (
    <View style={[styles.cardWrapper, commonStyles.shadows, { width, minHeight: 200, backgroundColor, borderColor }]}>
      <View style={styles.hiddenCardPattern} />
      <View style={styles.hiddenCardContent}>
        <TargetIcon target={target} style={{ width: 80, height: 80, borderRadius: 40 }} />
      </View>
    </View>
  );
};

export default HiddenCard;

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 24,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  hiddenCardContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  hiddenCardPattern: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderWidth: 3,
    backgroundColor: "#00000010",
    borderColor: "rgba(0,0,0,0.05)",
    borderRadius: 14,
    borderStyle: "dashed",
  },
});
