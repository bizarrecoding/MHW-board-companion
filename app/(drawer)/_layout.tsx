import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React, { useContext } from "react";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";

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
        <Text variant="caption" style={{ marginBottom: 24 }}>
          {user?.email}
        </Text>

        <DrawerItem
          title="Hunt"
          icon="code-fork"
          onPress={() => router.navigate(`/(drawer)/(tabs)`)}
        />
        <DrawerItem
          title="Hunting log"
          icon="book"
          onPress={() => router.navigate(`/(drawer)/log`)}
        />
        <DrawerItem
          title="Character"
          icon="address-book"
          onPress={() => router.navigate(`/(drawer)/character`)}
        />
        <DrawerItem
          title="Inventory"
          icon="briefcase"
          onPress={() => router.navigate(`/(drawer)/inventory`)}
        />
      </View>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

type DrawerItemProps = {
  title: string;
  icon: React.ComponentProps<typeof FontAwesome>[`name`];
  onPress: () => void;
};

const DrawerItem: React.FC<DrawerItemProps> = ({ title, icon, onPress }) => {
  const colorScheme = useColorScheme();
  const { tint } = Colors[colorScheme ?? `light`];
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View style={style.drawerItem}>
          <View style={{ width: 40, alignItems: `center` }}>
            <FontAwesome
              name={icon}
              size={25}
              color={tint}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          </View>
          <Text variant="caption" style={{ opacity: pressed ? 0.5 : 1 }}>
            {title}
          </Text>
        </View>
      )}
    </Pressable>
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
  drawerItem: {
    flexDirection: `row`,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: `center`,
  },
});
