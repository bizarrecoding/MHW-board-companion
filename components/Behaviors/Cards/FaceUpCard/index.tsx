import React from "react";
import { useWindowDimensions, StyleSheet, View } from "react-native";

import { Behavior } from "../../../../assets/data/types";
import { useThemeColor } from "../../../themed/useThemeColor";
import EmptyCard from "../EmptyCard";
import HiddenCard from "../HiddenCard";
import { cardStyles } from "../common";
import CardFooter from "../FaceUpCard/CardFooter";
import { CardHeader } from "../FaceUpCard/CardHeader";
import { CardContent } from "../FaceUpCard/CardContent";

type BehaviorCardProps = {
  behavior: Behavior | null;
  hidden?: boolean;
};

export const BehaviorCard: React.FC<BehaviorCardProps> = ({ behavior, hidden }) => {
  const { width: screenWidth } = useWindowDimensions();
  const width = screenWidth - 32;
  const borderColor = useThemeColor({}, `cardBorder`);
  const backgroundColor = useThemeColor({ light: "#FCA2", dark: "#FCA2" }, `card`);

  if (!behavior) return <EmptyCard hidden={hidden} />;
  if (hidden) return <HiddenCard behavior={behavior} />;

  return (
    <View
      style={[
        styles.cardContainer,
        cardStyles.shadows,
        {
          width,
          borderColor,
          backgroundColor,
        }
      ]}
    > 
      <CardHeader behavior={behavior} />
      <CardContent behavior={behavior} />
      <CardFooter behavior={behavior} />
    </View>
  );
};


const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    borderWidth: 2,
    padding: 16,
  },
  statsContainer: {
    gap: 12,
  },
  damageValueRow: {
    flexDirection: "row",
  },
  damageValue: {
    fontSize: 24,
    marginRight: 8,
  },
  horizontalStats: {
    flexDirection: "row",
    gap: 12,
  },
  panel: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
  },
  smallLabel: {
    fontSize: 9,
    letterSpacing: 2,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 20,
  },
});
