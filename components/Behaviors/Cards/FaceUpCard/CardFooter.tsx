import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useThemeColor } from "../../../themed/useThemeColor";
import { Text } from "../../../Themed";
import { Behavior } from "../../../../assets/data/types";

type FooterUnitProps = {
  icon: "users" | "bolt";
  label: string;
}

const FooterUnit: React.FC<FooterUnitProps> = ({ icon, label }) => {
  const textColor = useThemeColor({ light: `#444`, dark: `#888` }, `text`);  
  return (
    <View style={styles.footerUnit}>
      <FontAwesome name={icon} color={`${textColor}8`} size={14} />
      <Text style={[styles.footerText, { color: textColor }]}>{label}</Text>
    </View>
  );
};

type CardFooterProps = {
  behavior: Behavior;
}

const CardFooter: React.FC<CardFooterProps> = ({ behavior }) => {
  const borderColor = useThemeColor({}, `cardBorder`);
  return (
    <View style={[styles.footerRow, { borderTopColor: borderColor }]}>
      <FooterUnit icon="users" label={`${behavior.turns} TURNS`} />
      <View style={[styles.divider, { backgroundColor: borderColor }]} />
      <FooterUnit icon="bolt" label={`${behavior.actions} ACTIONS`} />
    </View>
  );
};

export default CardFooter;

const styles = StyleSheet.create({
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  footerUnit: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: "#888",
  },

  divider: {
    width: 1,
    height: 12,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginHorizontal: 20,
  },
});