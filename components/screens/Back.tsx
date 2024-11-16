import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

import { useThemeColor } from "../themed/useThemeColor";

type BackProps = {
  onPress: () => void;
};

export const Back: React.FC<BackProps> = ({ onPress }) => {
  const color = useThemeColor({}, `accent`);
  return <MaterialIcons name="arrow-back-ios" size={24} color={color} onPress={onPress} />;
};
