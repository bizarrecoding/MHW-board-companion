import React from "react";
import { View } from "../../Themed";
import { useThemeColor } from "../../themed/useThemeColor";
import { BehaviorCardProps } from "./common";
import { useCardDimensions } from "./useCardDimensions";

const EmptyCard: React.FC<Pick<BehaviorCardProps, `hidden`>> = ({ hidden }) => {
  const { width, height } = useCardDimensions(hidden);
  const borderColor = useThemeColor({}, "outline");
  return (
    <View
      style={{
        width,
        height,
        borderColor,
        borderWidth: 1,
        borderStyle: `dashed`,
        borderRadius: width / 15,
        minHeight: hidden ? 200 : 350,
      }}
    />
  );
};

export default EmptyCard;
