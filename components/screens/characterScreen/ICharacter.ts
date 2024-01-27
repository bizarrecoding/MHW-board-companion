import { Dispatch } from "react";

export type HunterProfile = {
  profile_id: string;
  name: string;
  equipment: {
    armor: {
      head: ArmorPiece | null;
      chest: ArmorPiece | null;
      arms: ArmorPiece | null;
      waist: ArmorPiece | null;
      legs: ArmorPiece | null;
    };
    weapon: {
      type: WeaponTypes;
      equipped: WeaponPiece | null;
    };
  };
  inventory: {
    potionHealth: number;
    potionStamina: number;
  };
  log: object;
};

export type PlayerCharacterArgs = {
  playerProfile: HunterProfile | null;
  setPlayerProfile: Dispatch<HunterProfile | null>;
};
export type ProfilePickerArgs = {
  profileName: string;
  onProfileSelection: () => void;
  isActiveSelect: boolean;
  showSelectModal: () => void;
};

export type IEquipment = {
  data: HunterProfile[`equipment`][`armor`] | null;
};

export type ArmorPiece = {
  id: string;
  name: string;
  defense: number;
  skills: any[];
};

export type WeaponPiece = {
  id: string;
  name: string;
  stats: {
    atkLvl1: number;
    atkLvl2: number;
    atkLvl3: number;
  };
};

export enum IsArmorType {
  NONE = ``,
  HEAD = `head`,
  CHEST = `chest`,
  ARMS = `arms`,
  WAIST = `waist`,
  LEGS = `legs`,
  WEAPON = `weapon`,
}

export enum WeaponTypes {
  INSECT_GLAIVE = `INSECT_GLAIVE`,
  BOWGUN = `BOWGUN`,
  SWITCHAXE = `SWITCHAXE`,
  GUN_LANCE = `GUN_LANCE`,
}
