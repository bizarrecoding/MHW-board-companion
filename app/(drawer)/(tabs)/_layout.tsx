import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import { Link, Tabs } from "expo-router";
import React from "react";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>[`name`] | `dice`;
  color: string;
}) {
  if (props.name === `dice`) {
    const { name, ...rest } = props;
    return <FontAwesome5 size={28} style={{ marginBottom: -3 }} name={name} {...rest} />;
  }
  // @ts-ignore
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { background, tabIconSelected, tabIconDefault, text, tint } =
    Colors[colorScheme ?? `light`];
  const backgroundColor = colorScheme === `dark` ? background : `#fff`;
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: tabIconSelected,
        tabBarInactiveTintColor: tabIconDefault,
        tabBarStyle: {
          backgroundColor,
          shadowColor: colorScheme === `dark` ? `transparent` : undefined,
          borderTopColor: colorScheme === `dark` ? `#6668` : undefined,
        },
        headerTitleStyle: {
          color: text,
        },
        headerStyle: {
          shadowColor: colorScheme === `dark` ? `transparent` : undefined,
          backgroundColor,
        },
      }}
    >
      <Tabs.Screen
        name="inventory"
        options={{
          title: `Inventory`,
          tabBarIcon: ({ color }) => <TabBarIcon name="briefcase" color={color} />,
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
      <Tabs.Screen
        name="character"
        options={{
          //href: null, // disabled until RNGestureHandler is fixed
          title: `Character`,
          tabBarIcon: ({ color }) => <TabBarIcon name="address-book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: `Hunting log`,
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          headerRight: () => (
            <Link href="/modal?type=log" asChild>
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
      <Tabs.Screen
        name="rolls"
        options={{
          title: `Damage Rolls`,
          tabBarIcon: ({ color }) => <TabBarIcon name="dice" color={color} />,
          headerRight: () => (
            <Link href="/modal?type=roll" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? `light`].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
