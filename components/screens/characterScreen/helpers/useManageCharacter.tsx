import { useState } from "react";
import { useDispatch } from "react-redux";

import useGetArmorOptions from "./useGetArmorOptions";
import useGetProfileOptions from "./useGetProfileOptions";
import {
  changeEquipmentItem,
  enableSaveProfile,
  changeProfile,
} from "../../../../util/redux/CharacterSlice";
import type { SelectedItemReturnType } from "../../../Dropdown";
import {
  ArmorTypes,
  CharacterModalSelectOptions as SelectOptions,
  CharacterModalSelectTypes,
} from "../ICharacter";

const useManageCharacter = () => {
  const dispatch = useDispatch();
  const [isSelectingType, setIsSelectingType] = useState<CharacterModalSelectTypes>(
    SelectOptions.NONE
  );

  const [isFocusedProfile, setIsFocusedProfile] = useState<SelectedItemReturnType>(null);
  const [isFocusedHead, setIsFocusedHead] = useState<SelectedItemReturnType>(null);
  const [isFocusedChest, setIsFocusedChest] = useState<SelectedItemReturnType>(null);
  const [isFocusedArms, setIsFocusedArms] = useState<SelectedItemReturnType>(null);
  const [isFocusedWaist, setIsFocusedWaist] = useState<SelectedItemReturnType>(null);
  const [isFocusedLegs, setIsFocusedLegs] = useState<SelectedItemReturnType>(null);

  const { profileList } = useGetProfileOptions();
  const { armorListHead, armorListChest, armorListArms, armorListWaist, armorListLegs } =
    useGetArmorOptions();

  const showSelectModal = (selectOption: CharacterModalSelectTypes) => {
    setIsSelectingType(selectOption);
  };

  const hideSelectModal = () => {
    setIsSelectingType(SelectOptions.NONE);
  };

  const onPressConfirm = () => {
    switch (isSelectingType) {
      case SelectOptions.PROFILE:
        if (isFocusedProfile) {
          dispatch(changeProfile(profileList[isFocusedProfile.indexArray]));
          dispatch(enableSaveProfile(false));
        }
        break;
      case ArmorTypes.HEAD:
        if (isFocusedHead) {
          dispatch(
            changeEquipmentItem({
              itemType: ArmorTypes.HEAD,
              item: armorListHead[isFocusedHead.indexArray],
            })
          );
          dispatch(enableSaveProfile(true));
        }
        break;
      case ArmorTypes.CHEST:
        if (isFocusedChest) {
          dispatch(
            changeEquipmentItem({
              itemType: ArmorTypes.CHEST,
              item: armorListChest[isFocusedChest.indexArray],
            })
          );
          dispatch(enableSaveProfile(true));
        }
        break;
      case ArmorTypes.ARMS:
        if (isFocusedArms) {
          dispatch(
            changeEquipmentItem({
              itemType: ArmorTypes.ARMS,
              item: armorListArms[isFocusedArms.indexArray],
            })
          );
          dispatch(enableSaveProfile(true));
        }
        break;
      case ArmorTypes.WAIST:
        if (isFocusedWaist) {
          dispatch(
            changeEquipmentItem({
              itemType: ArmorTypes.WAIST,
              item: armorListWaist[isFocusedWaist.indexArray],
            })
          );
          dispatch(enableSaveProfile(true));
        }
        break;
      case ArmorTypes.LEGS:
        if (isFocusedLegs) {
          dispatch(
            changeEquipmentItem({
              itemType: ArmorTypes.LEGS,
              item: armorListLegs[isFocusedLegs.indexArray],
            })
          );
          dispatch(enableSaveProfile(true));
        }
        break;
      default:
        break;
    }
  };

  return {
    isSelectingType,
    isFocusedProfile,
    setIsFocusedProfile,
    showSelectModal,
    hideSelectModal,
    onPressConfirm,

    setIsFocusedHead,
    setIsFocusedChest,
    setIsFocusedArms,
    setIsFocusedWaist,
    setIsFocusedLegs,
  };
};

export default useManageCharacter;
