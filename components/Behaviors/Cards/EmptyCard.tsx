import { useColorScheme } from "react-native";
import Colors from "../../../constants/Colors";
import { View } from "../../Themed";
import { BehaviorCardProps } from "./common";
import { useCardDimensions } from "./useCardDimensions";

const EmptyCard: React.FC<Pick<BehaviorCardProps, `hidden`>> = ({ hidden }) => {
  const { width, height } = useCardDimensions(hidden); 
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
        borderRadius: width / 15,
        minHeight: hidden ? 200 : 350,
      }}
    />
  );
};

export default EmptyCard;
