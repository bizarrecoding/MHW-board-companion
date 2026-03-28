import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { skills } from "../../assets/data/reference";
import { Ailments, Elements } from "../../assets/data/types";
import { useResponsiveWidth } from "../../hooks/useResponsiveWidth";
import { RootState } from "../../util/redux/store";
import ResistanceIcon from "../monster/ResistanceIcon";
import { Text } from "../Themed";
import { commonStyles } from "../themed/styles";
import { useThemeColor } from "../themed/useThemeColor";
import EquipEffects from "./EquipEffects";
import SetItem from "./SetItem";

const PieceKind = ["weapon", "helm", "armor", "leggins"];

const Character: React.FC = () => {
  const width = useResponsiveWidth().width;
  const cardColor = useThemeColor({}, `card`);
  const cardBorderColor = useThemeColor({}, `cardBorder`);
  const cardStyle = {
    backgroundColor: cardColor,
    borderColor: cardBorderColor,
  };
  const { set } = useSelector((state: RootState) => state.character);
  //const set: SetEntry = [Weapons[0], Armors[9], Armors[16], Armors[14]]
  const effects = set.reduce((acc, item, _, array) => {
    if (!item) return acc;
    if (item.type === "armor" && item.skill) {
      const effect = item?.skill ? `${item.skill}: ${skills[item.skill]}` : null;
      if (item.set === true) {
        const [setName] = item.id.split("_");
        const armorPieces = array.filter((s) => s?.type === "armor");
        const setComplete = armorPieces.length === 3 && armorPieces.every((s) => s?.id.includes(setName));
        if (!setComplete) return acc;
      }
      return acc + effect + "\n";
    }
    return acc;
  }, "");

  const totals = set.reduce(
    (acc, item) => {
      if (!item) return acc;
      if (!acc?.Defense) acc.Defense = 0;
      if (item.def) acc.Defense += item.def;
      if (item.type === "armor" && item.res) {
        if (acc[item.res.type]) {
          acc[item.res.type] += item.res.value;
        } else {
          acc[item.res.type] = item.res.value;
        }
      }
      return acc;
    },
    {} as Record<Elements | Ailments | "Defense", number>
  );

  const onSetPiecePress = (type?: string, kind?: string) => {
    if (!type || !kind) return;
    router.push(`/modal?type=equipment&replace=${type}-${kind}`);
  };

  const isTablet = width > 425;

  return (
    <View style={[styles.container, { width }]}>
      <View style={[styles.header, cardStyle]}>
        <Text bold style={styles.titleLabel}>
          TOTAL
        </Text>
        <View style={styles.totals}>
          {Object.entries(totals).map(([key, value], index) => (
            <View key={index} style={styles.resistanceBox}>
              <Text bold style={styles.totalValue}>
                {value}
              </Text>
              <ResistanceIcon type={key as Elements | Ailments | "Defense"} />
            </View>
          ))}
        </View>
        {effects.length > 0 ? <EquipEffects effects={effects} /> : null}
      </View>
      <View style={[styles.list, isTablet && styles.listWrap]}>
        {set.map((armor, index) => {
          const type = armor?.type ?? (index === 0 ? "weapon" : "armor");
          const kind = armor?.kind ?? PieceKind[index % 4];
          console.log("🚀 ~ Character ~ type:", type, kind, "(", armor?.type, ")");
          return (
            <SetItem
              key={index}
              item={armor}
              onPress={() => onSetPiecePress(type, kind)}
              style={{ width: isTablet ? "48%" : "100%" }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Character;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    ...commonStyles.webCenter,
  },
  header: {
    minWidth: 300,
    alignItems: `center`,
    marginBottom: 10,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  totals: {
    flex: 1,
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
    ...commonStyles.row,
  },
  titleLabel: {
    textAlign: "center",
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 4,
    marginTop: 12,
  },
  totalValue: {
    fontSize: 36,
    fontWeight: `900`,
    fontVariant: [`tabular-nums`],
  },
  resistanceBox: {
    marginHorizontal: 8,
    ...commonStyles.row,
    justifyContent: "center",
  },
  list: {
    flex: 1,
    marginVertical: 12,
    gap: 12,
  },
  listWrap: {
    justifyContent: `center`,
    flexDirection: `row`,
    flexWrap: `wrap`,
  },
});
