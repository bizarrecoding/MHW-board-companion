import React from "react";
import { Image, ImageBackground, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Ailments, Elements, EquipmentEntry, WeaponEntry } from "../../assets/data/types";
import { Text } from "../Themed";
import { commonStyles } from "../themed/styles";
import { useThemeColor } from "../themed/useThemeColor";
import { getArmorSource, getAttributeSource, getWeaponSource } from "./image_helpers";

const ICON_SIZE = 50;

type SetItemProps = {
  item: EquipmentEntry | WeaponEntry | null;
  style?: StyleProp<ViewStyle>;
  full?: boolean;
  onPress?: () => void;
};

const SetItem: React.FC<SetItemProps> = ({ item, style, onPress }) => {
  const cardColor = useThemeColor({}, `card`);
  const cardBorderColor = useThemeColor({}, `cardBorder`);
  const cardStyle = {
    backgroundColor: cardColor,
    borderColor: cardBorderColor,
  };
  if (!item) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.cardWrapper, cardStyle, style]}>
        <Text style={styles.pieceLabel}>Empty</Text>
      </TouchableOpacity>
    );
  }

  if (item.type === "weapon") {
    const deckTotal = item.dices.reduce((total, item) => total + item, 0);
    const avg = item.dices.reduce((acc, amount, index) => {
      if (amount === 0) return acc;
      return acc + ((index + 1) * amount) / deckTotal;
    }, 0);
    return (
      <TouchableOpacity onPress={onPress} style={[styles.cardWrapper, cardStyle, style]}>
        <View style={styles.equipmentBox}>
          <Image source={getWeaponSource(item.kind)} style={styles.weaponIcon} />
          <View style={styles.textStack}>
            <Text style={styles.pieceLabel}>{item.name}</Text>
            <Text style={styles.pieceLabel}>
              [{item.dices.join(`,`)}] ~{avg.toFixed(2)} Dmg
            </Text>
          </View>
          {item.def ? <ImageBox type="Defense" value={item.def} /> : null}
        </View>
        {item.effect ? <Text style={{ textAlign: "center" }}>{item.effect}</Text> : null}
      </TouchableOpacity>
    );
  }
  if (item.type === "armor") {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.cardWrapper, cardStyle, style]}>
        <View style={styles.equipmentBox}>
          <Image source={getArmorSource(item.kind)} style={styles.weaponIcon} />
          <View style={styles.textStack}>
            <Text style={styles.pieceLabel}>{item.name}</Text>
            {item.skill ? <Text style={{ textAlign: "center" }}>{item.skill}</Text> : null}
          </View>
          <View style={styles.defResBox}>
            <ImageBox type="Defense" value={item.def} />
            {item.res ? <ImageBox type={item.res.type} value={item.res.value} /> : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  return null;
};

type ImageBoxProps = {
  type: Elements | Ailments | "Defense";
  tintColor?: string;
  value?: number;
};

const ImageBox: React.FC<ImageBoxProps> = ({ type, tintColor, value }) => {
  return (
    <ImageBackground source={getAttributeSource(type)} style={styles.armorBox} tintColor={tintColor}>
      {value ? (
        <Text bold style={styles.armorValue}>
          {value}
        </Text>
      ) : null}
    </ImageBackground>
  );
};

export default SetItem;

const styles = StyleSheet.create({
  cardWrapper: {
    ...commonStyles.card,
    width: "50%",
    minHeight: 100,
    alignItems: `center`,
    justifyContent: `center`,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  pieceLabel: {
    flex: 1,
    fontWeight: `900`,
    textShadowColor: `rgba(0, 0, 0, 0.75)`,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  equipmentBox: {
    ...commonStyles.row,
    justifyContent: "space-between",
  },
  textStack: { alignItems: "center", marginHorizontal: 12 },
  weaponIcon: {
    width: ICON_SIZE - 16,
    height: ICON_SIZE - 16,
    marginEnd: 4,
  },
  defResBox: {
    ...commonStyles.row,
    justifyContent: `center`,
  },
  armorBox: {
    ...commonStyles.row,
    width: ICON_SIZE - 6,
    height: ICON_SIZE - 6,
    justifyContent: `center`,
  },
  armorValue: {
    fontSize: 18,
    color: `#eee`,
    textShadowColor: "#000",
    textShadowRadius: 4,
  },
});
