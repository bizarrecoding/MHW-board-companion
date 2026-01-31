import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import React, { useContext } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { DrawerToggleButton } from "@react-navigation/drawer";
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
    />
  )
};


export default function SettingsScreen() {
  const dispatch = useDispatch();
  const { width } = useResponsiveWidth();
  const { profileIcon } = useSelector((state: RootState) => state.settings);
  const { isGuest } = useContext(UserContext);
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const localData = useSelector((state: RootState) => state.localData);

  const handleExport = async () => {
    const dataString = JSON.stringify(localData);
    await Clipboard.setStringAsync(dataString);
    Alert.alert("Export Successful", "Data copied to clipboard!");
  };

  const handleImport = async () => {
    const content = await Clipboard.getStringAsync();
    try {
      const parsed = JSON.parse(content);
      if (parsed.inventory && Array.isArray(parsed.inventory) && parsed.logs && Array.isArray(parsed.logs)) {
        dispatch(replaceLocalData(parsed));
        Alert.alert("Import Successful", "Data has been restored.");
      } else {
        throw new Error("Invalid format");
      }
    } catch (e) {
      Alert.alert("Import Failed", "Clipboard does not contain valid data.");
    }
  };

  return (
    <ScrollView style={[style.container, { width }]}>
      <DrawerToggleButton tintColor={tintColor} />
      <View style={style.section}>
        <Text variant="title" style={style.sectionTitle}>Profile Icon</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style.iconList}>
          {Monsters.map((m) => (
            <TouchableOpacity
              key={m}
              onPress={() => dispatch(setProfileIcon(m))}
              style={[
                style.iconWrapper,
                { borderColor: profileIcon === m ? textColor : "transparent" }
              ]}
            >
              <MonsterIcon  noRank type={m} style={style.icon} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={style.section}>
        <Text variant="title" style={style.sectionTitle}>Appearance</Text>
        <View style={style.optionsRow}>
          <ThemeOption label="Light" value="light" />
          <ThemeOption label="Dark" value="dark" />
          <ThemeOption label="System" value="system" />
        </View>
      </View>

      {isGuest && (
        <>
          <View style={style.section}>
            <Text variant="title" style={style.sectionTitle}>Data Management</Text>
            <View style={style.optionsRow}>
              <Button full title="Export Data" onPress={handleExport} />
              <Button full title="Import Data" onPress={handleImport} />
            </View>
          </View>

          <View style={style.section}>
            <Text variant="title" style={style.sectionTitle}>Account</Text>
            <Text style={{ marginBottom: 16 }}>
              You are currently using a guest account. Create an account to sync your data to the cloud.
            </Text>
            <Button 
              title="Create Account / Sync" 
              onPress={() => router.navigate("/")} 
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: "auto"
  },
  section: {
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#8881",
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
