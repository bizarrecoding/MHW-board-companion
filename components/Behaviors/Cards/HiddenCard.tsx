import { StyleSheet, View } from "react-native";
import { commonStyles } from "../../themed/styles";
import TargetIcon from "../TargetIcon";
import { BehaviorCardProps } from "./common";
import { useCardDimensions } from "./useCardDimensions";

const HiddenCard: React.FC<Pick<BehaviorCardProps, `behavior`>> = ({ behavior }) => {
  const { width } = useCardDimensions(true);
  console.log("🚀 ~ HiddenCard ~ width:", width);
  const target = behavior?.target ?? `Melee`;
  return (
    <View style={[styles.cardWrapper, commonStyles.shadows, { width, minHeight: 200 }]}>
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
    borderColor: '#C85',
    backgroundColor: '#FCA',
    justifyContent: "center",
    alignItems: "center",
  },
  hiddenCardContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  hiddenCardPattern: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderWidth: 3,
    backgroundColor:"#00000010",
    borderColor: 'rgba(0,0,0,0.05)',
    borderRadius: 14,
    borderStyle: 'dashed',
  }
});
