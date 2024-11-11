import { FontAwesome } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Link } from "expo-router";
import Drawer from "expo-router/drawer";
import React from "react";
import { Pressable, useColorScheme } from "react-native";

import InventoryLog from "../../components/screens/drawer/InventoryLog";
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
          headerRight: () => (
            <Link href="/modal?type=item" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus"
                    size={25}
                    color={tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <InventoryLog />
    </>
  );
}
