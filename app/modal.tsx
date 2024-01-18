import { useGlobalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import Divider from "../components/Divider";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { LogEntryModal } from "../components/modals/LogEntryModal";
import { RollPoolModal } from "../components/modals/RollPoolModal";

export default function ModalScreen() {
  const { type } = useGlobalSearchParams();
  if (type === `log`) return <LogEntryModal />;
  if (type === `roll`) return <RollPoolModal />;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal {type}</Text>
      <Divider />
      <EditScreenInfo path="app/modal.tsx" />

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
