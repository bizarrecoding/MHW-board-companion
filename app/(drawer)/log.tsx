import { DrawerToggleButton } from "@react-navigation/drawer";
import Drawer from "expo-router/drawer";
import { useColorScheme } from "react-native";

import { HunterLog } from "../../components/screens/drawer/HunterLog";
import Colors from "../../constants/Colors";

export default function HunterLogScreen() {
  const colorScheme = useColorScheme();
  const { background, tint } = Colors[colorScheme ?? `light`];
  return (
    <>
      <Drawer.Screen
        options={{
          title: `Hunting Log`, // <== NEW EDIT HERE
          headerShown: true,
          headerStyle: {
            backgroundColor: background,
            shadowColor: colorScheme === `dark` ? `transparent` : undefined,
          },
          headerLeft: () => <DrawerToggleButton tintColor={tint} />,
        }}
      />
      <HunterLog />
    </>
  );
}
