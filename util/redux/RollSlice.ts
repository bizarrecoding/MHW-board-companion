import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type DiceValue = [number, number, number, number];
export interface RollState {
  rollPool: DiceValue;
  total: number;
}

const initialState: RollState = {
  rollPool: [5, 5, 0, 1],
  total: 11,
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
