import type { ItemData } from "../../../Dropdown";
import type { WeaponPiece, WeaponTypes } from "../ICharacter";
import { Weapons } from "../ICharacter";

const weaponListHeavyBowgun: WeaponPiece[] = require(`../../../../storage/weapon-heavybowgun.json`);
const weaponListInsectGlaive: WeaponPiece[] = require(
  `../../../../storage/weapon-insectglaive.json`
);
const weaponListSwitchAxe: WeaponPiece[] = require(`../../../../storage/weapon-switchaxe.json`);
const weaponListChargeBlade: WeaponPiece[] = require(`../../../../storage/weapon-chargeblade.json`);

const capitalizeFirstLetter = (text: string) => {
  if (text.length === 0) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const parseWeaponValueToLabel = (value: string) => {
  const arr = value
    .split(`_`)
    .map((t) => capitalizeFirstLetter(t))
    .join(` `);
  return arr;
};

const getWeaponTypeOptions = () => {
  return Object.values(Weapons).map((weapon) => ({
    label: parseWeaponValueToLabel(weapon),
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
  const weaponTypeOptions = getWeaponTypeOptions();

  return {
    weaponTypeOptions,
    loadWeaponList,
  };
};

export default useGetWeaponOptions;
