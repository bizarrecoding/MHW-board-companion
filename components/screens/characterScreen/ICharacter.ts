import { Dispatch } from "react";

import { CharacterState } from "../../../util/redux/CharacterSlice";

export type HunterProfile = CharacterState;
// export type HunterProfile = {
//   profile_id: string;
//   name: string;
//   equipment: {
//     head: string;
//     chest: string;
//     arms: string;
//     waist: string;
//     legs: string;
//     weapon: string;
//   };
//   inventory: {
//     potionHealth: number;
//     potionStamina: number;
//   };
//   log: any;
// };
export type PlayerCharacterArgs = {
  playerProfile: HunterProfile | null;
  setPlayerProfile: Dispatch<HunterProfile | null>;
};
export type ProfilePickerArgs = PlayerCharacterArgs & {
  onProfileSelection: () => void;
};

export type IEquipment = {
  data: CharacterState[`equipment`] | null;
};

export type ArmorPiece = {
  id: string;
  name: string;
  defense: number;
  skills: any[];
};

export type EquipmentOrNull = ArmorPiece | null;

export enum IsArmorType {
  NONE = ``,
  HEAD = `head`,
  CHEST = `chest`,
  ARMS = `arms`,
  WAIST = `waist`,
  LEGS = `legs`,
  WEAPON = `weapon`,
}
