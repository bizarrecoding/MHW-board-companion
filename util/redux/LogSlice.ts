import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type LogEntry = {
  id: string;
  monster: string;
  rank: string;
  carts: number;
  result?: string;
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
