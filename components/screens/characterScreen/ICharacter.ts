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

export type ArmorPiece = {
  id: string;
  name: string;
  defense: number;
  skills: unknown[];
  resistanceFire: number;
  resistanceIce: number;
  resistanceThunder: number;
  resistanceWater: number;
  resistanceDragon: number;
};

export enum Deviation {
  None = `none`,
  Low = `low`,
  Average = `average`,
  High = `high`,
}

export type WeaponPiece = {
  id: string;
  name: string;
  stats: {
    atkLvl1: number;
    atkLvl2: number;
    atkLvl3: number;
    atkLvl4: number;
  };
  defense: number;
  deviation: Deviation;
};

export enum ArmorTypes {
  HEAD = `head`,
  CHEST = `chest`,
  ARMS = `arms`,
  WAIST = `waist`,
  LEGS = `legs`,
}

export const Weapons = Object.freeze({
  INSECTGLAIVE: `insect_glaive`,
  HEAVYBOWGUN: `heavy_bowgun`,
  SWITCHAXE: `switch_axe`,
  CHARGEBLADE: `charge_blade`,
});
type WeaponsTyping = typeof Weapons;
export type WeaponTypes = ValueOf<WeaponsTyping>;

export const CharacterModalSelectOptions = Object.freeze({
  ...ArmorTypes,
  NONE: ``,
  PROFILE: `profile`,
  TYPE_WEAPON: `weapon_type`,
  WEAPON: `weapon`,
});
type OptionsTypes = typeof CharacterModalSelectOptions;
type ValueOf<T> = T[keyof T];
export type CharacterModalSelectTypes = ValueOf<OptionsTypes>;

export namespace ICharacterArgs {
  type ModalSelectionFnType = (selectType: CharacterModalSelectTypes) => void;
  export interface IProfilePicker {
    profileName: string;
    isActiveSelect: boolean;
    showSelectModal: ModalSelectionFnType;
    selectType: CharacterModalSelectTypes;
  }

  export interface IEquipment {
    data: HunterProfile[`equipment`];
    isSelectingType: CharacterModalSelectTypes;
    showSelectModal: ModalSelectionFnType;
  }

  export interface IEquipItem {
    label: string;
    isActiveSelect: boolean;
    selectedLabel?: string;
    showSelectModal: ModalSelectionFnType;
    equipType: Exclude<CharacterModalSelectTypes, ``>;
  }
}
