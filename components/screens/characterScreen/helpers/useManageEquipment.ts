import { useState } from "react";

import type { SelectedItemReturnType } from "../../../Dropdown";

const useManageEquipment = () => {
  const [isFocusedHead, setIsFocusedHead] = useState<SelectedItemReturnType>(null);
  const [isFocusedChest, setIsFocusedChest] = useState<SelectedItemReturnType>(null);
  const [isFocusedArms, setIsFocusedArms] = useState<SelectedItemReturnType>(null);
  const [isFocusedWaist, setIsFocusedWaist] = useState<SelectedItemReturnType>(null);
  const [isFocusedLegs, setIsFocusedLegs] = useState<SelectedItemReturnType>(null);

  return {
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
