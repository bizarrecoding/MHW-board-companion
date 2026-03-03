import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { EquipmentEntry, SetEntry, WeaponEntry } from "../../assets/data/types";

type ActionChangePiece = {
  index: number;
  piece: WeaponEntry | EquipmentEntry | null
}
export interface CharacterState {
  set: SetEntry;
}

const initialState: CharacterState = {
  set: [null, null, null, null],
};

export const characterSlice = createSlice({
  name: `character`,
  initialState,
  reducers: {
    changeSetPiece: (state, action: PayloadAction<ActionChangePiece>) => {
      const { piece, index } = action.payload
      state.set[index] = piece
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  changeSetPiece
} = characterSlice.actions;

export default characterSlice.reducer;
