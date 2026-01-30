import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React, { useContext } from "react";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Monsters as MonsterIconKeys } from "../../assets/data/types";
import { MonsterIcon } from "../../components/InventoryIcon";
import { Button, Text } from "../../components/Themed";
import { commonStyles } from "../../components/themed/styles";
import { useThemeColor } from "../../components/themed/useThemeColor";
import Colors from "../../constants/Colors";
import { build } from "../../constants/build";
import { UserContext } from "../../context/UserContext";
import { useFireAuth } from "../../hooks/useFireAuth";

const getImageSource = (s: string | null = ``) => {
  if (s === null) return MonsterIconKeys[0];
  const key = (s.length + 3) % MonsterIconKeys.length;
  return MonsterIconKeys[key];
};

const SideBarContent = () => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();
  const { user, isGuest } = useContext(UserContext);
  const { logout } = useFireAuth();
  return (
    <View style={[style.container, { backgroundColor, paddingTop, paddingBottom }]}>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={style.avatarCard}>
          <MonsterIcon noRank type={getImageSource(user?.email)} style={style.avatar} />
          <Text style={style.cardLabel}>User:</Text>
          <Text bold style={style.cardLabel}>
            {isGuest ? "Guest" : user?.email}
          </Text>
        </View>

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
          title="Inventory"
          icon="briefcase"
          onPress={() => router.navigate(`/(drawer)/inventory`)}
        />
        <DrawerItem
          title="Character"
          icon="address-book"
          onPress={() => router.navigate(`/(drawer)/character`)}
        />
      </View>
      <Button title="Logout" style={{ backgroundColor: "#8883" }} textStyle={{ color: textColor }} onPress={logout} />
      <Text style={{ padding: 16, alignSelf: "flex-end", fontSize: 12, color: "#888" }}>v{build}</Text>
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
  container: { flex: 1 },
  avatarCard: {
    ...commonStyles.card,
    alignItems: `center`,
    padding: 16,
    marginBottom: 24,
  },
  cardLabel: {
    fontSize: 18,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  drawerItem: {
    ...commonStyles.row,
    ...commonStyles.card,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
