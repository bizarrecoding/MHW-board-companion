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

export enum ArmorTypes {
  HEAD = `head`,
  CHEST = `chest`,
  ARMS = `arms`,
  WAIST = `waist`,
  LEGS = `legs`,
}

export enum WeaponTypes {
  INSECT_GLAIVE = `insect_glaive`,
  BOWGUN = `bowgun`,
  SWITCHAXE = `switchaxe`,
  GUN_LANCE = `gun_lance`,
}

export const CharacterModalSelectOptions = Object.freeze({
  ...ArmorTypes,
  NONE: ``,
  PROFILE: `profile`,
  WEAPON: `weapon`,
});
type OptionsTypes = typeof CharacterModalSelectOptions;
type ValueOf<T> = T[keyof T];
export type CharacterModalSelectTypes = ValueOf<OptionsTypes>;

export namespace ICharacterArgs {
  export interface IProfilePicker {
    profileName: string;
    isActiveSelect: boolean;
    showSelectModal: (selectType: CharacterModalSelectTypes) => void;
    selectType: CharacterModalSelectTypes;
  }

  export interface IEquipment {
    data: HunterProfile[`equipment`][`armor`] | null;
    isSelectingType: CharacterModalSelectTypes;
    showSelectModal: (armorType: ArmorTypes) => void;
  }

  export interface IEquipItem {
    label: string;
    isActiveSelect: boolean;
    selectedLabel?: string;
    showSelectModal: (armorType: ArmorTypes) => void;
    armorType: ArmorTypes;
  }
}
