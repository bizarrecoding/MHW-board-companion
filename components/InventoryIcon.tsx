import { StyleSheet } from "react-native";

import { View } from "./Themed";

const ColorMap: Record<string, string> = {
  ore: `#888888`,
  shell: `#FF6666`,
  bone: `#66ff66`,
  wing: `#6666ff`,
  sac: `#6ff6f6`,
  mud: `#f66ff6`,
  fang: `#f6f66f`,
  horn: `#f88666`,
  scale: `#66f886`,
  fin: `#6686f8`,
  gem: `#EACA00`,
  tail: `#66f8f8`,
  claw: `#f88666`,
};

type InventoryIconProps = {
  type: string;
};

export default function InventoryIcon({ type }: InventoryIconProps) {
  return <View style={[styles.typeIcon, { backgroundColor: ColorMap[type] ?? `#888` }]} />;
}

const styles = StyleSheet.create({
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 60,
    marginRight: 16,
  },
});
