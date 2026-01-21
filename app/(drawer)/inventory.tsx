import { DrawerToggleButton } from "@react-navigation/drawer";
import Drawer from "expo-router/drawer";
import React from "react";
import { useColorScheme } from "react-native";

import InventoryLog from "../../components/inventory/InventoryLog";
import Colors from "../../constants/Colors";

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
