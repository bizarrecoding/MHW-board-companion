import { useState } from "react";
import { useDispatch } from "react-redux";

import useGetArmorOptions from "./useGetArmorOptions";
import { changeEquipmentItem, enableSaveProfile } from "../../../../util/redux/CharacterSlice";
import type { SelectedItemReturnType } from "../../../Dropdown";
import { IsArmorType } from "../ICharacter";

const useManageEquipment = () => {
  const dispatch = useDispatch();
  const [isSelectingType, setIsSelectingType] = useState(IsArmorType.NONE);

  const { armorListHead, armorListChest, armorListArms, armorListWaist, armorListLegs } =
    useGetArmorOptions();

  const [isFocusedHead, setIsFocusedHead] = useState<SelectedItemReturnType>(null);
  const [isFocusedChest, setIsFocusedChest] = useState<SelectedItemReturnType>(null);
  const [isFocusedArms, setIsFocusedArms] = useState<SelectedItemReturnType>(null);
  const [isFocusedWaist, setIsFocusedWaist] = useState<SelectedItemReturnType>(null);
  const [isFocusedLegs, setIsFocusedLegs] = useState<SelectedItemReturnType>(null);

  const showSelectModal = (armorType: IsArmorType) => {
    setIsSelectingType(armorType);
  };

  const hideSelectModal = () => {
    setIsSelectingType(IsArmorType.NONE);
  };

  const onPressConfirm = () => {
    switch (isSelectingType) {
      case IsArmorType.HEAD:
        if (isFocusedHead)
          dispatch(
            changeEquipmentItem({
              itemType: IsArmorType.HEAD,
              item: armorListHead[isFocusedHead.indexArray],
            })
          );
        break;
      case IsArmorType.CHEST:
        if (isFocusedChest)
          dispatch(
            changeEquipmentItem({
              itemType: IsArmorType.CHEST,
              item: armorListChest[isFocusedChest.indexArray],
            })
          );
        break;
      case IsArmorType.ARMS:
        if (isFocusedArms)
          dispatch(
            changeEquipmentItem({
              itemType: IsArmorType.ARMS,
              item: armorListArms[isFocusedArms.indexArray],
            })
          );
        break;
      case IsArmorType.WAIST:
        if (isFocusedWaist)
          dispatch(
            changeEquipmentItem({
              itemType: IsArmorType.WAIST,
              item: armorListWaist[isFocusedWaist.indexArray],
            })
          );
        break;
      case IsArmorType.LEGS:
        if (isFocusedLegs)
          dispatch(
            changeEquipmentItem({
              itemType: IsArmorType.LEGS,
              item: armorListLegs[isFocusedLegs.indexArray],
            })
          );
        break;
      // case IsArmorType.WEAPON:
      //   setEquippedHead(armorListHead[isFocusedHead.indexArray]);
      //   break;

      default:
        break;
    }
    dispatch(enableSaveProfile(true));
  };

  return {
    isSelectingType,
    showSelectModal,
    hideSelectModal,
    onPressConfirm,
    isFocusedHead,
    isFocusedChest,
    isFocusedArms,
    isFocusedWaist,
    isFocusedLegs,
    setIsFocusedHead,
    setIsFocusedChest,
    setIsFocusedArms,
    setIsFocusedWaist,
    setIsFocusedLegs,
  };
};

export default useManageEquipment;
