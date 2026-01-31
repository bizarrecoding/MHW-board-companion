import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MonsterKind } from "../../assets/data/types";

export type ThemePreference = "light" | "dark" | "system";

export interface SettingsState {
  theme: ThemePreference;
  profileIcon: MonsterKind | null;
}

const initialState: SettingsState = {
  theme: "system",
  profileIcon: null,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemePreference>) => {
      state.theme = action.payload;
    },
    setProfileIcon: (state, action: PayloadAction<MonsterKind>) => {
      state.profileIcon = action.payload;
    },
  },
});

export const { setTheme, setProfileIcon } = settingsSlice.actions;

export default settingsSlice.reducer;
