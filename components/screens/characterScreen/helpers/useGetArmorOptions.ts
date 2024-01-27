import type { ItemData } from "../../../Dropdown";
import type { ArmorPiece } from "../character";

const armorListHead: ArmorPiece[] = require(`../../../storage/armor-head.json`);
const armorListChest: ArmorPiece[] = require(`../../../storage/armor-chest.json`);
const armorListArms: ArmorPiece[] = require(`../../../storage/armor-arms.json`);
const armorListWaist: ArmorPiece[] = require(`../../../storage/armor-waist.json`);
const armorListLegs: ArmorPiece[] = require(`../../../storage/armor-legs.json`);

// const weaponsList: ArmorPiece[] = require(`../../../storage/armor-legs.json`);

export const mapEquipmentToOptions = (equipmentList: ArmorPiece[]): ItemData[] => {
  return equipmentList.map((item) => ({
    label: item.name,
    value: item.id,
  }));
};

const useGetArmorOptions = () => {
  const optionsHead = mapEquipmentToOptions(armorListHead);
  const optionsChest = mapEquipmentToOptions(armorListChest);
  const optionsArms = mapEquipmentToOptions(armorListArms);
  const optionsWaist = mapEquipmentToOptions(armorListWaist);
  const optionsLegs = mapEquipmentToOptions(armorListLegs);

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
