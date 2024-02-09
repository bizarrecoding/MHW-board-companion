import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useGetArmorOptions from "./useGetArmorOptions";
import useGetProfileOptions from "./useGetProfileOptions";
import useGetWeaponOptions from "./useGetWeaponOptions";
import {
  changeEquipmentItem,
  // enableSaveProfile,
  changeProfile,
  changeWeaponEquipped,
  changeWeaponType,
} from "../../../../util/redux/CharacterSlice";
import { RootState } from "../../../../util/redux/store";
import type { SelectedItemReturnType } from "../../../Dropdown";
import {
  ArmorTypes,
  CharacterModalSelectOptions as SelectOptions,
  CharacterModalSelectTypes,
  Weapons,
  WeaponTypes,
} from "../ICharacter";

const useManageCharacter = () => {
  const character = useSelector((state: RootState) => state.character);

  const equippedTypeWeapon = character.profile.equipment.weapon.type;
  const dispatch = useDispatch();
  const [isSelectingType, setIsSelectingType] = useState<CharacterModalSelectTypes>(
    SelectOptions.NONE
  );

  const [isFocusedItem, setIsFocusedItem] = useState<SelectedItemReturnType>(null);

  const { profileList } = useGetProfileOptions();
  const { armorListHead, armorListChest, armorListArms, armorListWaist, armorListLegs } =
    useGetArmorOptions();
  const { loadWeaponList, weaponTypeOptions } = useGetWeaponOptions();
  const { weaponList, weaponOptions } = loadWeaponList(equippedTypeWeapon ?? Weapons.INSECTGLAIVE);

  const showSelectModal = (selectOption: CharacterModalSelectTypes) => {
    setIsSelectingType(selectOption);
  };

  const hideSelectModal = () => {
    setIsSelectingType(SelectOptions.NONE);
  };

  const onPressConfirm = () => {
    switch (isSelectingType) {
      case SelectOptions.PROFILE:
        if (isFocusedItem) {
          dispatch(changeProfile(profileList[isFocusedItem.indexArray]));
          // dispatch(enableSaveProfile(false));
        }
        break;
      case ArmorTypes.HEAD:
        if (isFocusedItem) {
          dispatch(
            changeEquipmentItem({
              itemType: ArmorTypes.HEAD,
              item: armorListHead[isFocusedItem.indexArray],
            })
          );
          // dispatch(enableSaveProfile(true));
        }
        break;
      case ArmorTypes.CHEST:
        if (isFocusedItem) {
          dispatch(
            changeEquipmentItem({
              itemType: ArmorTypes.CHEST,
              item: armorListChest[isFocusedItem.indexArray],
            })
          );
          // dispatch(enableSaveProfile(true));
        }
        break;
      case ArmorTypes.ARMS:
        if (isFocusedItem) {
          dispatch(
            changeEquipmentItem({
              itemType: ArmorTypes.ARMS,
              item: armorListArms[isFocusedItem.indexArray],
            })
          );
          // dispatch(enableSaveProfile(true));
        }
        break;
      case ArmorTypes.WAIST:
        if (isFocusedItem) {
          dispatch(
            changeEquipmentItem({
              itemType: ArmorTypes.WAIST,
              item: armorListWaist[isFocusedItem.indexArray],
            })
          );
          // dispatch(enableSaveProfile(true));
        }
        break;
      case ArmorTypes.LEGS:
        if (isFocusedItem) {
          dispatch(
            changeEquipmentItem({
              itemType: ArmorTypes.LEGS,
              item: armorListLegs[isFocusedItem.indexArray],
            })
          );
          // dispatch(enableSaveProfile(true));
        }
        break;
      case SelectOptions.TYPE_WEAPON:
        if (isFocusedItem) {
          const selectedType = isFocusedItem.value as WeaponTypes;
          dispatch(changeWeaponType(selectedType));
          // dispatch(enableSaveProfile(true));
        }
        break;
      case SelectOptions.WEAPON:
        if (isFocusedItem) {
          dispatch(changeWeaponEquipped(weaponList[isFocusedItem.indexArray]));
          // dispatch(enableSaveProfile(true));
        }
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

    setIsFocusedItem,
    weaponTypeOptions,
    weaponOptions,
  };
};

export default useManageCharacter;
