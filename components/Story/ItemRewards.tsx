import { StyleProp, ViewStyle, View, StyleSheet } from "react-native";
import { ItemList } from "../../assets/data/items";
import { ItemEntry } from "../../assets/data/types";
import InventoryIcon from "../InventoryIcon";
import { Text } from "../Themed";

const getFromRoll = (roll: string[]) => {
  const rand = Math.floor(Math.random() * roll.length);
  return roll[rand];
};

type ItemRewardsProps = {
  rewards?: string[];
  roll?: string[];
  style?: StyleProp<ViewStyle>;
};

const ItemRewards: React.FC<ItemRewardsProps> = ({ rewards, roll, style }) => {
  if (!rewards?.length && !roll?.length) return null;

  const rewardsList = rewards?.length ? [...rewards] : [];
  console.log("rewardsList", rewardsList);
  if (roll?.length) rewardsList.push(getFromRoll(roll));
  return (
    <>
      <Text variant="caption" style={{ letterSpacing:2, marginVertical: 10 }}>
        REWARDS:
      </Text>
      <View style={[styles.row, styles.center, style]}>
        {rewardsList.map((item, _index) => {
          const entry = ItemList.find((entry) => entry.name === item);
          console.log("entry", entry);
          if (!entry) return null;
          const { type, name } = entry as ItemEntry;
          return (
            <View key={item} style={[styles.center, styles.rewards]}>
              <InventoryIcon type={type} name={name} style={{ marginHorizontal: 16 }} />
              <Text style={{ marginTop: 10 }}>{item}</Text>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default ItemRewards;

const styles = StyleSheet.create({
  row: {
    marginBottom: 16,
    flexDirection: "row",
    gap: 12,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  rewards: {
    flex: 1,
    backgroundColor: `#8883`,
    borderColor: `#8888`,
    borderWidth: 1,
    padding: 16,
    borderRadius: 16,
  },
});
