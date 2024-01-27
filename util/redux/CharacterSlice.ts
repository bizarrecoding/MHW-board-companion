import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface CharacterState {
  profile_id: string;
  name: string;
  equipment: {
    head: string;
    chest: string;
    arms: string;
    waist: string;
    legs: string;
    weapon: string;
  };
  inventory: {
    potionHealth: number;
    potionStamina: number;
  };
  log: object;
}

const initialState: CharacterState = {
  profile_id: ``,
  name: ``,
  equipment: {
    head: ``,
    chest: ``,
    arms: ``,
    waist: ``,
    legs: ``,
    weapon: ``,
  },
  inventory: {
    potionHealth: 0,
    potionStamina: 1,
  },
  log: {},
};

export const characterSlice = createSlice({
  name: `character`,
  initialState,
  reducers: {
    //   addLogEntry: (state, action: PayloadAction<LogEntry>) => {
    //     state.huntLog = [...state.huntLog, action.payload];
    //   },
    //   deleteLogEntry: (state, action: PayloadAction<string>) => {
    //     state.huntLog = state.huntLog.filter((h) => h.id !== action.payload);
    //   },
    //   replaceLogEntry: (state, action: PayloadAction<LogEntry>) => {
    //     const index = state.huntLog.findIndex((h) => h.id === action.payload.id);
    //     state.huntLog[index] = action.payload;
    //   },
  },
});

// Action creators are generated for each case reducer function
export const actions = characterSlice.actions;

export default characterSlice.reducer;
