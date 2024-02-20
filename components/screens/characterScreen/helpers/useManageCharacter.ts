import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { PersistPartial } from "redux-persist/es/persistReducer";

import LoadArmorOptions from "./LoadArmorOptions";
import LoadProfileOptions from "./LoadProfileOptions";
import LoadWeaponOptions from "./LoadWeaponOptions";
import type { CharacterState } from "../../../../util/redux/CharacterSlice";
import {
  changeEquipmentItem,
  // enableSaveProfile,
  changeProfile,
  changeWeaponEquipped,
  changeWeaponType,
} from "../../../../util/redux/CharacterSlice";
import { RootState } from "../../../../util/redux/store";
import type { ItemData, SelectedItemReturnType } from "../../../Dropdown";
import {
  ArmorTypes,
  CharacterModalSelectOptions as SelectOptions,
  CharacterModalSelectTypes,
  Weapons,
  WeaponTypes,
} from "../ICharacter";

const {
  armorListHead,
  armorListChest,
  armorListArms,
  armorListWaist,
  armorListLegs,
  ...armorOptions
} = LoadArmorOptions();
const { profileList, optionsProfile } = LoadProfileOptions();
const { GetWeaponList, weaponTypeOptions } = LoadWeaponOptions();

export const useManageCharacter = () => {
  const character = useSelector((state: RootState) => state.character);
  const equippedTypeWeapon = character.profile.equipment.weapon.type;

  const dispatch = useDispatch();
  const [isSelectingType, setIsSelectingType] = useState<CharacterModalSelectTypes>(
    SelectOptions.NONE
  );

  const { weaponList, weaponOptions } = useMemo(
    () => GetWeaponList(equippedTypeWeapon ?? Weapons.INSECTGLAIVE),
    [equippedTypeWeapon]
  );
  const optionLists: Record<string, ItemData[]> = {
    ...armorOptions,
    optionsProfile,
    weaponTypeOptions,
    weaponOptions,
  };

  const renderListValues = getRenderListValues({
    isSelectingType,
    character,
    optionLists,
  });

  const showSelectModal = (selectOption: CharacterModalSelectTypes) => {
    setIsSelectingType(selectOption);
  };

  const hideSelectModal = () => {
    setIsSelectingType(SelectOptions.NONE);
  };

  const onPressConfirm = (isFocusedItem: SelectedItemReturnType) => {
    if (isFocusedItem === null) return;
    switch (isSelectingType) {
      case SelectOptions.PROFILE:
        dispatch(changeProfile(profileList[isFocusedItem.indexArray]));
        // dispatch(enableSaveProfile(false));
        break;
      case ArmorTypes.HEAD:
        dispatch(
          changeEquipmentItem({
            itemType: ArmorTypes.HEAD,
            item: armorListHead[isFocusedItem.indexArray],
          })
        );
        // dispatch(enableSaveProfile(true));
        break;
      case ArmorTypes.CHEST:
        dispatch(
          changeEquipmentItem({
            itemType: ArmorTypes.CHEST,
            item: armorListChest[isFocusedItem.indexArray],
          })
        );
        // dispatch(enableSaveProfile(true));
        break;
      case ArmorTypes.ARMS:
        dispatch(
          changeEquipmentItem({
            itemType: ArmorTypes.ARMS,
            item: armorListArms[isFocusedItem.indexArray],
          })
        );
        // dispatch(enableSaveProfile(true));
        break;
      case ArmorTypes.WAIST:
        dispatch(
          changeEquipmentItem({
            itemType: ArmorTypes.WAIST,
            item: armorListWaist[isFocusedItem.indexArray],
          })
        );
        // dispatch(enableSaveProfile(true));

        break;
      case ArmorTypes.LEGS:
        dispatch(
          changeEquipmentItem({
            itemType: ArmorTypes.LEGS,
            item: armorListLegs[isFocusedItem.indexArray],
          })
        );
        // dispatch(enableSaveProfile(true));
        break;
      case SelectOptions.TYPE_WEAPON: {
        const selectedType = isFocusedItem.value as WeaponTypes;
        dispatch(changeWeaponType(selectedType));
        // dispatch(enableSaveProfile(true));
        break;
      }
      case SelectOptions.WEAPON:
        dispatch(changeWeaponEquipped(weaponList[isFocusedItem.indexArray]));
        // dispatch(enableSaveProfile(true));
        break;
      default:
        break;
    }
  };

  return {
    character,
    isSelectingType,
    showSelectModal,
    hideSelectModal,
    onPressConfirm,

    weaponTypeOptions,
    weaponOptions,

    renderListValues,
  };
};

type IRenderListProps = {
  isSelectingType: CharacterModalSelectTypes;
  character: CharacterState & PersistPartial;
  optionLists: Record<string, ItemData[]>;
};
type IRenderListReturnType = null | {
  listOptions: ItemData[];
  value: string | undefined;
};

const getRenderListValues = ({
  isSelectingType,
  character,
  optionLists,
}: IRenderListProps): IRenderListReturnType => {
  const {
    armor: {
      head: equippedHead,
      chest: equippedChest,
      arms: equippedArms,
      waist: equippedWaist,
      legs: equippedLegs,
    },
    weapon: { type: equippedTypeWeapon, equipped: equippedWeapon },
  } = character.profile.equipment;

  switch (isSelectingType) {
    case SelectOptions.PROFILE:
      return {
        listOptions: optionLists.optionsProfile,
        value: character.profile.profile_id,
      };
    case SelectOptions.HEAD:
      return {
        listOptions: optionLists.optionsHead,
        value: equippedHead?.id,
      };
    case SelectOptions.CHEST:
      return {
        listOptions: optionLists.optionsChest,
        value: equippedChest?.id,
      };
    case SelectOptions.ARMS:
      return {
        listOptions: optionLists.optionsArms,
        value: equippedArms?.id,
      };
    case SelectOptions.WAIST:
      return {
        listOptions: optionLists.optionsWaist,
        value: equippedWaist?.id,
      };
    case SelectOptions.LEGS:
      return {
        listOptions: optionLists.optionsLegs,
        value: equippedLegs?.id,
      };
    case SelectOptions.TYPE_WEAPON:
      return {
        listOptions: optionLists.weaponTypeOptions,
        value: equippedTypeWeapon ?? undefined,
      };
    case SelectOptions.WEAPON:
      return {
        listOptions: optionLists.weaponOptions,
        value: equippedWeapon?.id,
      };
    default:
      return null;
  }
};
