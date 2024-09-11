import { Drawer } from "expo-router/drawer";
import React, { useContext } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

import { MonsterIcon, MonsterIconKeys } from "../../components/InventoryIcon";
import { Button, Text } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { UserContext } from "../../context/UserContext";
import { useFireAuth } from "../../hooks/useFireAuth";

const getImageSource = (s: string | null = ``) => {
  if (s === null) return MonsterIconKeys[0];
  const key = s.length % MonsterIconKeys.length;
  return MonsterIconKeys[key];
};

const SideBarContent = () => {
  const colorScheme = useColorScheme();
  const { user } = useContext(UserContext);
  const { logout } = useFireAuth();
  const { background } = Colors[colorScheme ?? `light`];
  return (
    <View style={[style.container, { backgroundColor: background }]}>
      <View style={{ flex: 1 }}>
        <MonsterIcon noRank type={getImageSource(user?.email)} style={style.avatar} />
        <Text variant="caption">User:</Text>
        <Text variant="caption">{user?.email}</Text>
      </View>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default function MainDrawer() {
  return <Drawer drawerContent={SideBarContent} screenOptions={{ headerShown: false }} />;
}

const style = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  avatar: {
    margin: 30,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
