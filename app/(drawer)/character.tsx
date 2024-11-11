import { DrawerToggleButton } from "@react-navigation/drawer";
import Drawer from "expo-router/drawer";
import React from "react";
import { useColorScheme } from "react-native";

import CharacterScreen from "../../components/screens/characterScreen";
import Colors from "../../constants/Colors";

export default function TabCharacterScreen() {
  const colorScheme = useColorScheme();
  const { background, tint } = Colors[colorScheme ?? `light`];
  return (
    <>
      <Drawer.Screen
        options={{
          title: `Character Profile`, // <== NEW EDIT HERE
          headerShown: true,
          headerStyle: {
            backgroundColor: background,
            shadowColor: colorScheme === `dark` ? `transparent` : undefined,
          },
          headerLeft: () => <DrawerToggleButton tintColor={tint} />,
        }}
      />
      <CharacterScreen />
    </>
  );
}
