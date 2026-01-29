import { DrawerToggleButton } from "@react-navigation/drawer";
import Drawer from "expo-router/drawer";
import React from "react";
import { Platform, Pressable, StyleSheet, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FontAwesome } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import FloatingActionButton from "../../components/inventory/FloatingActionButton";
import InventoryLog from "../../components/inventory/InventoryLog";
import Colors from "../../constants/Colors";

export default function HunterLogScreen() {
  const colorScheme = useColorScheme();
  const { background, tint } = Colors[colorScheme ?? `light`];
  const paddingBottom = useSafeAreaInsets().bottom;
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
          headerRight: () => {
            if (Platform.OS !== "web") return null
            return (
              <Link href="/modal?type=item" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="plus"
                      size={24}
                      color={tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            )
          },
        }}
      />
      <InventoryLog />
      {Platform.OS === "web" ? null : (
        <FloatingActionButton icon="plus" size={56} style={[styles.fabPosition, { paddingBottom }]} onPress={() => {
          router.push(`/modal?type=item`);
        }} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  fabPosition: {
    position: `absolute`,
    bottom: 16,
    right: 16,
  },
});
