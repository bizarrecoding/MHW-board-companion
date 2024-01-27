import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { InventoryKind } from "../../assets/data/types";

export type InventoryEntry = {
  type: InventoryKind;
  name: string;
  amount: number;
};

export interface InventoryState {
  inventory: InventoryEntry[];
}

const initialState: InventoryState = {
  inventory: [],
};

export const inventorySlice = createSlice({
  name: `inventory`,
  initialState,
  reducers: {
    addInventoryEntry: (state, action: PayloadAction<InventoryEntry>) => {
      if (state.inventory.find((h) => h.name === action.payload.name)) return;
      state.inventory.push(action.payload);
    },
    deleteInventoryEntry: (state, action: PayloadAction<string>) => {
      state.inventory = state.inventory.filter((h) => h.name !== action.payload);
    },
    replaceInventoryEntry: (state, action: PayloadAction<InventoryEntry>) => {
      state.inventory = state.inventory.map((h) =>
        h.name === action.payload.name ? action.payload : h
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addInventoryEntry, deleteInventoryEntry, replaceInventoryEntry } =
  inventorySlice.actions;

export default inventorySlice.reducer;
