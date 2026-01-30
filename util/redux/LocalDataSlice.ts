import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HunterLogEntry } from "../../hooks/useHunterLog";
import { InventoryEntry } from "../../hooks/useInventory";

export interface LocalDataState {
  inventory: InventoryEntry[];
  logs: HunterLogEntry[];
}

const initialState: LocalDataState = {
  inventory: [],
  logs: [],
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const localDataSlice = createSlice({
  name: "localData",
  initialState,
  reducers: {
    // Inventory Reducers
    addLocalInventoryEntry: (state, action: PayloadAction<Omit<InventoryEntry, "id">>) => {
      const existingItem = state.inventory.find((i) => i.name === action.payload.name);
      if (existingItem) {
        existingItem.amount += 1;
      } else {
        state.inventory.push({
          ...action.payload,
          id: generateId(),
        });
      }
    },
    updateLocalInventoryEntry: (state, action: PayloadAction<{ id: string; amount: number }>) => {
      const item = state.inventory.find((i) => i.id === action.payload.id);
      if (item) {
        item.amount = action.payload.amount;
      }
    },
    deleteLocalInventoryEntry: (state, action: PayloadAction<string>) => {
      state.inventory = state.inventory.filter((i) => i.id !== action.payload);
    },
    
    // Hunter Log Reducers
    addLocalHunterLogEntry: (state, action: PayloadAction<Omit<HunterLogEntry, "id" | "timestamp">>) => {
      state.logs.push({
        ...action.payload,
        id: generateId(),
        timestamp: Date.now(),
      });
    },
    deleteLocalHunterLogEntry: (state, action: PayloadAction<string>) => {
      state.logs = state.logs.filter((l) => l.id !== action.payload);
    },
    updateLocalHunterLogEntry: (state, action: PayloadAction<{ id: string; entry: HunterLogEntry }>) => {
      const index = state.logs.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) {
        state.logs[index] = action.payload.entry;
      }
    },
    clearLocalData: (state) => {
      state.inventory = [];
      state.logs = [];
    }
  },
});

export const {
  addLocalInventoryEntry,
  updateLocalInventoryEntry,
  deleteLocalInventoryEntry,
  addLocalHunterLogEntry,
  deleteLocalHunterLogEntry,
  updateLocalHunterLogEntry,
  clearLocalData,
} = localDataSlice.actions;

export default localDataSlice.reducer;
