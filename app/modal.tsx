import { useGlobalSearchParams, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";

import Divider from "../components/Divider";
import { Text } from "../components/Themed";
import { InventoryEntryModal } from "../components/modals/InventoryEntryModal";
import { LogEntryModal } from "../components/modals/LogEntryModal";
import { MonsterModal } from "../components/modals/MonsterModal";
import { RecoverPassword } from "../components/modals/RecoverPassword";
import { Register } from "../components/modals/Register";
import { RollPoolModal } from "../components/modals/RollPoolModal";
import { useEffect } from "react";

export default function ModalScreen() {
  const navigation = useNavigation();
  const { type } = useGlobalSearchParams();
  useEffect(() => {
    const title = typeof type === `string` ? type : type?.join(" ");
    navigation.setOptions({
      title: title?.toUpperCase(),
    });
  }, [type]);

  if (type === `log`) return <LogEntryModal />;
  if (type === `roll`) return <RollPoolModal />;
  if (type === `item`) return <InventoryEntryModal />;
  if (type === `register`) return <Register />;
  if (type === `recover`) return <RecoverPassword />;
  if (type === `monster`) return <MonsterModal />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal {type}</Text>
      <Divider />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === `ios` ? `light` : `auto`} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },
  title: {
    fontSize: 20,
    fontWeight: `bold`,
  },
});
