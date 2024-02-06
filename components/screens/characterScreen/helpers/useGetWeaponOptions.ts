import { useState } from "react";

import type { ItemData } from "../../../Dropdown";
import type { WeaponPiece, WeaponTypes } from "../ICharacter";
import { Weapons } from "../ICharacter";

const weaponListHeavyBowgun: WeaponPiece[] = require(`../../../../storage/weapon-heavybowgun.json`);
const weaponListInsectGlaive: WeaponPiece[] = require(
  `../../../../storage/weapon-insectglaive.json`
);
const weaponListSwitchAxe: WeaponPiece[] = require(`../../../../storage/weapon-switchaxe.json`);
const weaponListChargeBlade: WeaponPiece[] = require(`../../../../storage/weapon-chargeblade.json`);

// const formatEnumToLabel = (value: string) => { };

const getWeaponTypeOptions = () => {
  return Object.values(Weapons).map((weapon) => ({
    label: weapon.split(`_`).join(` `),
    value: weapon,
  }));
};
const mapWeaponToOptions = (equipmentList: WeaponPiece[]): ItemData[] => {
  return equipmentList.map((item) => ({
    label: item.name,
    value: item.id,
  }));
};

const loadWeaponList = (
  type: WeaponTypes
): {
  weaponOptions: ItemData[];
  weaponList: WeaponPiece[];
} => {
  switch (type) {
    case Weapons.HEAVYBOWGUN:
      return {
        weaponOptions: mapWeaponToOptions(weaponListHeavyBowgun),
        weaponList: weaponListHeavyBowgun,
      };

    case Weapons.INSECTGLAIVE:
      return {
        weaponOptions: mapWeaponToOptions(weaponListInsectGlaive),
        weaponList: weaponListInsectGlaive,
      };

    case Weapons.SWITCHAXE:
      return {
        weaponOptions: mapWeaponToOptions(weaponListSwitchAxe),
        weaponList: weaponListSwitchAxe,
      };

    case Weapons.CHARGEBLADE:
      return {
        weaponOptions: mapWeaponToOptions(weaponListChargeBlade),
        weaponList: weaponListChargeBlade,
      };

    default:
      return {
        weaponOptions: mapWeaponToOptions(weaponListInsectGlaive),
        weaponList: weaponListInsectGlaive,
      };
  }
};

const useGetWeaponOptions = () => {
  const [typeOfWeapon, setTypeOfWeapon] = useState<WeaponTypes>(Weapons.INSECTGLAIVE);
  const { weaponOptions, weaponList } = loadWeaponList(typeOfWeapon);
  const weaponTypeOptions = getWeaponTypeOptions();

  return {
    typeOfWeapon,
    setTypeOfWeapon,
    weaponTypeOptions,
    weaponOptions,
    weaponList,
  };
};

export default useGetWeaponOptions;
