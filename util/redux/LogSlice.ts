import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { MonsterKind, RankType, Result } from "../../assets/data/types";

export type LogEntry = {
  id: string;
  monster: MonsterKind;
  rank: RankType;
  carts: number;
  result?: Result;
};

export interface HuntingLogState {
  huntLog: LogEntry[];
}

const initialState: HuntingLogState = {
  huntLog: [],
};

export const logSlice = createSlice({
  name: `log`,
  initialState,
  reducers: {
    addLogEntry: (state, action: PayloadAction<LogEntry>) => {
      state.huntLog = [...state.huntLog, action.payload];
    },
    deleteLogEntry: (state, action: PayloadAction<string>) => {
      state.huntLog = state.huntLog.filter((h) => h.id !== action.payload);
    },
    replaceLogEntry: (state, action: PayloadAction<LogEntry>) => {
      const index = state.huntLog.findIndex((h) => h.id === action.payload.id);
      state.huntLog[index] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLogEntry, deleteLogEntry, replaceLogEntry } = logSlice.actions;

export default logSlice.reducer;
