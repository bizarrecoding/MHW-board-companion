import { TouchableOpacity, StyleSheet } from "react-native";
import { ItemEntry } from "../../assets/data/types";
import InventoryIcon from "../InventoryIcon";
import { IconButton, Text } from "../Themed";

type InventoryItemProps = {
  item: ItemEntry;
  onPress: (item: ItemEntry, add?: boolean) => void;
  add?: boolean;
};

const InventoryItem: React.FC<InventoryItemProps> = ({ item, onPress, add }) => {
  const _onPress = () => onPress(item, add);
  return (
    <TouchableOpacity style={styles.itemWrapper} onPress={_onPress}>
      <InventoryIcon type={item.type} name={item.name} style={styles.icon} />
      <Text variant="caption" style={{ flex: 1 }}>
        {item.name}
      </Text>
      <IconButton icon={add ? `plus` : `minus`} variant="clear" onPress={_onPress} />
    </TouchableOpacity>
  );
};

export default InventoryItem;

const styles = StyleSheet.create({
  itemWrapper: {
    padding: 12,
    flexDirection: `row`,
    alignItems: `center`,
    backgroundColor: `#8883`,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  icon: {
    marginRight: 12,
  },
});
