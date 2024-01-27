import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { EquipmentOrNull } from "../../components/screens/characterScreen/ICharacter";
import { IsArmorType } from "../../components/screens/characterScreen/ICharacter";

type ActionChangeGear = {
  type: Exclude<IsArmorType, IsArmorType.NONE>;
  item: EquipmentOrNull;
};

export interface CharacterState {
  profile_id: string;
  name: string;
  equipment: {
    head: EquipmentOrNull;
    chest: EquipmentOrNull;
    arms: EquipmentOrNull;
    waist: EquipmentOrNull;
    legs: EquipmentOrNull;
    weapon: string;
  };
  inventory: {
    potionHealth: number;
    potionStamina: number;
  };
  log: object;
}

const initialState: CharacterState = {
  profile_id: `9999`,
  name: `Test Hunter`,
  equipment: {
    head: null,
    chest: null,
    arms: null,
    waist: null,
    legs: null,
    weapon: ``,
  },
  inventory: {
    potionHealth: 0,
    potionStamina: 0,
  },
  log: {},
};

export const characterSlice = createSlice({
  name: `character`,
  initialState,
  reducers: {
    changeEquipmentItem: (state, action: PayloadAction<ActionChangeGear>) => {
      state.equipment = { ...state.equipment, [action.payload.type]: action.payload.item };
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeEquipmentItem } = characterSlice.actions;

export default characterSlice.reducer;
