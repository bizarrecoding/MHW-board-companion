import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import { Link, Tabs } from "expo-router";
import React from "react";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../../constants/Colors";
import { useResponsiveWidth } from "../../../hooks/useResponsiveWidth";

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
  const width = useResponsiveWidth().width;
  const { background, tabIconSelected, tabIconDefault, tint, text } = Colors[colorScheme ?? `light`];
  const backgroundColor = colorScheme === `dark` ? background : `#fff`;
  return (
    <Tabs
      initialRouteName="Story"
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
        name="Story"
        options={{
          title: `Story`,
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Monster"
        options={{
          title: `Monster`,
          tabBarIcon: ({ color }) => <TabBarIcon name="bug" color={color} />,
          headerRight: () => (
            <Link href="/modal?type=monster" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="refresh"
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
      <Tabs.Protected guard={width < 700}>
        <Tabs.Screen
          name="Behaviors"
          options={{
            title: `Behaviors`,
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="header" color={color} />,
          }}
        />
      </Tabs.Protected>
      <Tabs.Screen
        name="rolls"
        options={{
          title: `Damage Rolls`,
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="dice" color={color} />,
        }}
      />
    </Tabs>
  );
}
