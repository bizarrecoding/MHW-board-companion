import { useColorScheme } from "react-native";
import Colors from "../../../constants/Colors";
import { Orientation, useResponsiveWidth } from "../../../hooks/useResponsiveWidth";
import { View } from "../../Themed";
import { BehaviorCardProps } from "./common";

const EmptyCard: React.FC<Pick<BehaviorCardProps, `hidden` | `width`>> = ({ hidden, width = 400 }) => {
  const { width: screenWidth, orientation } = useResponsiveWidth();
  const baseWidth = orientation === Orientation.LANDSCAPE ? width : screenWidth - 32;
  const height = hidden ? baseWidth / 2 : baseWidth * 1.15;
  const scheme = useColorScheme();
  const { text: borderColor } = Colors[scheme ?? `light`];
  return (
    <View
      style={{
        width,
        height,
        borderColor,
        borderWidth: 1,
        borderStyle: `dashed`,
        borderRadius: baseWidth / 15,
      }}
    />
  );
};

export default EmptyCard;
