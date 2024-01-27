import { useState } from "react";

import type { SelectedItemReturnType } from "../../../Dropdown";
import type { ArmorPiece } from "../character";

type EquipmentOrNull = ArmorPiece | null;

const useManageEquipment = () => {
  // const [equippedWeapon, setEquippedWeapon] = useState<EquipmentOrNull>(null);
  const [equippedHead, setEquippedHead] = useState<EquipmentOrNull>(null);
  const [equippedChest, setEquippedChest] = useState<EquipmentOrNull>(null);
  const [equippedArms, setEquippedArms] = useState<EquipmentOrNull>(null);
  const [equippedWaist, setEquippedWaist] = useState<EquipmentOrNull>(null);
  const [equippedLegs, setEquippedLegs] = useState<EquipmentOrNull>(null);

  const [isFocusedHead, setIsFocusedHead] = useState<SelectedItemReturnType>(null);
  const [isFocusedChest, setIsFocusedChest] = useState<SelectedItemReturnType>(null);
  const [isFocusedArms, setIsFocusedArms] = useState<SelectedItemReturnType>(null);
  const [isFocusedWaist, setIsFocusedWaist] = useState<SelectedItemReturnType>(null);
  const [isFocusedLegs, setIsFocusedLegs] = useState<SelectedItemReturnType>(null);

  return {
    equippedHead,
    setEquippedHead,
    equippedChest,
    setEquippedChest,
    equippedArms,
    setEquippedArms,
    equippedWaist,
    setEquippedWaist,
    equippedLegs,
    setEquippedLegs,
    isFocusedHead,
    setIsFocusedHead,
    isFocusedChest,
    setIsFocusedChest,
    isFocusedArms,
    setIsFocusedArms,
    isFocusedWaist,
    setIsFocusedWaist,
    isFocusedLegs,
    setIsFocusedLegs,
  };
};

export default useManageEquipment;
