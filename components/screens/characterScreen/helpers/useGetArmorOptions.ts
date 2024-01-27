import type { ItemData } from "../../../Dropdown";
import type { ArmorPiece } from "../ICharacter";

const armorListHead: ArmorPiece[] = require(`../../../../storage/armor-head.json`);
const armorListChest: ArmorPiece[] = require(`../../../../storage/armor-chest.json`);
const armorListArms: ArmorPiece[] = require(`../../../../storage/armor-arms.json`);
const armorListWaist: ArmorPiece[] = require(`../../../../storage/armor-waist.json`);
const armorListLegs: ArmorPiece[] = require(`../../../../storage/armor-legs.json`);

export const mapArmorToOptions = (equipmentList: ArmorPiece[]): ItemData[] => {
  return equipmentList.map((item) => ({
    label: item.name,
    value: item.id,
  }));
};

const useGetArmorOptions = () => {
  const optionsHead = mapArmorToOptions(armorListHead);
  const optionsChest = mapArmorToOptions(armorListChest);
  const optionsArms = mapArmorToOptions(armorListArms);
  const optionsWaist = mapArmorToOptions(armorListWaist);
  const optionsLegs = mapArmorToOptions(armorListLegs);

  return {
    optionsHead,
    optionsChest,
    optionsArms,
    optionsWaist,
    optionsLegs,
    armorListHead,
    armorListChest,
    armorListArms,
    armorListWaist,
    armorListLegs,
  };
};

export default useGetArmorOptions;
