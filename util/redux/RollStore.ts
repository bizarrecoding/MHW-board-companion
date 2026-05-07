import { create } from "zustand";

interface RollState {
  rollPool: DiceValue;
  total: number;
}

const initialState: RollState = {
  rollPool: [0, 0, 0, 0],
  total: 0,
};

export const useRollStore = create<RollState>()((set) => ({
  ...initialState,
  setRollPool: (newRollPool: DiceValue) => {
    set({
      rollPool: newRollPool,
      total: newRollPool.reduce((acc, val) => acc + val, 0),
    });
  },
}));
