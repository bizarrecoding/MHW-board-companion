import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { DiceValue } from "../../assets/data/types";

export interface RollState {
  rollPool: DiceValue;
  total: number;
}

const initialState: RollState = {
  rollPool: [0, 0, 0, 0],
  total: 0,
};

export const rollSlice = createSlice({
  name: `rolls`,
  initialState,
  reducers: {
    setRollPool: (state, action: PayloadAction<DiceValue>) => {
      state.rollPool = action.payload;
      state.total = action.payload.reduce((acc, val) => acc + val, 0);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRollPool } = rollSlice.actions;

export default rollSlice.reducer;
