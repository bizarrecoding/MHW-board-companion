import React from "react";
import { StyleSheet, View } from "react-native";

import { Behavior } from "../../../../assets/data/types";
import { Orientation, useResponsiveWidth } from "../../../../hooks/useResponsiveWidth";
import { commonStyles } from "../../../themed/styles";
import { useThemeColor } from "../../../themed/useThemeColor";
import EmptyCard from "../EmptyCard";
import { CardContent } from "../FaceUpCard/CardContent";
import CardFooter from "../FaceUpCard/CardFooter";
import { CardHeader } from "../FaceUpCard/CardHeader";
import HiddenCard from "../HiddenCard";

type BehaviorCardProps = {
  behavior: Behavior | null;
  hidden?: boolean;
};

export const BehaviorCard: React.FC<BehaviorCardProps> = ({ behavior, hidden }) => {
  const { width: screenWidth, orientation } = useResponsiveWidth();
  const width = orientation === Orientation.LANDSCAPE ? 400 : screenWidth - 32;
  const borderColor = useThemeColor({}, `cardBorder`);
  const backgroundColor = useThemeColor({ light: "#f5ebe7", dark: "#221B17" }, `card`);

  if (!behavior) return <EmptyCard hidden={hidden} width={width} />;
  if (hidden) return <HiddenCard behavior={behavior} width={width} />;

  return (
    <View
      style={[
        styles.cardContainer,
        {
          width: width - 12,
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
    ...commonStyles.shadows,
    ...commonStyles.card,
    borderRadius: 24,
    borderWidth: 2,
  },
});
