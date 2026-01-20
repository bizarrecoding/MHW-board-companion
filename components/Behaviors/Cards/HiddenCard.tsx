import { View, useWindowDimensions, StyleSheet } from "react-native";
import { BehaviorCardProps } from "./common";
import TargetIcon from "../TargetIcon";
import { commonStyles } from "../../themed/styles";

const HiddenCard: React.FC<Pick<BehaviorCardProps, `behavior`>> = ({ behavior }) => {
  const { width: screenWidth } = useWindowDimensions();
  const width = screenWidth - 32; 
  const target = behavior?.target ?? `Melee`;
  return (
    <View style={[styles.cardWrapper, commonStyles.shadows, { width, minHeight: 150 }]}>
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
