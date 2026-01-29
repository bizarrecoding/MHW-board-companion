import { useGlobalSearchParams, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import Divider from "../components/Divider";
import { Text } from "../components/Themed";
import { InventoryEntryModal } from "../components/modals/InventoryEntryModal";
import { LogEntryModal } from "../components/modals/LogEntryModal";
import { MonsterModal } from "../components/modals/MonsterModal";
import { RecoverPassword } from "../components/modals/RecoverPassword";
import { Register } from "../components/modals/Register";
import { RollPoolModal } from "../components/modals/RollPoolModal";

type ModalType = `log` | `roll` | `item` | `register` | `recover` | `monster`;

const ModalTitleMap: Record<ModalType, string> = {
  log: `Log Entry`,
  roll: `Draw pool configuration`,
  item: `Add Inventory Entry`,
  register: `Register`,
  recover: `Recover Password`,
  monster: `Monster selection`,
};

export default function ModalScreen() {
  const navigation = useNavigation();
  const paddingTop = useSafeAreaInsets().top;
  const { type } = useGlobalSearchParams<{ type: ModalType }>();
  useEffect(() => {
    navigation.setOptions({
      title: ModalTitleMap[type] ?? type?.toUpperCase(),
    });
  }, [type, navigation]);

  if (type === `log`) return <LogEntryModal />;
  if (type === `roll`) return <RollPoolModal />;
  if (type === `item`) return <InventoryEntryModal />;
  if (type === `register`) return <Register />;
  if (type === `recover`) return <RecoverPassword />;
  if (type === `monster`) return <MonsterModal />;

  return (
    <View style={[styles.container, Platform.OS !== "ios" && { paddingTop }]}>
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
