import { FontAwesome } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Link } from "expo-router";
import Drawer from "expo-router/drawer";
import React from "react";
import { Pressable, useColorScheme, View, StyleSheet } from "react-native";

import InventoryLog from "../../components/inventory/InventoryLog";
import Colors from "../../constants/Colors";
import { Text } from "../../components/Themed";

export default function HunterLogScreen() {
  const colorScheme = useColorScheme();
  const { background, tint } = Colors[colorScheme ?? `light`];
  return (
    <>
      <Drawer.Screen
        options={{
          title: `Inventory`,
          headerShown: true,
          headerStyle: {
            backgroundColor: background,
            shadowColor: colorScheme === `dark` ? `transparent` : undefined,
          },
          headerLeft: () => <DrawerToggleButton tintColor={tint} />,
        }}
      />
      <InventoryLog />
    </>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    flexDirection: `row`,
    alignItems: `center`,
  },
  addBtnText: {
    fontSize: 16,
  },
  addBtnIcon: {
    marginRight: 12,
    marginLeft: 6,
  },
});