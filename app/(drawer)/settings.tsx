// import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import React, { useContext } from "react";
import { Alert, Platform, ScrollView, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { DrawerToggleButton } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Monsters } from "../../assets/data/types";
import { MonsterIcon } from "../../components/InventoryIcon";
import { Button, Text } from "../../components/Themed";
import { useThemeColor } from "../../components/themed/useThemeColor";
import { UserContext } from "../../context/UserContext";
import { useResponsiveWidth } from "../../hooks/useResponsiveWidth";
import { replaceLocalData } from "../../util/redux/LocalDataSlice";
import { ThemePreference, setProfileIcon, setTheme } from "../../util/redux/SettingsSlice";
import { RootState } from "../../util/redux/store";

type ThemeOptionProps = {
  label: string;
  value: ThemePreference;
};

const ThemeOption: React.FC<ThemeOptionProps> = ({ label, value }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.settings);
  const selected = value === theme;
  return (
    <Button
      full
      title={label}
      variant={selected ? "filled" : "outlined"}
      onPress={() => dispatch(setTheme(value))}
      style={{ marginHorizontal: Platform.OS !== "web" ? 4 : undefined }}
    />
  );
};

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const paddingTop = useSafeAreaInsets().top;
  const { width } = useResponsiveWidth();
  const { profileIcon } = useSelector((state: RootState) => state.settings);
  const { isGuest } = useContext(UserContext);
  const tintColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");
  const localData = useSelector((state: RootState) => state.localData);

  const handleExport = async () => {
    try {
      const Clipboard = require("expo-clipboard");
      if (!Clipboard) throw new Error("Cannot access clipboard");
      const dataString = JSON.stringify(localData);
      await Clipboard.setStringAsync(dataString);
      Alert.alert("Export Successful", "Data copied to clipboard!");
    } catch (error) {
      const message = (error as Error).message;
      Alert.alert("Export Failed", message ?? "Clipboard does not contain valid data.");
    }
  };

  const handleImport = async () => {
    try {
      const Clipboard = require("expo-clipboard");
      if (!Clipboard) throw new Error("Cannot access clipboard");
      const content = await Clipboard.getStringAsync();
      const parsed = JSON.parse(content);
      if (parsed.inventory && Array.isArray(parsed.inventory) && parsed.logs && Array.isArray(parsed.logs)) {
        dispatch(replaceLocalData(parsed));
        Alert.alert("Import Successful", "Data has been restored.");
      } else {
        throw new Error("Clipboard does not contain valid data.");
      }
    } catch (e) {
      const message = (e as Error).message;
      Alert.alert("Import Failed", message ?? "Clipboard does not contain valid data.");
    }
  };

  const sectionStyle: ViewStyle =
    Platform.OS === "web" ? { width, margin: "auto", marginVertical: 24 } : { flex: 1, marginHorizontal: 12 };

  return (
    <ScrollView style={style.container} contentContainerStyle={{ paddingTop }}>
      <DrawerToggleButton tintColor={tintColor} />
      <View style={[style.section, sectionStyle]}>
        <Text variant="title" style={style.sectionTitle}>
          Profile Icon
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style.iconList}>
          {Monsters.map((m) => (
            <TouchableOpacity
              key={m}
              onPress={() => dispatch(setProfileIcon(m))}
              style={[style.iconWrapper, { borderColor: profileIcon === m ? textColor : "transparent" }]}
            >
              <MonsterIcon noRank type={m} style={style.icon} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={[style.section, sectionStyle]}>
        <Text variant="title" style={style.sectionTitle}>
          Appearance
        </Text>
        <View style={style.optionsRow}>
          <ThemeOption label="Light" value="light" />
          <ThemeOption label="Dark" value="dark" />
          <ThemeOption label="System" value="system" />
        </View>
      </View>

      {isGuest && (
        <>
          <View style={[style.section, sectionStyle]}>
            <Text variant="title" style={style.sectionTitle}>
              Data Management
            </Text>
            <View style={style.optionsRow}>
              <Button full title="Export Data" onPress={handleExport} />
              <Button full title="Import Data" onPress={handleImport} />
            </View>
          </View>

          <View style={[style.section, sectionStyle]}>
            <Text variant="title" style={style.sectionTitle}>
              Account
            </Text>
            <Text style={{ marginBottom: 16 }}>
              You are currently using a guest account. Create an account to sync your data to the cloud.
            </Text>
            <Button title="Create Account / Sync" onPress={() => router.navigate("/")} />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#8882",
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  iconList: {
    flexDirection: "row",
  },
  iconWrapper: {
    borderWidth: 2,
    borderRadius: 40,
    padding: 4,
    marginRight: 12,
  },
  icon: {
    width: 60,
    height: 60,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
