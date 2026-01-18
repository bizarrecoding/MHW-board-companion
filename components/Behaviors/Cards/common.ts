import { Behavior } from "../../../assets/data/types";
import { StyleSheet } from "react-native";

export type BehaviorCardProps = {
  behavior: Behavior | null;
  hidden?: boolean;
};


export const cardStyles = StyleSheet.create({
  shadows: {
    elevation: 10,
    shadowColor: "#000A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});