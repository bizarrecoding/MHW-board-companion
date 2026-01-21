import React, { useCallback } from "react";
import {
  FlatList,
  ImageStyle,
  ListRenderItem,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ViewStyle,
} from "react-native";

import { MonsterKind, Monsters } from "../../assets/data/types";
import { MonsterIcon } from "../InventoryIcon";
import { Text } from "../Themed";
import { useThemeColor } from "../themed/useThemeColor";

type StoryPickerProps = React.PropsWithChildren<{
  setMonster: (monster: MonsterKind) => void;
  allowedChoices?: MonsterKind[];
  style?: StyleProp<ViewStyle>;
}>;

const StoryPicker: React.FC<StoryPickerProps> = ({
  setMonster,
  allowedChoices = Monsters,
  style,
  children,
}) => { 
  const textColor = useThemeColor({}, `text`);
  const width = useWindowDimensions().width;
  const columnSize = width / 2 - 28;

  const renderItem: ListRenderItem<MonsterKind> = useCallback(({ item }) => {
    const styleOverride: ImageStyle = {
      width: width / 3,
      height: width / 3,
      borderColor: `#0000`,
      marginBottom: 8,
    };
    const disabled = !allowedChoices.includes(item);
    return (
      <TouchableOpacity
        onPress={() => setMonster(item)}
        disabled={disabled}
        style={[styles.monsterCard, { width: columnSize, opacity: disabled ? 0.4 : 1 }]}
      >
        <MonsterIcon
          rank="none"
          type={item}
          style={styleOverride}
          disabled={disabled}
        />
        <Text style={[styles.monsterName, { color: disabled ? "#777" : textColor }]}>
          {item}
        </Text>
      </TouchableOpacity>
    )
  }, [allowedChoices, columnSize, setMonster, width, textColor]);

  return (
    <FlatList<MonsterKind>
      numColumns={2}
      data={Monsters}
      renderItem={renderItem}
      keyExtractor={(item) => item}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={[styles.container, style]}
      ListHeaderComponent={<>{children}</>}
    />
  );
};

export default StoryPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    alignItems: `center`,
    gap: 12,
  },
  monsterCard: {
    alignItems: `center`,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  monsterName: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
  },
});
