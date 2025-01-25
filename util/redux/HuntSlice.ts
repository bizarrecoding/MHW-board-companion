import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { MonsterKind, RankType } from "../../assets/data/types";

export interface HuntState {
  monster: MonsterKind;
  rank: RankType;
}

const initialState: HuntState = {
  monster: `Barroth`,
  rank: `Low Rank`,
};

export const huntSlice = createSlice({
  name: `monster`,
  initialState,
  reducers: {
    setHunt: (state, action: PayloadAction<HuntState>) => {
      state.monster = action.payload.monster;
      state.rank = action.payload.rank;
    },
    setRank: (state, action: PayloadAction<RankType>) => {
      state.rank = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setHunt, setRank } = huntSlice.actions;

export default huntSlice.reducer;
