
import { useWindowDimensions } from "react-native";
import { useColorScheme } from "react-native"; 
import { View } from "../../Themed";
import Colors from "../../../constants/Colors";
import { BehaviorCardProps } from "./common";

const EmptyCard: React.FC<Pick<BehaviorCardProps, `hidden`>> = ({ hidden }) => {
  const width = useWindowDimensions().width - 32;
  const height = hidden ? width / 2 : width*1.15;
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
      }}
    />
  );
};

export default EmptyCard;
