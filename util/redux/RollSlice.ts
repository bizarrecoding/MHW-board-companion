import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type DiceValue = [number, number, number, number];
export interface RollState {
  rollPool: DiceValue;
}

const initialState: RollState = {
  rollPool: [5, 5, 0, 1],
};

export const rollSlice = createSlice({
  name: `rolls`,
  initialState,
  reducers: {
    setRollPool: (state, action: PayloadAction<DiceValue>) => {
      state.rollPool = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRollPool } = rollSlice.actions;

export default rollSlice.reducer;
