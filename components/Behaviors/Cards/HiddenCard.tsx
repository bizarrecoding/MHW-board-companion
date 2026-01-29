import { StyleSheet, View } from "react-native";
import { Orientation, useResponsiveWidth } from "../../../hooks/useResponsiveWidth";
import { commonStyles } from "../../themed/styles";
import TargetIcon from "../TargetIcon";
import { BehaviorCardProps } from "./common";

const HiddenCard: React.FC<Pick<BehaviorCardProps, `behavior` | `width`>> = ({ behavior, width = 400 }) => {
  const { width: screenWidth, orientation } = useResponsiveWidth();
  const baseWidth = orientation === Orientation.LANDSCAPE ? width : (screenWidth - 32); 
  const target = behavior?.target ?? `Melee`;
  return (
    <View style={[styles.cardWrapper, commonStyles.shadows, { width: baseWidth, minHeight: 150 }]}>
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
